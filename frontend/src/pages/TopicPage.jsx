import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Bookmark,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Loader2,
  Code2,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import Breadcrumb from '../components/layout/Breadcrumb';
import ContentRenderer from '../components/content/ContentRenderer';
import TableOfContents from '../components/content/TableOfContents';
import {
  findSubtopicBySlugs,
  getSubtopicNeighbors,
} from '../data/curriculum';
import { loadSubtopicContent } from '../data/contentLoader';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';

export default function TopicPage() {
  const { moduleSlug, topicSlug, subtopicSlug } = useParams();
  const navigate = useNavigate();
  const {
    isCompleted,
    toggleComplete,
    isBookmarked,
    toggleBookmark,
    recordView,
  } = useProgress();
  const { language, isEnglish, isHinglish, isBoth } = useLanguage();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'concept' | 'code' | 'interview' | 'quiz'

  const match = findSubtopicBySlugs(moduleSlug, topicSlug, subtopicSlug);
  const { prev, next } = getSubtopicNeighbors(moduleSlug, topicSlug, subtopicSlug);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setActiveTab('all');

    if (match?.subtopic) {
      recordView({
        id: match.subtopic.id,
        moduleSlug,
        topicSlug,
        slug: subtopicSlug,
        title: match.subtopic.title,
        fullPath: `/learn/${moduleSlug}/${topicSlug}/${subtopicSlug}`,
      });
      window.scrollTo(0, 0);

      loadSubtopicContent(moduleSlug, topicSlug, subtopicSlug)
        .then((data) => {
          if (isMounted) {
            setContent(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error('Failed to load subtopic content', err);
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [moduleSlug, topicSlug, subtopicSlug]);

  if (!match) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Topic Not Found
        </h2>
        <p className="text-slate-500 text-sm">
          The requested module or subtopic does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const { subtopic, topic, module: mod } = match;
  const completedStatus = isCompleted(subtopic.id);
  const bookmarkedStatus = isBookmarked(subtopic.id);

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
      case 'Intermediate':
        return 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
      case 'Advanced':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-300';
    }
  };

  return (
    <div className="flex gap-8 items-start animate-fade-in pb-16">
      {/* Main Content Column */}
      <div className="flex-1 min-w-0 space-y-8">
        
        {/* Top Header Bar: Breadcrumb + Metadata */}
        <div className="space-y-4">
          <Breadcrumb module={mod} topic={topic} subtopic={subtopic} />

          {/* Title Area */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Difficulty badge */}
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyColor(
                  subtopic.difficulty
                )}`}
              >
                {subtopic.difficulty}
              </span>

              {/* Read time */}
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{subtopic.readTime} min read</span>
              </span>

              {/* Module badge */}
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                • Module {String(mod.number).padStart(2, '0')}: {mod.title.en}
              </span>
            </div>

            {/* Bilingual Subtopic Title */}
            <div>
              {(isEnglish || isBoth) && (
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {subtopic.title.en}
                </h1>
              )}
              {(isHinglish || isBoth) && (
                <h2
                  className={`font-bold text-brand-600 dark:text-brand-400 tracking-tight leading-tight ${
                    isBoth ? 'text-lg sm:text-xl mt-1.5 opacity-90' : 'text-2xl sm:text-4xl'
                  }`}
                >
                  {subtopic.title.hi}
                </h2>
              )}
            </div>

            {/* Subtopic Summary */}
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              {isHinglish ? subtopic.summary.hi : subtopic.summary.en}
            </p>
          </div>

          {/* Quick Action Toolbar: Mark as Complete & Bookmark */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => toggleComplete(subtopic.id)}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs ${
                  completedStatus
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {completedStatus ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Completed!</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  toggleBookmark({
                    id: subtopic.id,
                    moduleSlug,
                    topicSlug,
                    slug: subtopicSlug,
                    title: subtopic.title,
                    fullPath: `/learn/${moduleSlug}/${topicSlug}/${subtopicSlug}`,
                  })
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  bookmarkedStatus
                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-300 dark:border-amber-800'
                    : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={bookmarkedStatus ? 'Remove bookmark' : 'Bookmark this topic'}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedStatus ? 'fill-amber-500 text-amber-500' : ''
                  }`}
                />
                <span>
                  {bookmarkedStatus ? 'Bookmarked' : 'Bookmark'}
                </span>
              </button>
            </div>

            {/* Language indicator */}
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>
                Language:{' '}
                <strong className="text-slate-700 dark:text-slate-300 capitalize">
                  {language}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Tabs: Break long pages into focused sections */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto text-xs font-semibold no-scrollbar shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Full Guide</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('concept')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'concept'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Theory & Analogy</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'code'
                ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-500" />
            <span>Code & Syntax</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'interview'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
            <span>Interview Q&A</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>MCQ Quiz ({content?.quiz?.length || 21})</span>
          </button>
        </div>

        {/* Mobile/Tablet Collapsible "On this page" TOC (Visible in Full Guide view) */}
        {!loading && activeTab === 'all' && content?.sections && content.sections.length > 0 && (
          <div className="xl:hidden">
            <TableOfContents
              sections={content.sections}
              hasQuiz={Boolean(content.quiz?.length)}
              isMobile={true}
            />
          </div>
        )}

        {/* Content Body Area */}
        <div id="content-container">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-7 h-7 animate-spin text-brand-500" />
              <p className="text-xs font-medium">Loading rich curriculum content...</p>
            </div>
          ) : (
            <ContentRenderer
              content={content}
              subtopicId={subtopic.id}
              activeTab={activeTab}
            />
          )}
        </div>

        {/* Previous & Next Navigation Buttons */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prev ? (
            <Link
              to={prev.fullPath}
              className="w-full sm:w-1/2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-900 transition-all flex items-center gap-3 text-left group shadow-xs"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-brand-500 group-hover:-translate-x-1 transition-transform shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Previous Topic
                </span>
                <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors truncate">
                  {prev.title.en}
                </p>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block sm:w-1/2" />
          )}

          {next ? (
            <Link
              to={next.fullPath}
              className="w-full sm:w-1/2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-900 transition-all flex items-center justify-end gap-3 text-right group shadow-xs sm:ml-auto"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Next Topic
                </span>
                <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors truncate">
                  {next.title.en}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ) : (
            <div className="hidden sm:block sm:w-1/2" />
          )}
        </div>
      </div>

      {/* Right Column: "On This Page" Table of Contents (TOC) with scroll-spy */}
      <aside className="hidden xl:block w-64 shrink-0 sticky top-24 space-y-4">
        {content?.sections && (
          <TableOfContents
            sections={content.sections}
            hasQuiz={Boolean(content.quiz?.length)}
          />
        )}
      </aside>
    </div>
  );
}
