import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, X, BookOpen, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { getAllSubtopics } from '../../data/curriculum';
import { useLanguage } from '../../context/LanguageContext';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const allSubtopics = useMemo(() => getAllSubtopics(), []);

  // Initialize Fuse.js index
  const fuse = useMemo(() => {
    return new Fuse(allSubtopics, {
      keys: [
        { name: 'title.en', weight: 0.35 },
        { name: 'title.hi', weight: 0.35 },
        { name: 'topicTitle.en', weight: 0.15 },
        { name: 'topicTitle.hi', weight: 0.15 },
        { name: 'moduleTitle.en', weight: 0.1 },
        { name: 'summary.en', weight: 0.15 },
        { name: 'summary.hi', weight: 0.15 },
        { name: 'difficulty', weight: 0.05 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [allSubtopics]);

  // Compute search results
  const results = useMemo(() => {
    if (!query.trim()) {
      return allSubtopics.slice(0, 6);
    }
    return fuse.search(query).map((res) => res.item).slice(0, 8);
  }, [query, fuse, allSubtopics]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation within list & global shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].fullPath);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  const getTitle = (titleObj) => {
    if (!titleObj) return '';
    if (typeof titleObj === 'string') return titleObj;
    if (language === 'hi') return titleObj.hi || titleObj.en;
    return titleObj.en;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative mx-auto max-w-2xl transform divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-black/5 transition-all overflow-hidden border border-slate-200 dark:border-slate-800 animate-slide-down">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 gap-3">
          <Search className="w-5 h-5 text-brand-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search topics in English or Hinglish (e.g. useState, middleware, NoSQL, JWT)..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-400 stroke-1" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                No matching topics found
              </p>
              <p className="mt-1">
                Try searching for general terms like &apos;React&apos;, &apos;Hooks&apos;, &apos;API&apos;, &apos;MongoDB&apos;, or &apos;Node&apos;.
              </p>
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => handleSelect(item.fullPath)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30'
                      : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/15 text-brand-600 dark:text-brand-400">
                        {getTitle(item.moduleTitle)}
                      </span>
                      <span className="text-[10px] text-slate-400">/</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {getTitle(item.topicTitle)}
                      </span>
                    </div>
                    <h4
                      className={`text-sm font-semibold transition-colors truncate ${
                        isSelected
                          ? 'text-brand-600 dark:text-brand-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {getTitle(item.title)}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {language === 'hi' ? item.summary.hi : item.summary.en}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
                      {item.readTime}m
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? 'text-brand-500 translate-x-1'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700">↑↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700">↵</kbd> to select
            </span>
          </div>
          <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-sans font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" /> Fuzzy bilingual search
          </span>
        </div>
      </div>
    </div>
  );
}
