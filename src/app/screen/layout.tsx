/** @format */

'use client';

import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

  // 获取当前页码
  const getCurrentPage = () => {
    const match = pathname.match(/\/screen\/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };

  const currentPage = getCurrentPage();
  const totalPages = 3; // 总共有3个页面

  // 处理鼠标移动
  const handleMouseMove = useCallback(() => {
    setShowNav(true);

    // 清除之前的定时器
    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    // 设置新的定时器，3秒后隐藏
    const timer = setTimeout(() => {
      setShowNav(false);
    }, 3000);

    setHideTimer(timer);
  }, [hideTimer]);

  // 页面切换
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/screen/${page}`);
    }
  };

  useEffect(() => {
    // 监听鼠标移动
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, [handleMouseMove, hideTimer]);

  return (
    <div className='relative'>
      {children}

      {/* 导航控件 */}
      <div
        className={`fixed top-1/2 right-8 -translate-y-1/2 z-50 transition-all duration-500 ${
          showNav ?
            'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        <div
          className='relative rounded-2xl p-4 backdrop-blur-xl'
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 149, 0, 0.1) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* 页面指示器 */}
          <div className='flex flex-col gap-3'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`group relative w-12 h-12 rounded-xl transition-all duration-300 ${
                  currentPage === page ? 'scale-110' : 'hover:scale-105'
                }`}
                style={{
                  background:
                    currentPage === page ?
                      'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border:
                    currentPage === page ? 'none' : (
                      '1px solid rgba(255, 215, 0, 0.2)'
                    ),
                  boxShadow:
                    currentPage === page ?
                      '0 4px 20px rgba(255, 215, 0, 0.5)'
                    : 'none',
                }}
              >
                <span
                  className={`text-lg font-black ${
                    currentPage === page ? 'text-black' : (
                      'text-white/70 group-hover:text-white'
                    )
                  }`}
                >
                  {page}
                </span>

                {/* Hover tooltip */}
                <div
                  className='absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'
                  style={{
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                  }}
                >
                  <span className='text-sm text-white font-medium'>
                    第 {page} 页
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 导航箭头 */}
          <div className='mt-4 pt-4 border-t border-white/10 flex flex-col gap-2'>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='w-12 h-10 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100'
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
              }}
            >
              <span className='text-white text-lg'>↑</span>
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='w-12 h-10 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100'
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
              }}
            >
              <span className='text-white text-lg'>↓</span>
            </button>
            <Link
              href={'/'}
              className='w-12 h-10 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100'
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
              }}
            >
              <HomeIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* 首页快速入口提示 - 仅在首次访问时显示 */}
      {pathname === '/screen' && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm'>
          <div
            className='rounded-3xl p-12 max-w-2xl'
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 149, 0, 0.05) 100%)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h2
              className='text-5xl font-black mb-8 text-center'
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                background: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              选择页面
            </h2>
            <div className='grid grid-cols-3 gap-6'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className='group relative aspect-square rounded-2xl transition-all duration-300 hover:scale-105'
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 149, 0, 0.1) 100%)',
                      border: '2px solid rgba(255, 215, 0, 0.3)',
                    }}
                  >
                    <div
                      className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      style={{
                        background:
                          'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                      }}
                    />
                    <div className='relative h-full flex flex-col items-center justify-center'>
                      <span className='text-6xl font-black text-white group-hover:text-black transition-colors duration-300'>
                        {page}
                      </span>
                      <span className='text-sm text-white/60 group-hover:text-black/60 transition-colors duration-300 mt-2'>
                        第 {page} 页
                      </span>
                    </div>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
