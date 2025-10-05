import { useState } from 'react';
import { User, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/api';
import { useQuiz } from '../hooks/useQuiz';

export const UserRegistration = () => {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setLoading(true);

    try {
      const userData = await apiService.createUser(username, email);
      
      
      
      const user = {
        id: userData.id,
        username: userData.username,
        email: userData.email
      };
      
      console.log('Setting user:', user);
      dispatch({ type: 'SET_USER', payload: user });
      navigate('/quiz');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Quiz<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Verse</span>
          </h1>
          <p className="text-slate-300 text-base">Test your knowledge with precision</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Get Started</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                'Loading...'
              ) : (
                <>
                  Start Quiz
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Track your progress and improve your skills
        </p>
      </div>
    </div>
  );
}