import React from 'react';

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl">
      <div className="w-16 h-16 border-4 border-t-4 border-t-emerald-500 border-gray-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-emerald-800">{message}</p>
    </div>
  );
};

export default LoadingSpinner;