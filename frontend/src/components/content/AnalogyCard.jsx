import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Coffee, Sparkles, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AnalogyCard({ heading, body }) {
  const { language, isBoth, isEnglish, isHinglish } = useLanguage();

  return (
    <div className="my-6 rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-amber-950/10 p-5 sm:p-7 shadow-lg shadow-amber-500/5 relative overflow-hidden">
      {/* Background visual motif */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30 flex items-center justify-center">
          <Coffee className="w-4 h-4" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Desi Real-Life Analogy
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Indian Context 🇮🇳
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {isHinglish ? heading?.hi || heading?.en : heading?.en}
          </h3>
        </div>
      </div>

      {/* Content Rendering: Single Column or Dual-Column for Both */}
      {isBoth ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-amber-200/60 dark:border-amber-800/40">
          {/* English Analogy */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>English Context</span>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {body?.en || ''}
              </ReactMarkdown>
            </div>
          </div>

          {/* Hinglish Analogy */}
          <div className="space-y-1.5 md:border-l md:border-amber-200/60 md:dark:border-amber-800/40 md:pl-6">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hinglish (Desi Samajh)</span>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {body?.hi || ''}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm pt-2 border-t border-amber-200/60 dark:border-amber-800/40">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {isHinglish ? body?.hi || body?.en : body?.en}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
