import { useEffect, useState, useCallback } from 'react';
import { Clock, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { useQuiz } from '../hooks/useQuiz';

export const QuizInterface = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log('QuizInterface render - State:', {
    hasUser: !!state.user,
    userId: state.user?.id,
    hasQuiz: !!state.quiz,
    quizId: state.quiz?.id,
    timeRemaining: state.timeRemaining,
    quizCompleted: state.quizCompleted
  });

  // Define handleSubmit with useCallback
  const handleSubmit = useCallback(async () => {
    console.log('handleSubmit called');
    
    // Safety checks
    if (!state.quiz?.id) {
      console.error('Cannot submit: Quiz not loaded');
      setError('Quiz not loaded properly. Please refresh the page.');
      return;
    }
    
    if (!state.user?.id) {
      console.error('Cannot submit: User not found');
      setError('User not found. Please login again.');
      navigate('/');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Submitting quiz:', {
        quizId: state.quiz.id,
        userId: state.user.id,
        answersCount: Object.keys(state.answers).length
      });

      const response = await apiService.submitQuiz(
        state.quiz.id,
        state.user.id,
        state.answers
      );
      
      console.log('Submit response:', response);
      dispatch({ type: 'SUBMIT_QUIZ', payload: response.data });
      navigate('/results');
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [state.quiz?.id, state.user?.id, state.answers, dispatch, navigate]);

  // Load quiz effect
  useEffect(() => {
    if (!state.user) {
      console.log('No user found, redirecting to home');
      navigate('/');
      return;
    }

    const loadQuiz = async () => {
      setLoading(true);
      setError('');
      
      try {
        console.log('Fetching random quiz...');
        const response = await apiService.getRandomQuiz();
        
        console.log('Quiz API Response:', response);
        
        // Validate response
        if (!response || !response.data) {
          throw new Error('Invalid quiz response from server');
        }
        
        if (!response.data.id) {
          throw new Error('Quiz ID is missing');
        }
        
        if (!response.data.questions || response.data.questions.length === 0) {
          throw new Error('Quiz has no questions');
        }
        
        console.log('Quiz loaded successfully:', {
          id: response.data.id,
          title: response.data.title,
          questionCount: response.data.questions.length
        });
        
        dispatch({ type: 'SET_QUIZ', payload: response.data });
      } catch (err) {
        console.error('Failed to load quiz:', err);
        setError(err.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    if (!state.quiz) {
      loadQuiz();
    }
  }, [state.quiz, state.user, dispatch, navigate]);

 
  useEffect(() => {
   
    if (!state.quiz) {
      console.log('Timer effect: Quiz not loaded yet, skipping');
      return;
    }

    if (state.timeRemaining > 0 && !state.quizCompleted) {
      console.log('Starting timer, time remaining:', state.timeRemaining);
      const timer = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);

      return () => {
        console.log('Clearing timer');
        clearInterval(timer);
      };
    } else if (state.timeRemaining === 0 && !state.quizCompleted && state.quiz) {
      console.log('Time up! Auto-submitting quiz');
      handleSubmit();
    }
  }, [state.timeRemaining, state.quizCompleted, state.quiz, handleSubmit, dispatch]);

  const handleAnswerSelect = (questionId, answer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, answer } });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  
  if (loading && !state.quiz) {
    return <Loader message="Loading quiz..." />;
  }

  
  if (error && !state.quiz) {
    return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
  }

  
  if (!state.quiz) {
    return <Loader message="Preparing quiz..." />;
  }


  if (!state.quiz.questions || state.quiz.questions.length === 0) {
    return <ErrorDisplay 
      error="This quiz has no questions" 
      onRetry={() => window.location.reload()} 
    />;
  }

  const currentQuestion = state.quiz.questions[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex + 1) / state.quiz.questions.length) * 100;
  const answeredCount = Object.keys(state.answers).length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div>
              <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                {state.quiz.title}
              </h1>
              <p className="text-xs text-slate-400">
                Question {state.currentQuestionIndex + 1} of {state.quiz.questions.length}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              state.timeRemaining < 60 ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 border border-white/10'
            }`}>
              <Clock className={`w-4 h-4 ${state.timeRemaining < 60 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`} />
              <span className={`font-mono font-semibold ${state.timeRemaining < 60 ? 'text-red-400' : 'text-white'}`}>
                {formatTime(state.timeRemaining)}
              </span>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl shadow-xl p-5 sm:p-6 mb-5 border border-white/10">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-5 leading-snug">
            {currentQuestion.text}
          </h2>

          <div className="space-y-2.5">
            {currentQuestion.options.map((option, index) => {
              const isSelected = state.answers[currentQuestion.id] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-lg border-2 transition-all flex items-center gap-3 group ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 shadow-md scale-[1.01]'
                      : 'border-white/10 hover:border-blue-400/50 hover:bg-white/5 bg-white/5'
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 flex-shrink-0 group-hover:text-slate-300" />
                  )}
                  <span className="text-white font-medium text-sm sm:text-base">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <button
            onClick={() => dispatch({ type: 'PREV_QUESTION' })}
            disabled={state.currentQuestionIndex === 0}
            className="px-4 py-2 rounded-lg font-semibold border border-white/10 text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            Previous
          </button>

          <div className="flex-1 flex justify-center">
            <div className="flex gap-1.5 flex-wrap justify-center">
              {state.quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => dispatch({ type: 'SET_QUESTION_INDEX', payload: index })}
                  className={`w-9 h-9 rounded-lg font-semibold transition-all text-xs ${
                    index === state.currentQuestionIndex
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-md scale-110'
                      : state.answers[state.quiz.questions[index].id]
                      ? 'bg-blue-400/20 text-white border border-blue-400/50'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {state.currentQuestionIndex === state.quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={loading || answeredCount < state.quiz.questions.length}
              className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
              disabled={state.currentQuestionIndex === state.quiz.questions.length - 1}
              className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm"
            >
              Next
            </button>
          )}
        </div>

        {answeredCount < state.quiz.questions.length && (
          <div className="text-center text-xs text-slate-400 bg-white/5 backdrop-blur-sm py-2 rounded-lg border border-white/10">
            {answeredCount} of {state.quiz.questions.length} answered
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
