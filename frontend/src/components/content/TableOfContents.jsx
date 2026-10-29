import React, { useState } from 'react';
import { AlignLeft, ChevronDown, ChevronUp, Sparkles, Trophy } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useLanguage } from '../../context/LanguageContext';

export default function TableOfContents({ sections = [], hasQuiz = false, isMobile = false }) {
  const { language, isHinglish } = useLanguage();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Build items list
  const items = sections.map((sec, idx) => {
    const id = sec.id || `section-${sec.type}-${idx}`;
    const heading = isHinglish ? sec.heading?.hi || sec.heading?.en : sec.heading?.en;
    return {
      id,
      label: heading || `${sec.type.toUpperCase()}`,
      type: sec.type,
    };
  });

  if (hasQuiz) {
    items.push({
      id: 'quiz',
      label: isHinglish ? 'Interactive Quiz (MCQs)' : 'Interactive Quiz (MCQs)',
      type: 'quiz',
    });
  }

  const ids = items.map((item) => item.id);
  const activeId = useScrollSpy(ids, 140);

  const handleClick = (e, id) => {
    e.preventDefault();
    if (isMobile) setIsOpenMobile(false);
    const elem = document.getElementById(id);
    const container = document.getElementById('main-content-scroll');
    if (elem) {
      if (container) {
        const top = elem.offsetTop - 20;
        container.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      } else {
        const yOffset = -80;
        const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  if (items.length === 0) return null;

  if (isMobile) {
    const activeItem = items.find((item) => item.id === activeId) || items[0];

    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-700 dark:text-slate-200"
          aria-expanded={isOpenMobile}
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <AlignLeft className="w-4 h-4 text-brand-500 shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              On this page:
            </span>
            <span className="truncate text-slate-900 dark:text-white font-medium text-xs">
              {activeItem?.label || 'Select Section'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
              {items.length} sections
            </span>
            {isOpenMobile ? <ChevronUp className="w-4 h-4 text-brand-500" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isOpenMobile && (
          <nav aria-label="Mobile Table of Contents" className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 max-h-64 overflow-y-auto animate-slide-down">
            {items.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-2 px-3 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {item.type === 'quiz' ? (
                      <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {idx + 1}.
                      </span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                </a>
              );
            })}
          </nav>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
        <AlignLeft className="w-4 h-4 text-brand-500" />
        <h4 className="text-xs font-bold uppercase tracking-wider">
          On This Page
        </h4>
      </div>

      <nav aria-label="Table of Contents" className="space-y-1 text-xs max-h-[70vh] overflow-y-auto">
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-1.5 px-2.5 rounded-lg text-xs transition-all ${
                isActive
                  ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold border-l-2 border-brand-500 pl-3'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                {item.type === 'quiz' ? (
                  <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                ) : (
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {idx + 1}.
                  </span>
                )}
                <span className="truncate">{item.label}</span>
              </div>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
