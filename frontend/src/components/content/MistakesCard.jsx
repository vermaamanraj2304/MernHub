import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertTriangle, XCircle, CheckCircle, Flame } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import CodeBlock from './CodeBlock';

export default function MistakesCard({ heading, body, code, items = [] }) {
  const { language, isBoth, isHinglish } = useLanguage();

  return (
    <div className="my-6 rounded-2xl border border-rose-300 dark:border-rose-900/60 bg-gradient-to-br from-rose-50/50 via-white to-rose-50/20 dark:from-rose-950/20 dark:via-slate-900 dark:to-rose-950/10 p-5 sm:p-7 shadow-lg shadow-rose-500/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 rounded-xl bg-rose-600 text-white shadow-md shadow-rose-600/30">
          <AlertTriangle className="w-5 h-5" />
        </span>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Common Pitfalls & Mistakes
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isHinglish ? heading?.hi || heading?.en : heading?.en}
          </h3>
        </div>
      </div>

      {/* Main explanation body */}
      {body && (
        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          {isBoth ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="prose prose-sm dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body.en || ''}
                </ReactMarkdown>
              </div>
              <div className="prose prose-sm dark:prose-invert md:border-l md:border-slate-200 md:dark:border-slate-800 md:pl-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body.hi || ''}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {isHinglish ? body.hi || body.en : body.en}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* If code is attached */}
      {code && (
        <CodeBlock
          code={code.snippet}
          language={code.language}
          filename={code.filename}
          highlightLines={code.highlightLines}
        />
      )}
    </div>
  );
}
