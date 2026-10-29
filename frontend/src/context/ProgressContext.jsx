import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const ProgressContext = createContext();

const STORAGE_KEYS = {
  COMPLETED: 'mern_completed_topics',
  CHECKLIST_FALLBACK: 'mern-hub-master-checklist-v1',
  BOOKMARKS: 'mern_bookmarks',
  RECENT: 'mern_recently_viewed',
  QUIZ_SCORES: 'mern_quiz_scores',
  STATS: 'mern_learning_stats',
};

export function ProgressProvider({ children }) {
  // Set of completed subtopic IDs (migrating and merging both storage keys)
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      const checklistSaved = localStorage.getItem(STORAGE_KEYS.CHECKLIST_FALLBACK);
      const set = new Set();
      if (saved) JSON.parse(saved).forEach((id) => set.add(id));
      if (checklistSaved) JSON.parse(checklistSaved).forEach((id) => set.add(id));
      return Array.from(set);
    } catch {
      return [];
    }
  });

  // Array of bookmarked subtopic objects: { id, moduleSlug, topicSlug, subtopicSlug, title, savedAt }
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Array of recently viewed subtopic objects: { id, moduleSlug, topicSlug, subtopicSlug, title, viewedAt }
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Map of subtopicId -> { score, total, percentage, passed, completedAt, answers }
  const [quizScores, setQuizScores] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // General learning statistics (streaks, total MCQs answered)
  const [learningStats, setLearningStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalQuizzesTaken: 0,
      totalAnsweredMCQs: 0,
    };
  });

  // Persist completed list (sync to both keys for 100% interoperability)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completed));
      localStorage.setItem(STORAGE_KEYS.CHECKLIST_FALLBACK, JSON.stringify(completed));
    } catch (e) {
      console.warn('Failed to save completed topics to localStorage', e);
    }
  }, [completed]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  // Persist recently viewed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentlyViewed));
    } catch (e) {
      console.warn('Failed to save recently viewed to localStorage', e);
    }
  }, [recentlyViewed]);

  // Persist quiz scores
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(quizScores));
    } catch (e) {
      console.warn('Failed to save quiz scores to localStorage', e);
    }
  }, [quizScores]);

  // Persist stats
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(learningStats));
    } catch (e) {
      console.warn('Failed to save learning stats to localStorage', e);
    }
  }, [learningStats]);

  // Helper: update streak & activity
  const touchActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    setLearningStats((prev) => {
      if (prev.lastActiveDate === today) return prev;

      const lastDate = new Date(prev.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

      return {
        ...prev,
        lastActiveDate: today,
        streak: diffDays === 1 ? prev.streak + 1 : 1,
      };
    });
  };

  const isCompleted = (subtopicId) => {
    return completed.includes(subtopicId);
  };

  const toggleComplete = (subtopicId) => {
    touchActivity();
    setCompleted((prev) => {
      if (prev.includes(subtopicId)) {
        return prev.filter((id) => id !== subtopicId);
      } else {
        return [...prev, subtopicId];
      }
    });
  };

  const markAsComplete = (subtopicId) => {
    touchActivity();
    setCompleted((prev) => (prev.includes(subtopicId) ? prev : [...prev, subtopicId]));
  };

  const markAsIncomplete = (subtopicId) => {
    setCompleted((prev) => prev.filter((id) => id !== subtopicId));
  };

  /**
   * Bulk toggle an array of subtopic IDs
   */
  const toggleBatch = (itemIds, forceState) => {
    touchActivity();
    setCompleted((prev) => {
      const allAreChecked = forceState !== undefined ? !forceState : itemIds.every((id) => prev.includes(id));
      if (allAreChecked) {
        return prev.filter((id) => !itemIds.includes(id));
      } else {
        const set = new Set([...prev, ...itemIds]);
        return Array.from(set);
      }
    });
  };

  const isBookmarked = (subtopicId) => {
    return bookmarks.some((item) => item.id === subtopicId);
  };

  const toggleBookmark = (subtopicItem) => {
    touchActivity();
    setBookmarks((prev) => {
      const exists = prev.some((item) => item.id === subtopicItem.id);
      if (exists) {
        return prev.filter((item) => item.id !== subtopicItem.id);
      } else {
        return [
          {
            ...subtopicItem,
            savedAt: new Date().toISOString(),
          },
          ...prev,
        ];
      }
    });
  };

  const recordView = (subtopicItem) => {
    if (!subtopicItem || !subtopicItem.id) return;
    touchActivity();
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== subtopicItem.id);
      return [
        {
          ...subtopicItem,
          viewedAt: new Date().toISOString(),
        },
        ...filtered,
      ].slice(0, 10);
    });
  };

  /**
   * Save a quiz attempt to localStorage and auto-complete topic if passed
   */
  const recordQuizScore = (subtopicId, scoreData) => {
    if (!subtopicId || !scoreData) return;
    touchActivity();

    const percentage = scoreData.total > 0 ? Math.round((scoreData.score / scoreData.total) * 100) : 0;
    const passed = percentage >= 70;

    setQuizScores((prev) => ({
      ...prev,
      [subtopicId]: {
        ...scoreData,
        percentage,
        passed,
        completedAt: new Date().toISOString(),
      },
    }));

    setLearningStats((prev) => ({
      ...prev,
      totalQuizzesTaken: prev.totalQuizzesTaken + 1,
      totalAnsweredMCQs: prev.totalAnsweredMCQs + (scoreData.total || 0),
    }));

    // Auto mark as complete if user passed the quiz (>= 70%)
    if (passed) {
      markAsComplete(subtopicId);
    }
  };

  const getQuizScore = (subtopicId) => {
    return quizScores[subtopicId] || null;
  };

  /**
   * Reset all user progress from localStorage
   */
  const resetAllProgress = () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    } catch {}
    setCompleted([]);
    setBookmarks([]);
    setRecentlyViewed([]);
    setQuizScores({});
    setLearningStats({
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalQuizzesTaken: 0,
      totalAnsweredMCQs: 0,
    });
  };

  /**
   * Calculate progress for a specific module
   */
  const getModuleProgress = (moduleItem) => {
    if (!moduleItem || !moduleItem.topics) return { completed: 0, total: 0, percentage: 0 };
    let total = 0;
    let done = 0;

    moduleItem.topics.forEach((topic) => {
      if (topic.subtopics) {
        topic.subtopics.forEach((sub) => {
          total += 1;
          if (completed.includes(sub.id)) {
            done += 1;
          }
        });
      }
    });

    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return { completed: done, total, percentage };
  };

  /**
   * Calculate overall progress across entire curriculum
   */
  const getOverallProgress = (curriculumList) => {
    if (!curriculumList || !Array.isArray(curriculumList)) {
      return { completed: 0, total: 0, percentage: 0 };
    }
    let total = 0;
    let done = 0;

    curriculumList.forEach((mod) => {
      if (mod.topics) {
        mod.topics.forEach((topic) => {
          if (topic.subtopics) {
            topic.subtopics.forEach((sub) => {
              total += 1;
              if (completed.includes(sub.id)) {
                done += 1;
              }
            });
          }
        });
      }
    });

    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return { completed: done, total, percentage };
  };

  return (
    <ProgressContext.Provider
      value={{
        completed,
        bookmarks,
        recentlyViewed,
        quizScores,
        learningStats,
        isCompleted,
        toggleComplete,
        markAsComplete,
        markAsIncomplete,
        toggleBatch,
        isBookmarked,
        toggleBookmark,
        recordView,
        recordQuizScore,
        getQuizScore,
        resetAllProgress,
        getModuleProgress,
        getOverallProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
