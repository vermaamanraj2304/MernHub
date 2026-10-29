import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Breadcrumb({ module: mod, topic, subtopic }) {
  const { resolveText, language } = useLanguage();

  const getLabel = (titleObj) => {
    if (!titleObj) return '';
    if (typeof titleObj === 'string') return titleObj;
    if (language === 'hi') return titleObj.hi || titleObj.en;
    if (language === 'en') return titleObj.en;
    // For both, keep it clean in breadcrumbs with English primary
    return titleObj.en;
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 dark:text-slate-400 py-1 overflow-x-auto no-scrollbar">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {mod && (
          <li className="inline-flex items-center">
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 mx-1" />
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {getLabel(mod.title)}
            </span>
          </li>
        )}

        {topic && (
          <li className="inline-flex items-center">
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 mx-1" />
            <span className="text-slate-600 dark:text-slate-300">
              {getLabel(topic.title)}
            </span>
          </li>
        )}

        {subtopic && (
          <li className="inline-flex items-center" aria-current="page">
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 mx-1" />
            <span className="font-semibold text-brand-600 dark:text-brand-400 truncate max-w-[200px] sm:max-w-xs">
              {getLabel(subtopic.title)}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
