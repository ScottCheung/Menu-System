'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Kong Fu Kitchen
          </h1>
          <p className="text-2xl text-amber-700">菜单管理系统</p>
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Editor Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/editor">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200 hover:shadow-3xl hover:scale-105 transition-all cursor-pointer group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  ✏️
                </div>
                <h2 className="text-3xl font-bold text-amber-900 mb-3">
                  编辑模式
                </h2>
                <p className="text-amber-700 text-lg">
                  修改菜单文字和价格，保存修改，恢复默认模板
                </p>
                <div className="mt-6 flex items-center text-amber-600 font-semibold">
                  进入编辑器
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Screen Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/screen">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200 hover:shadow-3xl hover:scale-105 transition-all cursor-pointer group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  📺
                </div>
                <h2 className="text-3xl font-bold text-amber-900 mb-3">
                  展示屏
                </h2>
                <p className="text-amber-700 text-lg">
                  全屏轮播菜单，适合电视展示，自动切换分类
                </p>
                <div className="mt-6 flex items-center text-amber-600 font-semibold">
                  查看展示屏
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200"
        >
          <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
            功能特点
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💾</div>
              <h4 className="font-semibold text-amber-900 mb-1">本地存储</h4>
              <p className="text-sm text-amber-700">修改自动保存到浏览器</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-semibold text-amber-900 mb-1">一键恢复</h4>
              <p className="text-sm text-amber-700">快速恢复默认模板</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✨</div>
              <h4 className="font-semibold text-amber-900 mb-1">修改追踪</h4>
              <p className="text-sm text-amber-700">清楚显示哪些字段被修改</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
