import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { isHinglish } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-mono font-extrabold text-3xl shadow-inner">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {isHinglish ? 'Yeh Page Nahi Mila!' : 'Page Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {isHinglish
              ? 'Aisa lagta hai ki aap galat route pe aa gaye hain. Server ne 404 status code return kiya hai.'
              : 'The route or subtopic you are looking for does not exist or may have been relocated.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
          <Link
            to="/learn/react/hooks/usestate"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
          >
            <Terminal className="w-4 h-4" />
            <span>Explore React</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
