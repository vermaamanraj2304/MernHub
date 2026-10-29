import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Search, Bookmark, Menu, X, Sparkles, BookOpen, ListTodo, Flame } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';

export default function Navbar({ onToggleMobileSidebar, isMobileSidebarOpen, onOpenSearch }) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { bookmarks, completed, learningStats } = useProgress();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            aria-label={isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-emerald-500 to-cyan-400 p-0.5 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-mono font-bold text-sm sm:text-base text-cyan-400">
                M
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                  MERN<span className="text-brand-500">Hub</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 hidden sm:inline-block">
                  Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none hidden md:block">
                Zero to Job-Ready • English + Hinglish
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar Trigger (Cmd+K) - Desktop only (>= 1024px) */}
        <div className="flex-1 max-w-md mx-2 hidden lg:block">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search topics, concepts, code...</span>
            </span>
            <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded shadow-xs">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Language Toggle, Theme Toggle, Bookmarks */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Learning Streak indicator */}
          {learningStats?.streak > 0 && (
            <div
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20 shadow-xs"
              title={`Learning streak: ${learningStats.streak} day(s) active!`}
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{learningStats.streak}d streak</span>
            </div>
          )}

          {/* Roadmap & Checklist Button with Live LocalStorage Progress */}
          <Link
            to="/checklist"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors shadow-xs"
            title="Full-Stack Master Checklist & Roadmap"
          >
            <ListTodo className="w-3.5 h-3.5 text-emerald-500" />
            <span>Roadmap</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
              {completed.length > 0 ? `${completed.length}/672` : '672'}
            </span>
          </Link>

          {/* Search icon button for screens < 1024px */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search topics"
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Language Selector: English | Hinglish | Both (Responsive Labels) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs font-medium shrink-0">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="English only"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Hinglish (Hindi in Roman script)"
            >
              <span className="hidden sm:inline">Hinglish</span>
              <span className="sm:hidden font-mono font-semibold">HI</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('both')}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all flex items-center gap-1 ${
                language === 'both'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Dual mode: English + Hinglish side-by-side"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-500 shrink-0" />
              <span className="hidden sm:inline">Both</span>
              <span className="sm:hidden font-mono font-semibold">2x</span>
            </button>
          </div>

          {/* Bookmarks Counter Button */}
          <Link
            to="/#bookmarks"
            aria-label="View bookmarks"
            className="relative p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`${bookmarks.length} Bookmarks saved`}
          >
            <Bookmark className="w-4 h-4" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-brand-500 text-[8px] sm:text-[9px] font-bold text-white shadow-xs">
                {bookmarks.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
