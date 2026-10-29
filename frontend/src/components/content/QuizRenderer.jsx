import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Award,
  Layers,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';

export default function QuizRenderer({ quiz = [], subtopicId }) {
  const { language, isBoth, isHinglish } = useLanguage();
  const { recordQuizScore, getQuizScore } = useProgress();

  const existingScore = subtopicId ? getQuizScore(subtopicId) : null;

  // View Mode: 'stepper' (1 question at a time) vs 'list' (all questions at once)
  const [viewMode, setViewMode] = useState('stepper');
  const [currentIdx, setCurrentIdx] = useState(0);

  // Initialize selected answers from localStorage
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    if (subtopicId) {
      try {
        const saved = localStorage.getItem(`mern_quiz_ans_${subtopicId}`);
        if (saved) return JSON.parse(saved);
        if (existingScore && existingScore.answers) return existingScore.answers;
      } catch (e) {
        console.warn('Failed to load saved quiz answers', e);
      }
    }
    return {};
  });

  const [hasCelebrated, setHasCelebrated] = useState(() => {
    return existingScore ? existingScore.passed : false;
  });

  // Re-sync if subtopicId changes
  useEffect(() => {
    if (subtopicId) {
      try {
        const saved = localStorage.getItem(`mern_quiz_ans_${subtopicId}`);
        if (saved) {
          setSelectedAnswers(JSON.parse(saved));
          return;
        }
        if (existingScore && existingScore.answers) {
          setSelectedAnswers(existingScore.answers);
          return;
        }
      } catch (e) {}
      setSelectedAnswers({});
      setHasCelebrated(false);
      setCurrentIdx(0);
    }
  }, [subtopicId]);

  if (!quiz || quiz.length === 0) return null;

  const getItemQuestion = (item) => item.q || item.question;
  const getItemAnswerIndex = (item) => (item.answerIndex !== undefined ? item.answerIndex : item.correctAnswer);

  const handleSelect = (qIdx, optIdx) => {
    if (selectedAnswers[qIdx] !== undefined) return;

    const newAnswers = { ...selectedAnswers, [qIdx]: optIdx };
    setSelectedAnswers(newAnswers);

    if (subtopicId) {
      try {
        localStorage.setItem(`mern_quiz_ans_${subtopicId}`, JSON.stringify(newAnswers));
      } catch (e) {}
    }

    const newCorrectCount = quiz.reduce((acc, item, index) => {
      const ansIdx = getItemAnswerIndex(item);
      return newAnswers[index] === ansIdx ? acc + 1 : acc;
    }, 0);

    const answeredCount = Object.keys(newAnswers).length;
    const isFinished = answeredCount === quiz.length;
    const percentage = Math.round((newCorrectCount / quiz.length) * 100);
    const passed = percentage >= 70;

    if ((isFinished || (answeredCount >= 5 && passed)) && !hasCelebrated && passed) {
      setHasCelebrated(true);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }

    if (subtopicId) {
      recordQuizScore(subtopicId, {
        score: newCorrectCount,
        total: quiz.length,
        answers: newAnswers,
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setHasCelebrated(false);
    setCurrentIdx(0);
    if (subtopicId) {
      try {
        localStorage.removeItem(`mern_quiz_ans_${subtopicId}`);
      } catch (e) {}
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = quiz.reduce((acc, item, index) => {
    return selectedAnswers[index] === getItemAnswerIndex(item) ? acc + 1 : acc;
  }, 0);

  const getQuestion = (qObj) => {
    if (!qObj) return '';
    if (typeof qObj === 'string') return qObj;
    if (language === 'hi') return qObj.hi || qObj.en;
    return qObj.en;
  };

  const getOption = (optObj) => {
    if (!optObj) return '';
    if (typeof optObj === 'string') return optObj;
    if (language === 'hi') return optObj.hi || optObj.en;
    return optObj.en;
  };

  const getExplanation = (expObj) => {
    if (!expObj) return '';
    if (typeof expObj === 'string') return expObj;
    if (language === 'hi') return expObj.hi || expObj.en;
    return expObj.en;
  };

  // Helper to jump to next unanswered question
  const jumpToNextUnanswered = () => {
    for (let i = 0; i < quiz.length; i++) {
      const idx = (currentIdx + 1 + i) % quiz.length;
      if (selectedAnswers[idx] === undefined) {
        setCurrentIdx(idx);
        return;
      }
    }
  };

  const currentItem = quiz[currentIdx] || quiz[0];
  const currentItemAns = getItemAnswerIndex(currentItem);
  const currentItemQ = getItemQuestion(currentItem);
  const currentSelected = selectedAnswers[currentIdx];
  const isCurrentAnswered = currentSelected !== undefined;
  const isCurrentCorrect = isCurrentAnswered && currentSelected === currentItemAns;

  return (
    <div id="quiz" className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-3 rounded-2xl bg-brand-500 text-white shadow-md shadow-brand-500/20 shrink-0">
            <Trophy className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Interactive Topic Quiz
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold">
                Saved in LocalStorage
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isHinglish ? 'Check Your Understanding' : 'Test Your Knowledge'}
            </h3>
          </div>
        </div>

        {/* View Mode Switcher & Score */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-end sm:self-auto">
          {/* View Mode Toggle: Stepper vs List */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('stepper')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'stepper'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1-by-1 Steps
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All {quiz.length}
            </button>
          </div>

          {answeredCount > 0 && (
            <div
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 ${
                correctCount / quiz.length >= 0.7
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {correctCount / quiz.length >= 0.7 && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              )}
              <span>
                Score: {correctCount}/{quiz.length} ({Math.round((correctCount / quiz.length) * 100)}%)
              </span>
            </div>
          )}

          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors"
              title="Reset quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      {/* STEPPER MODE: 1-by-1 Question Presentation (Default & Recommended) */}
      {viewMode === 'stepper' ? (
        <div className="space-y-6 mt-6">
          {/* Question Palette: Pills 1 through quiz.length */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Question {currentIdx + 1} of {quiz.length}</span>
              <span>{answeredCount} answered • {quiz.length - answeredCount} pending</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {quiz.map((q, idx) => {
                const isAns = selectedAnswers[idx] !== undefined;
                const isCor = isAns && selectedAnswers[idx] === getItemAnswerIndex(q);
                const isCurr = idx === currentIdx;

                let pillStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700';
                if (isAns) {
                  pillStyle = isCor
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-rose-500 text-white shadow-xs';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-bold shrink-0 transition-all flex items-center justify-center ${pillStyle} ${
                      isCurr ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-105' : ''
                    }`}
                    title={`Jump to Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Card */}
          <div className="rounded-2xl p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 space-y-5 animate-fade-in">
            {/* Question Title */}
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-brand-500 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                Q{currentIdx + 1}
              </span>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {getQuestion(currentItemQ)}
                </h4>
                {isBoth && currentItemQ?.hi && currentItemQ.hi !== currentItemQ.en && (
                  <p className="text-xs sm:text-sm text-brand-600 dark:text-brand-400 font-medium">
                    {currentItemQ.hi}
                  </p>
                )}
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3 sm:pl-10">
              {currentItem.options.map((opt, optIdx) => {
                let optStyle =
                  'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-brand-500/50 hover:bg-brand-50/20';

                if (isCurrentAnswered) {
                  if (optIdx === currentItemAns) {
                    optStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs';
                  } else if (optIdx === currentSelected) {
                    optStyle =
                      'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-semibold';
                  } else {
                    optStyle =
                      'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isCurrentAnswered}
                    onClick={() => handleSelect(currentIdx, optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 group ${optStyle}`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                      <span className="w-6 h-6 rounded-md border border-current flex items-center justify-center text-xs font-mono font-bold uppercase shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="break-words leading-relaxed">{getOption(opt)}</span>
                    </div>

                    {isCurrentAnswered && (
                      <span className="shrink-0">
                        {optIdx === currentItemAns ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : optIdx === currentSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Reveal */}
            {isCurrentAnswered && (
              <div className="sm:pl-10 animate-slide-down">
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                    isCurrentCorrect
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Explanation:</span>
                  </div>
                  {isBoth ? (
                    <div className="space-y-1">
                      <p>{currentItem.explanation?.en}</p>
                      {currentItem.explanation?.hi && (
                        <p className="text-amber-700 dark:text-amber-300 font-medium pt-1 border-t border-slate-200 dark:border-slate-700">
                          {currentItem.explanation.hi}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p>{getExplanation(currentItem.explanation)}</p>
                  )}
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 sm:pl-10">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {quiz.length - answeredCount > 0 && isCurrentAnswered && (
                  <button
                    type="button"
                    onClick={jumpToNextUnanswered}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-colors"
                  >
                    <span>Next Unanswered</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  disabled={currentIdx === quiz.length - 1}
                  onClick={() => setCurrentIdx((prev) => Math.min(quiz.length - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* LIST MODE: All questions rendered vertically */
        <div className="space-y-8 mt-6">
          {quiz.map((item, qIdx) => {
            const itemAns = getItemAnswerIndex(item);
            const itemQ = getItemQuestion(item);
            const selected = selectedAnswers[qIdx];
            const isAnswered = selected !== undefined;
            const isCorrect = isAnswered && selected === itemAns;

            return (
              <div
                key={qIdx}
                className="rounded-2xl p-5 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 space-y-4"
              >
                {/* Question Title */}
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug">
                      {getQuestion(itemQ)}
                    </h4>
                    {isBoth && itemQ?.hi && itemQ.hi !== itemQ.en && (
                      <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                        {itemQ.hi}
                      </p>
                    )}
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-2.5 sm:pl-9">
                  {item.options.map((opt, optIdx) => {
                    let optStyle =
                      'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-brand-500/50 hover:bg-brand-50/20';

                    if (isAnswered) {
                      if (optIdx === itemAns) {
                        optStyle =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs';
                      } else if (optIdx === selected) {
                        optStyle =
                          'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-semibold';
                      } else {
                        optStyle =
                          'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelect(qIdx, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-2 group ${optStyle}`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                          <span className="w-5 h-5 rounded-md border border-current flex items-center justify-center text-[10px] font-mono font-bold uppercase shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="break-words leading-relaxed">{getOption(opt)}</span>
                        </div>

                        {isAnswered && (
                          <span className="shrink-0">
                            {optIdx === itemAns ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : optIdx === selected ? (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            ) : null}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal */}
                {isAnswered && (
                  <div className="sm:pl-9 animate-slide-down">
                    <div
                      className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                        isCorrect
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Explanation:</span>
                      </div>
                      {isBoth ? (
                        <div className="space-y-1">
                          <p>{item.explanation?.en}</p>
                          {item.explanation?.hi && (
                            <p className="text-amber-700 dark:text-amber-300 font-medium pt-1 border-t border-slate-200 dark:border-slate-700">
                              {item.explanation.hi}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>{getExplanation(item.explanation)}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Completion Summary Banner (Shown when user finishes all questions) */}
      {answeredCount === quiz.length && (
        <div
          className={`mt-8 p-6 rounded-2xl border text-center space-y-3 animate-fade-in ${
            correctCount / quiz.length >= 0.7
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
              : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
          }`}
        >
          <div className="inline-flex p-3 rounded-full bg-white dark:bg-slate-900 shadow-md">
            {correctCount / quiz.length >= 0.7 ? (
              <Trophy className="w-8 h-8 text-amber-500" />
            ) : (
              <RotateCcw className="w-8 h-8 text-amber-500" />
            )}
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            {correctCount / quiz.length >= 0.7
              ? isHinglish
                ? 'Shabash! Topic Mastered & Saved in LocalStorage'
                : 'Great Job! Topic Mastered & Saved'
              : isHinglish
              ? 'Achha prayas! Explanations padhein aur retry karein'
              : 'Good effort! Review the explanations and retry'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {correctCount / quiz.length >= 0.7
              ? isHinglish
                ? `Aapne score kiya ${correctCount}/${quiz.length} (${Math.round(
                    (correctCount / quiz.length) * 100
                  )}%). Progress browser localStorage mein save ho gaya hai aur ye topic complete mark ho gaya hai!`
                : `You scored ${correctCount}/${quiz.length} (${Math.round(
                    (correctCount / quiz.length) * 100
                  )}%). Your progress is saved in browser localStorage and this topic is marked complete!`
              : isHinglish
              ? `Aapne score kiya ${correctCount}/${quiz.length} (${Math.round(
                  (correctCount / quiz.length) * 100
                )}%). Topic ko complete mark karne ke liye 70% ya usse zyada score zaroori hai. Retry dabakar dubara try karein.`
              : `You scored ${correctCount}/${quiz.length} (${Math.round(
                  (correctCount / quiz.length) * 100
                )}%). A score of 70% or higher is required to mark this topic complete. Hit Retry above to try again.`}
          </p>
        </div>
      )}
    </div>
  );
}
