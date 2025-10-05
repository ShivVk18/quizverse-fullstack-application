export const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-400 mx-auto mb-3"></div>
        <p className="text-slate-300 text-sm">{message}</p>
      </div>
    </div>
  );
};
