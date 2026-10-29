import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function InterviewCard({ heading, body, questions = [] }) {
  const { language, isBoth, isHinglish } = useLanguage();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (idx) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="my-6 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-lg shadow-purple-500/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30">
          <HelpCircle className="w-5 h-5" />
        </span>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Interview Prep & Technical Rounds
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isHinglish ? heading?.hi || heading?.en : heading?.en}
          </h3>
        </div>
      </div>

      {/* Main explanation body if present */}
      {body && (
        <div className="mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {isHinglish ? body?.hi || body?.en : body?.en}
          </ReactMarkdown>
        </div>
      )}

      {/* Questions list (accordion or parsed list) */}
      {questions && questions.length > 0 && (
        <div className="space-y-3 pt-2">
          {questions.map((qItem, idx) => {
            const isOpen = !!openItems[idx];
            const qTitle = isHinglish ? qItem.q?.hi || qItem.q?.en : qItem.q?.en;
            const aBody = isHinglish ? qItem.a?.hi || qItem.a?.en : qItem.a?.en;

            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {qTitle}
                    </span>
                  </div>
                  <span className="text-slate-400 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-purple-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed animate-slide-down space-y-3">
                    {isBoth ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Answer (English)
                          </span>
                          <div className="prose prose-xs dark:prose-invert">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {qItem.a?.en || ''}
                            </ReactMarkdown>
                          </div>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-200 md:dark:border-slate-800 md:pl-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                            Answer (Hinglish)
                          </span>
                          <div className="prose prose-xs dark:prose-invert">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {qItem.a?.hi || ''}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {aBody}
                        </ReactMarkdown>
                      </div>
                    )}

                    {qItem.takeaway && (
                      <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 flex items-start gap-2 text-xs text-purple-800 dark:text-purple-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-purple-600 mt-0.5" />
                        <div>
                          <strong>Key Takeaway: </strong>
                          {isHinglish ? qItem.takeaway?.hi || qItem.takeaway?.en : qItem.takeaway?.en}
                        </div>
                      </div>
                    )}
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
