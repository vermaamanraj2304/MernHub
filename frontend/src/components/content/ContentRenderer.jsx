import React from 'react';
import SectionRenderer from './SectionRenderer';
import QuizRenderer from './QuizRenderer';

export default function ContentRenderer({ content, subtopicId, activeTab = 'all' }) {
  if (!content) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        No content loaded.
      </div>
    );
  }

  const { sections = [], quiz = [] } = content;
  const currentSubtopicId = subtopicId || content.id;

  // Filter sections according to active tab so users can view in focused sections or all at once
  const displaySections = sections.filter((sec) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'concept') {
      return ['concept', 'syntax', 'summary', 'tip', 'warning', 'analogy'].includes(sec.type);
    }
    if (activeTab === 'code') {
      return Boolean(sec.code) || ['syntax', 'example'].includes(sec.type);
    }
    if (activeTab === 'interview') {
      return ['interview', 'mistakes'].includes(sec.type);
    }
    if (activeTab === 'quiz') {
      return false; // In quiz tab, only show the quiz
    }
    return true;
  });

  const showQuiz = activeTab === 'all' || activeTab === 'quiz';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sections List */}
      {displaySections.length > 0 ? (
        <div className="space-y-6">
          {displaySections.map((section, idx) => (
            <SectionRenderer
              key={section.id || `sec-${idx}`}
              section={section}
              index={idx}
            />
          ))}
        </div>
      ) : activeTab !== 'quiz' ? (
        <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          No specific sections under this tab. Switch to Full Guide to view all content.
        </div>
      ) : null}

      {/* Interactive MCQ Quiz */}
      {showQuiz && quiz && quiz.length > 0 && (
        <QuizRenderer quiz={quiz} subtopicId={currentSubtopicId} />
      )}
    </div>
  );
}
