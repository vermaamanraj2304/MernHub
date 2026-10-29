import React from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket,
  CheckCircle2,
  Bookmark,
  Clock,
  Sparkles,
  ArrowRight,
  Code2,
  Flame,
  Layers,
  ChevronRight,
  BookOpen,
  ListTodo,
} from 'lucide-react';
import { curriculum, getAllSubtopics } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { ModuleIcon } from '../utils/iconMap';

export default function Home() {
  const {
    completed,
    bookmarks,
    recentlyViewed,
    getOverallProgress,
    getModuleProgress,
    learningStats,
    quizScores,
  } = useProgress();
  const { language, isHinglish, isBoth } = useLanguage();

  const allSubtopics = getAllSubtopics();
  const overall = getOverallProgress(curriculum);

  // Find next topic to learn (first incomplete subtopic)
  const nextIncomplete = allSubtopics.find((item) => !completed.includes(item.id)) || allSubtopics[0];

  const getTitle = (titleObj) => {
    if (!titleObj) return '';
    if (typeof titleObj === 'string') return titleObj;
    if (language === 'hi') return titleObj.hi || titleObj.en;
    if (language === 'en') return titleObj.en;
    return titleObj.en;
  };

  const getDesc = (descObj) => {
    if (!descObj) return '';
    if (typeof descObj === 'string') return descObj;
    if (language === 'hi') return descObj.hi || descObj.en;
    return descObj.en;
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden max-w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Complete MERN Mastery • English & Hinglish</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master the MERN Stack from{' '}
            <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Zero to Job-Ready
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isHinglish ? (
              'MongoDB, Express.js, React.js, aur Node.js ko zero level se production grade tak samjhein. Real-world Indian analogies (chai tapri, IRCTC counters) aur deep runnable code ke saath.'
            ) : isBoth ? (
              'Comprehensive full-stack architecture with bilingual support: study clean English or relatable Hinglish explanations with real-world analogies and runnable code.'
            ) : (
              'Comprehensive full-stack curriculum designed for modern software engineers. Deep architectural explanations, clean code examples, interactive quizzes, and interview preparation.'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {nextIncomplete && (
              <Link
                to={nextIncomplete.fullPath}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-lg shadow-brand-500/30 transition-all hover:scale-105"
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              to="/checklist"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <ListTodo className="w-4 h-4" />
              <span>Master Roadmap Checklist (672 Topics)</span>
            </Link>
            <Link
              to="/learn/getting-started/architecture-and-roadmap/what-is-mern"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <span>Explore Curriculum</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Progress Dashboard Banner */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion Metric */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overall Progress
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {overall.percentage}%
            </span>
            <span className="text-xs text-slate-500">
              ({overall.completed}/{overall.total} completed)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${overall.percentage}%` }}
            />
          </div>
        </div>

        {/* Modules Count */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Curriculum Scope
            </span>
            <span className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {curriculum.length}
            </span>
            <span className="text-xs text-slate-500">Modules (Zero to Job-Ready)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {allSubtopics.length} in-depth subtopics with quizzes
          </p>
        </div>

        {/* Bookmarks Saved */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Saved Bookmarks
            </span>
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {bookmarks.length}
            </span>
            <span className="text-xs text-slate-500">Topics pinned</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Quick reference for revision & interview prep
          </p>
        </div>

        {/* Next Target Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {learningStats?.streak > 1 ? `${learningStats.streak}d Streak • Up Next` : 'Up Next'}
            </span>
            <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-purple-500 text-purple-500" />
            </span>
          </div>
          {nextIncomplete ? (
            <Link
              to={nextIncomplete.fullPath}
              className="group block"
            >
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors truncate">
                {getTitle(nextIncomplete.title)}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <span>Start reading</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </p>
            </Link>
          ) : (
            <p className="text-xs text-emerald-500 font-semibold">
              All topics completed! 🎉
            </p>
          )}
        </div>
      </section>

      {/* Bookmarks & Recently Viewed (if available) */}
      {(bookmarks.length > 0 || recentlyViewed.length > 0) && (
        <section id="bookmarks" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Saved Bookmarks */}
          {bookmarks.length > 0 && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  <span>Pinned Bookmarks ({bookmarks.length})</span>
                </h3>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {bookmarks.map((bm) => (
                  <Link
                    key={bm.id}
                    to={bm.fullPath || `/learn/${bm.moduleSlug}/${bm.topicSlug}/${bm.slug || bm.subtopicSlug}`}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/30 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between group transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate pr-2">
                      {getTitle(bm.title)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-500" />
                  <span>Recently Viewed</span>
                </h3>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {recentlyViewed.slice(0, 5).map((rv) => (
                  <Link
                    key={rv.id}
                    to={rv.fullPath || `/learn/${rv.moduleSlug}/${rv.topicSlug}/${rv.slug || rv.subtopicSlug}`}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/30 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between group transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate pr-2">
                      {getTitle(rv.title)}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      Viewed
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Full Modules Overview Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Full Learning Track
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Step-by-step path from zero basics to senior full-stack architect
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {curriculum.map((mod) => {
            const progress = getModuleProgress(mod);
            const firstSubtopic = mod.topics[0]?.subtopics[0];
            const startPath = firstSubtopic
              ? `/learn/${mod.slug}/${mod.topics[0].slug}/${firstSubtopic.slug}`
              : '/';

            return (
              <div
                key={mod.id}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shadow-xs">
                      <ModuleIcon name={mod.icon} className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                      Module {String(mod.number).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                    {getTitle(mod.title)}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {getDesc(mod.description)}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">Progress</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                      {progress.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>

                  <Link
                    to={startPath}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all group-hover:bg-brand-500 group-hover:text-white"
                  >
                    <span>{progress.percentage > 0 ? 'Resume Track' : 'Start Track'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
