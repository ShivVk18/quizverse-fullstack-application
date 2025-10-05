import { useEffect } from 'react';
import { CheckCircle2, XCircle, Trophy, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { useQuiz } from '../hooks/useQuiz';

export const ScoreCard = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    if (!state.results || !state.user) {
      navigate('/');
    }
  }, [state.results, state.user, navigate]);

  if (!state.results) {
    return <Loader message="Loading results..." />;
  }

  const percentage = Math.round((state.score / state.results.length) * 100);
  const passed = percentage >= 60;

  const handleRetake = () => {
    dispatch({ type: 'RESET_QUIZ' });
    navigate('/quiz');
  };

  const handleGoHome = () => {
    dispatch({ type: 'RESET_QUIZ' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-6 border border-white/10">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
              passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-orange-500 to-amber-600'
            }`}>
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {passed ? 'Outstanding!' : 'Quiz Complete'}
            </h1>
            <p className="text-slate-400 text-sm">
              {passed ? "Excellent work! You've mastered this topic." : "Good effort! Review to improve."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-400/20">
              <div className="text-3xl font-bold text-white">{state.score}</div>
              <div className="text-xs text-slate-400">Correct</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-400/20">
              <div className="text-3xl font-bold text-white">{state.results.length}</div>
              <div className="text-xs text-slate-400">Total</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-400/20">
              <div className={`text-3xl font-bold ${passed ? 'text-green-400' : 'text-orange-400'}`}>
                {percentage}%
              </div>
              <div className="text-xs text-slate-400">Score</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRetake}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 bg-white/5 border border-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📋</span> Answer Review
          </h2>
          {state.results.map((result, index) => (
            <div
              key={result.id}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-5 border-l-4"
              style={{ borderLeftColor: result.isCorrect ? '#10b981' : '#ef4444' }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {result.isCorrect ? (
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-400/50">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-400/50">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-blue-500/20 text-white px-2 py-1 rounded text-xs font-semibold">
                      Q{index + 1}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      result.isCorrect
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-4 leading-snug">
                    {result.text}
                  </h3>

                  <div className="space-y-2">
                    {result.options.map((option, optionIndex) => {
                      const isUserAnswer = result.userAnswer?.text === option;
                      const isCorrectAnswer = result.correctAnswer?.text === option;

                      return (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border transition-all ${
                            isCorrectAnswer
                              ? 'bg-green-500/10 border-green-400/40'
                              : isUserAnswer && !result.isCorrect
                              ? 'bg-red-500/10 border-red-400/40'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white text-sm flex-1">{option}</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {isCorrectAnswer && (
                                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  ✓
                                </span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {!result.userAnswer?.text && (
                    <div className="mt-3 text-xs text-slate-400 italic bg-white/5 px-3 py-2 rounded border border-white/10">
                      ⚠️ Skipped
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
