import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ className = "" }) => (
  <div className={`skeleton rounded-lg ${className}`} />
);

const Loading = ({ type = "default" }) => {
  if (type === "tables") {
    return (
      <div className="animate-scale-in">
        <div className="mb-6">
          <LoadingSkeleton className="h-8 w-48 mb-4" />
          <LoadingSkeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {[...Array(24)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (type === "orders") {
    return (
      <div className="animate-scale-in space-y-4">
        <div className="mb-6">
          <LoadingSkeleton className="h-8 w-48 mb-4" />
          <LoadingSkeleton className="h-4 w-64" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <LoadingSkeleton className="h-6 w-32 mb-2" />
                <LoadingSkeleton className="h-4 w-24" />
              </div>
              <LoadingSkeleton className="h-8 w-20" />
            </div>
            <div className="space-y-2">
              <LoadingSkeleton className="h-4 w-full" />
              <LoadingSkeleton className="h-4 w-3/4" />
              <LoadingSkeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "reservations") {
    return (
      <div className="animate-scale-in space-y-4">
        <div className="mb-6">
          <LoadingSkeleton className="h-8 w-48 mb-4" />
          <LoadingSkeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="card p-6">
              <LoadingSkeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-3/4" />
                <LoadingSkeleton className="h-4 w-1/2" />
              </div>
              <LoadingSkeleton className="h-8 w-20 mt-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-scale-in flex items-center justify-center py-16">
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
        />
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
        />
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.6 }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;