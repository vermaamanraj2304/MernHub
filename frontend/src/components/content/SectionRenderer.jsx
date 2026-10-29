import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  BookOpen,
  Code2,
  Lightbulb,
  AlertOctagon,
  ListChecks,
  Compass,
  Sparkles,
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import AnalogyCard from './AnalogyCard';
import MistakesCard from './MistakesCard';
import InterviewCard from './InterviewCard';
import { useLanguage } from '../../context/LanguageContext';

export default function SectionRenderer({ section, index }) {
  const { language, isBoth, isHinglish } = useLanguage();

  if (!section) return null;

  const sectionId = section.id || `section-${section.type}-${index}`;
  const { type, heading, body, code } = section;

  // Handle specialized section types
  if (type === 'analogy') {
    return (
      <div id={sectionId}>
        <AnalogyCard heading={heading} body={body} />
      </div>
    );
  }

  if (type === 'mistakes') {
    return (
      <div id={sectionId}>
        <MistakesCard heading={heading} body={body} code={code} items={section.items} />
      </div>
    );
  }

  if (type === 'interview') {
    return (
      <div id={sectionId}>
        <InterviewCard
          heading={heading}
          body={body}
          questions={section.questions || []}
        />
      </div>
    );
  }

  // Type visual badge configuration
  const getTypeBadge = () => {
    switch (type) {
      case 'concept':
        return {
          icon: BookOpen,
          label: 'Core Concept',
          color: 'text-brand-600 dark:text-brand-400 bg-brand-500/10 border-brand-500/20',
        };
      case 'syntax':
        return {
          icon: Code2,
          label: 'Syntax & Signature',
          color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        };
      case 'example':
        return {
          icon: Compass,
          label: 'Runnable Example',
          color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        };
      case 'summary':
        return {
          icon: ListChecks,
          label: 'Key Takeaways',
          color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        };
      case 'tip':
        return {
          icon: Lightbulb,
          label: 'Pro Tip',
          color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
        };
      case 'warning':
        return {
          icon: AlertOctagon,
          label: 'Warning & Caveats',
          color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
        };
      default:
        return {
          icon: BookOpen,
          label: 'Section',
          color: 'text-slate-600 bg-slate-500/10 border-slate-500/20',
        };
    }
  };

  const badge = getTypeBadge();
  const IconComponent = badge.icon;

  const resolvedHeading = isHinglish ? heading?.hi || heading?.en : heading?.en;

  return (
    <section id={sectionId} className="my-8 scroll-mt-24 space-y-4">
      {/* Section Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badge.color}`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{badge.label}</span>
          </span>
        </div>

        {resolvedHeading && (
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {resolvedHeading}
          </h3>
        )}

        {isBoth && heading?.hi && heading?.hi !== heading?.en && (
          <h4 className="text-sm font-semibold text-brand-600 dark:text-brand-400">
            {heading.hi}
          </h4>
        )}
      </div>

      {/* Section Body: Markdown with Bilingual Columns or Single Mode */}
      {body && (
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          {isBoth ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              {/* English Column */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <span>English</span>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-code:text-brand-600 dark:prose-code:text-brand-400 prose-pre:bg-transparent">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {body.en || ''}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Hinglish Column */}
              <div className="space-y-2 md:border-l md:border-slate-200 md:dark:border-slate-800 md:pl-6">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hinglish</span>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-code:text-amber-600 dark:prose-code:text-amber-400 prose-pre:bg-transparent">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {body.hi || ''}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs prose-headings:font-bold prose-code:text-brand-600 dark:prose-code:text-brand-400 prose-pre:bg-transparent">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {isHinglish ? body.hi || body.en : body.en}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Code Snippet (if provided) */}
      {code && (
        <CodeBlock
          code={code.snippet}
          language={code.language}
          filename={code.filename}
          highlightLines={code.highlightLines}
        />
      )}
    </section>
  );
}
