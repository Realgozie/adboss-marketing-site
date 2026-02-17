// src/components/dashboard/ErrorBoundary.jsx
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { motion } from "framer-motion";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 max-w-md"
      >
        <div className="text-red-500 mb-6 flex justify-center text-5xl">⚠️</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h2>
        <p className="text-slate-500 mb-8 overflow-auto max-h-32 text-sm font-mono bg-slate-50 p-4 rounded-xl">
          {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          Try again
        </button>
      </motion.div>
    </div>
  );
}

export default function GlobalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
