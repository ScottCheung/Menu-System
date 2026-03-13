'use client';

import { useEffect, useState } from 'react';
import { useMenuStore } from '@/lib/store/menu-store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ScreenPage() {
  const { categories: menuCategories, isLoaded, loadFromJSON, getAllItems } = useMenuStore();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    loadFromJSON();
  }, [loadFromJSON]);

  const items = getAllItems();

  const categoryNames = menuCategories.map(cat => cat.name);
  const currentCategory = categoryNames[currentCategoryIndex];
  const currentItems = items.filter(item => (item as any).category === currentCategory);

  // Auto-rotate categories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % categoryNames.length);
    }, 8000); // 8 seconds per category

    return () => clearInterval(interval);
  }, [categoryNames.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-amber-900 to-orange-900">
        <div className="text-4xl font-bold text-white">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-amber-900 to-orange-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      {/* Control Bar (hidden in fullscreen) */}
      {!isFullscreen && (
        <div className="absolute top-4 right-4 z-50 flex gap-3">
          <Link
            href="/editor"
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all"
          >
            ✏️ 编辑模式
          </Link>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all"
          >
            ⛶ 全屏
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Restaurant Name */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-black text-white mb-4 drop-shadow-2xl" style={{ fontFamily: 'Georgia, serif' }}>
            Kong Fu Kitchen
          </h1>
          <div className="h-1 w-64 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Category Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl"
          >
            {/* Category Title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-5xl font-bold text-yellow-300 mb-2 drop-shadow-lg">
                {currentCategory}
              </h2>
              <div className="flex justify-center gap-2 mt-4">
                {categoryNames.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentCategoryIndex
                        ? 'w-12 bg-yellow-400'
                        : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentItems.map((item, index) => {
                // Calculate display price
                const basePrice = item.price || 0;
                let displayPrice = basePrice;
                let showFrom = false;
                
                if (item.options && item.options.length > 0) {
                  const optionPrices = item.options.map((opt) => opt.price || 0);
                  const allSame = optionPrices.every(p => p === optionPrices[0]);
                  
                  if (allSame) {
                    displayPrice = basePrice + optionPrices[0];
                  } else {
                    const lowestOptionPrice = Math.min(...optionPrices);
                    displayPrice = basePrice + lowestOptionPrice;
                    showFrom = true;
                  }
                }
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {item.name}
                        </h3>
                        {item.description && (
                          <span className="inline-block px-3 py-1 bg-blue-500/80 text-white text-sm font-medium rounded-full">
                            {item.description}
                          </span>
                        )}
                        {item.options && item.options.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {item.options.map((option, idx) => (
                              <div key={idx} className="text-sm text-white/80">
                                • {option.name}
                                {option.price && option.price > 0 && (
                                  <span className="text-yellow-300 ml-1">
                                    +${option.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-4xl font-black text-yellow-300 drop-shadow-lg">
                          {showFrom && <span className="text-xl">from </span>}
                          ${displayPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-center text-white/60 text-sm"
        >
          <p>GFO = Gluten Free Option Available</p>
        </motion.div>
      </div>
    </div>
  );
}
