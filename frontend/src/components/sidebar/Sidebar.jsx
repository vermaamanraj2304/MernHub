import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  X,
  Compass,
  ChevronsUpDown,
  ListTodo,
  Sparkles,
} from 'lucide-react';
import { curriculum } from '../../data/curriculum';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { ModuleIcon } from '../../utils/iconMap';

export default function Sidebar({ isOpen, onClose }) {
  const { moduleSlug, topicSlug, subtopicSlug } = useParams();
  const location = useLocation();
  const { isCompleted, getModuleProgress } = useProgress();
  const { language } = useLanguage();

  // State for expanded modules and topics
  const [expandedModules, setExpandedModules] = useState(() => {
    // By default expand the module corresponding to the active route, or the first module
    if (moduleSlug) {
      const activeMod = curriculum.find((m) => m.slug === moduleSlug);
      return activeMod ? { [activeMod.id]: true } : { [curriculum[0].id]: true };
    }
    return { [curriculum[0].id]: true };
  });

  const [expandedTopics, setExpandedTopics] = useState(() => {
    if (moduleSlug && topicSlug) {
      const activeMod = curriculum.find((m) => m.slug === moduleSlug);
      const activeTopic = activeMod?.topics.find((t) => t.slug === topicSlug);
      return activeTopic ? { [activeTopic.id]: true } : {};
    }
    return {};
  });

  // Auto-expand module and topic when route changes
  useEffect(() => {
    if (moduleSlug) {
      const activeMod = curriculum.find((m) => m.slug === moduleSlug);
      if (activeMod) {
        setExpandedModules((prev) => ({ ...prev, [activeMod.id]: true }));
        if (topicSlug) {
          const activeTopic = activeMod.topics.find((t) => t.slug === topicSlug);
          if (activeTopic) {
            setExpandedTopics((prev) => ({ ...prev, [activeTopic.id]: true }));
          }
        }
      }
    }
  }, [moduleSlug, topicSlug]);

  const toggleModule = (modId) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const expandAll = () => {
    const allMods = {};
    const allTopics = {};
    curriculum.forEach((m) => {
      allMods[m.id] = true;
      m.topics.forEach((t) => {
        allTopics[t.id] = true;
      });
    });
    setExpandedModules(allMods);
    setExpandedTopics(allTopics);
  };

  const collapseAll = () => {
    setExpandedModules({});
    setExpandedTopics({});
  };

  const getTitle = (titleObj) => {
    if (!titleObj) return '';
    if (typeof titleObj === 'string') return titleObj;
    if (language === 'hi') return titleObj.hi || titleObj.en;
    if (language === 'en') return titleObj.en;
    // For both: return english with small hinglish subtitle or english
    return titleObj.en;
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Intermediate':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Advanced':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default:
        return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Sidebar Header & Controls */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-brand-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Curriculum
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={expandAll}
            className="text-[10px] text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 transition-colors"
            title="Expand All Modules"
          >
            Expand
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="text-[10px] text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 transition-colors"
            title="Collapse All Modules"
          >
            Collapse
          </button>
          {isOpen && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Module Tree (Level 1 > Level 2 > Level 3) */}
      <nav aria-label="Curriculum Navigation" className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {/* Quick Link to Master Checklist & Roadmap */}
        <div className="mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <NavLink
            to="/checklist"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-brand-500/10 text-slate-800 dark:text-slate-200 hover:from-emerald-500/20 hover:to-brand-500/20 border border-emerald-500/20'
              }`
            }
          >
            <div className="flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-emerald-500" />
              <span>Roadmap Checklist</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold bg-emerald-500 text-white">
              672
            </span>
          </NavLink>
        </div>

        {curriculum.map((mod) => {
          const modProgress = getModuleProgress(mod);
          const isModExpanded = !!expandedModules[mod.id];
          const isModActive = moduleSlug === mod.slug;

          return (
            <React.Fragment key={mod.id}>
              {mod.number === 12 && (
                <div className="pt-3 pb-1 px-1 border-t border-slate-200 dark:border-slate-800 my-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Deep-Dive Master Tracks</span>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Redis, Docker, CI/CD & Advanced Git
                  </p>
                </div>
              )}
              <div
                className={`rounded-xl transition-all duration-200 border ${
                  isModActive
                    ? 'border-brand-300/70 dark:border-brand-900/60 bg-brand-50/30 dark:bg-brand-950/20'
                    : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                }`}
              >
              {/* Level 1: Module Header */}
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between p-2.5 text-left rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs ${
                      mod.badgeColor === 'green'
                        ? 'bg-emerald-600'
                        : mod.badgeColor === 'cyan'
                        ? 'bg-cyan-500'
                        : mod.badgeColor === 'emerald'
                        ? 'bg-emerald-500'
                        : mod.badgeColor === 'amber'
                        ? 'bg-amber-500'
                        : mod.badgeColor === 'purple'
                        ? 'bg-purple-600'
                        : mod.badgeColor === 'rose'
                        ? 'bg-rose-500'
                        : 'bg-brand-600'
                    }`}
                  >
                    <ModuleIcon name={mod.icon} className="w-4 h-4 text-white" />
                  </span>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        {String(mod.number).padStart(2, '0')}.
                      </span>
                      <span className="text-xs font-semibold truncate text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {getTitle(mod.title)}
                      </span>
                    </div>
                    {/* Progress Bar inside module header */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-16 h-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${modProgress.percentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {modProgress.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 shrink-0 ml-1">
                  {isModExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              </button>

              {/* Level 2 & 3: Topics & Subtopics */}
              {isModExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-1.5 border-l-2 border-slate-200 dark:border-slate-800 ml-4 mb-2 animate-slide-down">
                  {mod.topics.map((topic) => {
                    const isTopicExpanded = !!expandedTopics[topic.id];
                    const isTopicActive = topicSlug === topic.slug && isModActive;

                    return (
                      <div key={topic.id} className="space-y-1">
                        {/* Level 2: Topic Header */}
                        <button
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className="w-full flex items-center justify-between py-1.5 px-2 text-left rounded-md text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors group"
                        >
                          <span className="truncate pr-1 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {getTitle(topic.title)}
                          </span>
                          <span className="text-slate-400 shrink-0">
                            {isTopicExpanded ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </span>
                        </button>

                        {/* Level 3: Subtopics (Links) */}
                        {isTopicExpanded && (
                          <div className="pl-2 space-y-0.5 animate-slide-down">
                            {topic.subtopics.map((sub) => {
                              const path = `/learn/${mod.slug}/${topic.slug}/${sub.slug}`;
                              const completedStatus = isCompleted(sub.id);

                              return (
                                <NavLink
                                  key={sub.id}
                                  to={path}
                                  onClick={() => {
                                    if (isOpen && onClose) onClose();
                                  }}
                                  className={({ isActive }) =>
                                    `flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs transition-all ${
                                      isActive
                                        ? 'bg-brand-500 text-white font-medium shadow-xs shadow-brand-500/20'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                      <div className="flex items-center gap-2 truncate pr-2">
                                        {/* Status Checkmark */}
                                        {completedStatus ? (
                                          <CheckCircle2
                                            className={`w-3.5 h-3.5 shrink-0 ${
                                              isActive ? 'text-white' : 'text-emerald-500'
                                            }`}
                                          />
                                        ) : (
                                          <Circle
                                            className={`w-3.5 h-3.5 shrink-0 ${
                                              isActive
                                                ? 'text-white/60'
                                                : 'text-slate-300 dark:text-slate-600'
                                            }`}
                                          />
                                        )}
                                        <span className="truncate">{getTitle(sub.title)}</span>
                                      </div>

                                      {/* Difficulty Badge / Dot */}
                                      <span
                                        className={`text-[9px] px-1.5 py-0.2 rounded border font-mono shrink-0 ${
                                          isActive
                                            ? 'bg-white/20 text-white border-white/30'
                                            : getDifficultyColor(sub.difficulty)
                                        }`}
                                      >
                                        {sub.difficulty[0]}
                                      </span>
                                    </>
                                  )}
                                </NavLink>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar with its own independent scroll */}
      <aside className="hidden lg:block w-72 shrink-0 h-full overflow-hidden z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] shadow-2xl animate-fade-in z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
