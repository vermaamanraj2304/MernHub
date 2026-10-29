import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Square,
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  ListTodo,
  Layers,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Trophy,
  Flame,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  coreModules,
  deepDiveTracks,
  getAllChecklistItems,
} from '../data/masterChecklist';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { ModuleIcon } from '../utils/iconMap';

export default function ChecklistPage() {
  const { language } = useLanguage();
  const {
    completed: checkedIds,
    toggleComplete,
    toggleBatch,
    resetAllProgress: resetGlobalProgress,
  } = useProgress();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'core' | 'tracks'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'completed' | 'pending'
  const [selectedModuleSlug, setSelectedModuleSlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  // All checklist items flattened
  const allItems = useMemo(() => getAllChecklistItems(), []);

  // Toggle item status
  const toggleItem = (itemId) => {
    const isChecked = checkedIds.includes(itemId);
    toggleComplete(itemId);

    // Celebrate with confetti on milestones
    if (!isChecked && ((checkedIds.length + 1) % 25 === 0 || (checkedIds.length + 1) === allItems.length)) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  // Toggle all items in a module/track
  const toggleAllInModule = (moduleItems) => {
    const itemIds = moduleItems.map((i) => i.id);
    toggleBatch(itemIds);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset your checklist progress? This will reset all topic checkmarks in localStorage.')) {
      resetGlobalProgress();
    }
  };

  // Filter modules/tracks based on tab, search, module selection, and status
  const displayedModules = useMemo(() => {
    let list = [];
    if (activeTab === 'all' || activeTab === 'core') {
      list.push(...coreModules.map((m) => ({ ...m, isTrack: false })));
    }
    if (activeTab === 'all' || activeTab === 'tracks') {
      list.push(...deepDiveTracks.map((t) => ({ ...t, isTrack: true })));
    }

    if (selectedModuleSlug !== 'all') {
      list = list.filter((m) => m.slug === selectedModuleSlug);
    }

    if (!searchQuery && filterStatus === 'all') {
      return list;
    }

    const query = searchQuery.toLowerCase().trim();

    return list
      .map((mod) => {
        const filteredTopics = mod.topics
          .map((topic) => {
            const filteredItems = topic.items.filter((item) => {
              const matchesSearch =
                !query ||
                item.title.toLowerCase().includes(query) ||
                mod.name.toLowerCase().includes(query) ||
                topic.name.toLowerCase().includes(query);

              const isChecked = checkedIds.includes(item.id);
              const matchesFilter =
                filterStatus === 'all' ||
                (filterStatus === 'completed' && isChecked) ||
                (filterStatus === 'pending' && !isChecked);

              return matchesSearch && matchesFilter;
            });

            return {
              ...topic,
              items: filteredItems,
            };
          })
          .filter((t) => t.items.length > 0);

        return {
          ...mod,
          topics: filteredTopics,
        };
      })
      .filter((mod) => mod.topics.length > 0);
  }, [activeTab, filterStatus, selectedModuleSlug, searchQuery, checkedIds]);

  // Overall Stats
  const totalItemsCount = allItems.length;
  const completedCount = checkedIds.length;
  const overallPercentage = totalItemsCount > 0 ? Math.round((completedCount / totalItemsCount) * 100) : 0;

  // Stats for 19 core modules vs 4 tracks
  const coreTotal = allItems.filter((i) => i.category === 'Core Curriculum').length;
  const coreCompleted = allItems.filter((i) => i.category === 'Core Curriculum' && checkedIds.includes(i.id)).length;
  const tracksTotal = allItems.filter((i) => i.category === 'Deep-Dive Tracks').length;
  const tracksCompleted = allItems.filter((i) => i.category === 'Deep-Dive Tracks' && checkedIds.includes(i.id)).length;

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto px-2.5 sm:px-6 overflow-hidden">
      {/* Hero Header */}
      <div className="relative overflow-hidden max-w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Job-Ready Full-Stack Engineering Roadmap</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Master Curriculum & Deep-Dive Tracks
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'Apni learning progress track karein: 19 Core Modules (478 Topics) + 4 Deep-Dive Master Tracks (194 Topics). Har subtopic mein theory aur 20+ MCQs shamil hain.'
                : 'Track your progress across all 19 Core Modules (478 Topics) + 4 Deep-Dive Master Tracks (194 Topics). Every subtopic includes comprehensive guides and 20+ practice MCQs.'}
            </p>
          </div>

          {/* Quick Stats Pill Card */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 flex flex-col items-center justify-center w-full md:w-auto md:min-w-[220px] shadow-lg">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Overall Completion</span>
            </div>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 my-1">
              {overallPercentage}%
            </div>
            <p className="text-xs text-slate-400">
              <span className="font-bold text-white">{completedCount}</span> / {totalItemsCount} topics completed
            </p>
            <div className="w-full bg-slate-700/60 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Badges Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
            <div className="text-xs text-slate-400 font-medium">Core Modules</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {coreCompleted} / {coreTotal}
            </div>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
            <div className="text-xs text-slate-400 font-medium">Deep-Dive Tracks</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {tracksCompleted} / {tracksTotal}
            </div>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
            <div className="text-xs text-slate-400 font-medium">Total MCQs Bank</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">14,000+ MCQs</div>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
            <div className="text-xs text-slate-400 font-medium">Language Mode</div>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">Bilingual (EN + HI)</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Top row: Tab Switcher & Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Topics ({totalItemsCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('core')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'core'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              19 Core Modules ({coreTotal})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tracks')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'tracks'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              4 Master Tracks ({tracksTotal})
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {checkedIds.length > 0 && (
              <button
                type="button"
                onClick={resetAllProgress}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Reset all checklist progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Progress</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom row: Search and Status filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 672 topics (e.g., Docker, JWT, Redis, Flexbox, B-tree, REST)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white placeholder-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Module Selector: Focus on 1 module at a time rather than all 672 on one page */}
          <select
            value={selectedModuleSlug}
            onChange={(e) => setSelectedModuleSlug(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 sm:py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-700 dark:text-slate-200 shrink-0"
          >
            <option value="all">Focus: All Modules ({coreModules.length + deepDiveTracks.length})</option>
            <optgroup label="19 Core Modules">
              {coreModules.map((m) => (
                <option key={m.slug} value={m.slug}>
                  Module {m.number}: {m.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="4 Master Tracks">
              {deepDiveTracks.map((t) => (
                <option key={t.slug} value={t.slug}>
                  Track {t.number}: {t.name}
                </option>
              ))}
            </optgroup>
          </select>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <div className="grid grid-cols-3 sm:flex items-center gap-1 w-full sm:w-auto text-xs">
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-2 sm:py-1.5 rounded-lg font-medium text-center transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-2 sm:py-1.5 rounded-lg font-medium text-center transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('completed')}
                className={`px-3 py-2 sm:py-1.5 rounded-lg font-medium text-center transition-colors ${
                  filterStatus === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Sections */}
      {displayedModules.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <ListTodo className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No topics match your filter</h3>
          <p className="text-sm text-slate-500">Try adjusting your search query or switching filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
              setActiveTab('all');
            }}
            className="px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedModules.map((mod) => {
            const allModItems = mod.topics.flatMap((t) => t.items);
            const modCompleted = allModItems.filter((i) => checkedIds.includes(i.id)).length;
            const modTotal = allModItems.length;
            const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
            const isFullyDone = modTotal > 0 && modCompleted === modTotal;
            const isCollapsed = expandedSections[mod.id] === false; // Default expanded

            return (
              <div
                key={mod.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 shadow-xs ${
                  isFullyDone
                    ? 'border-emerald-300 dark:border-emerald-900/60'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Module Header Bar */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/20 rounded-t-2xl">
                  <div
                    onClick={() => toggleSection(mod.id)}
                    className="flex items-center gap-3.5 cursor-pointer select-none group flex-1"
                  >
                    <button
                      type="button"
                      className="p-1 rounded-lg text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors"
                      aria-label="Toggle section"
                    >
                      {isCollapsed ? (
                        <ChevronRight className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold">
                      <ModuleIcon name={mod.icon} className="w-5 h-5 text-brand-500" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {mod.isTrack ? `Deep-Dive Track ${mod.number}` : `Module ${mod.number}`}
                        </span>
                        {isFullyDone && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                        {mod.name}
                      </h2>
                    </div>
                  </div>

                  {/* Progress & Quick Actions (Fully responsive) */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:self-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/60">
                    <div className="text-left sm:text-right">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        {modCompleted} / {modTotal} <span className="text-slate-400 font-normal">({modPercent}%)</span>
                      </div>
                      <div className="w-24 sm:w-28 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isFullyDone ? 'bg-emerald-500' : 'bg-brand-500'
                          }`}
                          style={{ width: `${modPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAllInModule(allModItems)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border shrink-0 ${
                        isFullyDone
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/40'
                      }`}
                      title={isFullyDone ? 'Uncheck all items in this module' : 'Mark all items in this module as completed'}
                    >
                      {isFullyDone ? 'Uncheck All' : 'Check All'}
                    </button>
                  </div>
                </div>

                {/* Subtopic Items */}
                {!isCollapsed && (
                  <div className="p-4 sm:p-5 space-y-6">
                    {mod.topics.map((topic) => (
                      <div key={topic.id} className="space-y-2.5">
                        {topic.name !== 'Core Topics' && topic.name !== 'Core' && (
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pt-2 pb-1 border-b border-slate-100 dark:border-slate-800/60">
                            {topic.name} ({topic.items.length})
                          </h4>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {topic.items.map((item) => {
                            const isChecked = checkedIds.includes(item.id);

                            return (
                              <div
                                key={item.id}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  isChecked
                                    ? 'bg-emerald-50/50 dark:bg-emerald-950/15 border-emerald-200 dark:border-emerald-900/50 text-slate-700 dark:text-slate-300'
                                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                              >
                                <div
                                  onClick={() => toggleItem(item.id)}
                                  className="flex items-center gap-3 cursor-pointer select-none flex-1 min-w-0 pr-2"
                                >
                                  <button
                                    type="button"
                                    className="flex-shrink-0 text-slate-400 hover:text-brand-500 focus:outline-none"
                                    aria-label={isChecked ? 'Mark incomplete' : 'Mark complete'}
                                  >
                                    {isChecked ? (
                                      <CheckSquare className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                      <Square className="w-4 h-4 text-slate-400" />
                                    )}
                                  </button>

                                  <span
                                    className={`text-xs sm:text-sm font-medium leading-snug line-clamp-2 ${
                                      isChecked
                                        ? 'line-through text-slate-400 dark:text-slate-500'
                                        : 'text-slate-800 dark:text-slate-200'
                                    }`}
                                  >
                                    {item.title}
                                  </span>
                                </div>

                                {/* Direct link to study guide + 20 MCQs */}
                                <Link
                                  to={item.fullPath}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 flex-shrink-0 transition-colors"
                                  title="Open study guide and practice 20+ MCQs"
                                >
                                  <span>20+ MCQs</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
