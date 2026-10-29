import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, BookOpen, Sparkles, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs text-xs text-slate-500 dark:text-slate-400 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Platform Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-500 text-white font-mono font-bold flex items-center justify-center text-xs">
                M
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                MERN Learning Hub
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Complete, production-grade full-stack curriculum designed for engineers in India and worldwide. Master modern Web, React, Node, Express, and MongoDB.
            </p>
          </div>

          {/* Col 2: Core Stack */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              The Core Stack
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/learn/mongodb/nosql-and-crud/nosql-vs-sql" className="hover:text-brand-500 transition-colors">
                  MongoDB & Mongoose
                </Link>
              </li>
              <li>
                <Link to="/learn/express/routing-and-middleware/middleware" className="hover:text-brand-500 transition-colors">
                  Express.js & REST APIs
                </Link>
              </li>
              <li>
                <Link to="/learn/react/hooks/usestate" className="hover:text-brand-500 transition-colors">
                  React.js & Modern Hooks
                </Link>
              </li>
              <li>
                <Link to="/learn/nodejs/core-concepts/architecture-v8" className="hover:text-brand-500 transition-colors">
                  Node.js & V8 Runtime
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Advanced Tracks */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Advanced Tracks
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/learn/fullstack-integration/client-server-connect/cors-and-proxy" className="hover:text-brand-500 transition-colors">
                  Full-Stack Integration
                </Link>
              </li>
              <li>
                <Link to="/learn/authentication/jwt-and-passwords/jwt-tokens" className="hover:text-brand-500 transition-colors">
                  JWT Auth & Security
                </Link>
              </li>
              <li>
                <Link to="/learn/advanced-topics/websockets/socket-io" className="hover:text-brand-500 transition-colors">
                  WebSockets & Socket.io
                </Link>
              </li>
              <li>
                <Link to="/learn/interview-prep/technical-interviews/top-react-questions" className="hover:text-brand-500 transition-colors">
                  Top Interview Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Bilingual Tips */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Bilingual Learning
            </h4>
            <p className="text-[11px] leading-relaxed">
              Toggle between English, natural Hinglish, or Side-by-Side dual mode anytime in the header. Real Indian analogies (chai tapri, ticket counters) make complex distributed systems click instantly!
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} MERN Learning Hub. Built with React 18, Vite & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Aman Raj Verma and Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
