import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Check, Copy, Terminal, FileCode } from 'lucide-react';

export default function CodeBlock({
  code = '',
  language = 'javascript',
  filename = '',
  highlightLines = [],
}) {
  const [copied, setCopied] = useState(false);

  const cleanCode = typeof code === 'string' ? code.trim() : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  // Map common language aliases
  const normalizedLanguage = (() => {
    const lang = (language || 'javascript').toLowerCase();
    if (lang === 'jsx' || lang === 'react') return 'jsx';
    if (lang === 'tsx') return 'tsx';
    if (lang === 'js') return 'javascript';
    if (lang === 'sh' || lang === 'shell') return 'bash';
    if (lang === 'yml') return 'yaml';
    return lang;
  })();

  return (
    <div className="relative my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0d1117] shadow-xl text-xs sm:text-sm font-mono w-full max-w-full">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 text-slate-400">
        <div className="flex items-center gap-2">
          {filename ? (
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <FileCode className="w-3.5 h-3.5 text-brand-400" />
              <span>{filename}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              <span className="uppercase tracking-wider text-[11px]">
                {normalizedLanguage}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-slate-500 font-sans">
            {normalizedLanguage}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-sans text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Syntax Highlighting Container */}
      <Highlight
        theme={themes.nightOwl}
        code={cleanCode}
        language={normalizedLanguage}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="overflow-x-auto max-w-full p-4 leading-relaxed font-mono text-xs sm:text-[13px] block"
            style={{
              ...style,
              backgroundColor: 'transparent',
              margin: 0,
            }}
          >
            <div className="table min-w-full border-collapse">
              {tokens.map((line, i) => {
                const lineNumber = i + 1;
                const isHighlighted = highlightLines.includes(lineNumber);
                const lineProps = getLineProps({ line, key: i });

                return (
                  <div
                    key={i}
                    {...lineProps}
                    className={`table-row ${
                      isHighlighted
                        ? 'bg-brand-500/15 border-l-2 border-brand-400'
                        : ''
                    }`}
                  >
                    {/* Line Number */}
                    <span className="table-cell pr-3 sm:pr-4 text-right select-none text-slate-600 text-[11px] w-8 shrink-0">
                      {lineNumber}
                    </span>
                    {/* Line Content */}
                    <span className="table-cell whitespace-pre">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
