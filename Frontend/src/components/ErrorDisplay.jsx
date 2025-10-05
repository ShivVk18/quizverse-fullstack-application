export const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-xl shadow-xl p-6 max-w-md w-full border border-red-500/20">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error</h2>
          <p className="text-slate-300 text-sm mb-4">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all text-sm"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
