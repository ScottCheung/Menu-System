/** @format */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit3,
  Monitor,
  Database,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChefHat,
  Eye,
  X,
  Maximize2,
} from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    title: 'Ultra-HD Digital Menu Board',
    subtitle: 'High-Contrast Visual Presentation',
    description:
      'Vibrant typography and crisp layouts engineered for high-impact restaurant signage.',
    src: '/images/example/1.jpg',
    tag: 'Classic Layout',
    color: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'group-hover:border-amber-500/50',
    badgeColor: ' text-amber-400 border-amber-500/30',
  },
  {
    id: 2,
    title: 'Multi-Screen Adaptive System',
    subtitle: 'Synchronized Multi-Display Wall',
    description:
      'Seamlessly scale across multi-screen setups and display walls with full resolution clarity.',
    src: '/images/example/2.jpg',
    tag: 'Multi-Screen',
    color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderColor: 'group-hover:border-emerald-500/50',
    badgeColor: ' text-emerald-400 border-emerald-500/30',
  },
  {
    id: 3,
    title: 'Featured Specials & Promotions',
    subtitle: 'Real-Time Promotional Broadcast',
    description:
      'Highlight signature specials & seasonal dishes, instantly customizable across all terminals.',
    src: '/images/example/3.jpg',
    tag: 'Chef Specials',
    color: 'from-orange-500/20 via-red-500/10 to-transparent',
    borderColor: 'group-hover:border-orange-500/50',
    badgeColor: ' text-orange-400 border-orange-500/30',
  },
];

export default function Home() {
  const [activeImage, setActiveImage] = useState<
    (typeof showcaseItems)[0] | null
  >(null);

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white selection:bg-amber-500/30 overflow-hidden relative'>
      {/* Decorative Background Elements */}
      <div className='absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none'></div>
      <div className='absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none'></div>
      <div className='absolute top-[40%] right-[-5%] w-[30%] h-[30%] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none'></div>

      <div className='max-w-7xl w-full mx-auto px-6 py-20 relative z-10'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-center mb-20'
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='inline-block mb-4 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md'
          >
            <span className='text-amber-500 text-sm font-medium tracking-widest uppercase flex items-center gap-2'>
              <Sparkles size={14} /> Premium Menu System
            </span>
          </motion.div>
          <h1
            className='text-7xl md:text-8xl font-black mb-6 bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent'
            style={{
              fontFamily: 'var(--font-display, Inter), sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Kung Fu Kitchen
          </h1>
          <p className='text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed'>
            Elevate your culinary presentation with our intelligent menu
            management and display solution.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className='grid md:grid-cols-3 gap-6 mb-24'>
          {/* Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href='/menu'>
              <div className='group relative h-full bg-white/5 backdrop-blur-xl rounded-4xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500'>
                    <ChefHat className='text-emerald-500 w-7 h-7' />
                  </div>
                  <h2 className='text-2xl font-bold mb-4 group-hover:text-emerald-500 transition-colors'>
                    Menu Showcase
                  </h2>
                  <p className='text-gray-400 text-base leading-relaxed mb-8'>
                    Browse our gourmet collection with high-fidelity visuals and
                    detailed culinary information.
                  </p>
                  <div className='flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all mt-auto'>
                    View Menu{' '}
                    <ArrowRight size={18} className='text-emerald-500' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Editor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href='/editor'>
              <div className='group relative h-full bg-white/5 backdrop-blur-xl rounded-4xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-500 overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500'>
                    <Edit3 className='text-amber-500 w-7 h-7' />
                  </div>
                  <h2 className='text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors'>
                    Menu Editor
                  </h2>
                  <p className='text-gray-400 text-base leading-relaxed mb-8'>
                    Modify descriptions, adjust pricing, and customize your
                    visual themes with our real-time editor.
                  </p>
                  <div className='flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all mt-auto'>
                    Open Editor{' '}
                    <ArrowRight size={18} className='text-amber-500' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Screen Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href='/screen/1' onClick={enterFullscreen}>
              <div className='group relative h-full bg-white/5 backdrop-blur-xl rounded-4xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-500 overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-500'>
                    <Monitor className='text-orange-500 w-7 h-7' />
                  </div>
                  <h2 className='text-2xl font-bold mb-4 group-hover:text-orange-500 transition-colors'>
                    Display Screen
                  </h2>
                  <p className='text-gray-400 text-base leading-relaxed mb-8'>
                    Display multi-screen menu boards with adaptive layouts that
                    scale across any 16:9 resolution.
                  </p>
                  <div className='flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all mt-auto'>
                    Launch Display{' '}
                    <ArrowRight size={18} className='text-orange-500' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Live Example Showcase Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mb-24'
        >
          <div className='flex flex-col  justify-between mb-10'>
            <div>
              <div className='inline-flex col items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3'>
                <Eye size={12} /> Live Display Showcase
              </div>
              <h2 className='text-3xl md:text-4xl font-extrabold tracking-tight text-white'>
                Real-World Display Examples
              </h2>
            </div>
            <p className='text-gray-400 text-sm md:text-base max-w-md mt-3 md:mt-0 font-light'>
              Combining modern culinary presentation with intelligent digital
              signage. Click any preview to inspect high-resolution details.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`card-container-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 28,
                  opacity: { duration: 0.5, delay: 0.7 + index * 0.1 },
                  y: { duration: 0.5, delay: 0.7 + index * 0.1 },
                }}
                onClick={() => setActiveImage(item)}
                className={`group relative bg-white/20 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 ${item.borderColor} cursor-pointer hover:border-white/30`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Image Container */}
                <div className='relative aspect-4/3 overflow-hidden bg-black/40'>
                  <motion.img
                    layoutId={`card-image-${item.id}`}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    src={item.src}
                    alt={item.title}
                    className='w-full h-full object-cover object-center'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300' />

                  {/* Badge */}
                  <div className='absolute top-6 left-6 z-10'>
                    <motion.span
                      layoutId={`card-badge-${item.id}`}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 28,
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border bg-black/50 backdrop-blur-xl ${item.badgeColor}`}
                    >
                      {item.tag}
                    </motion.span>
                  </div>

                  {/* Action Icon */}
                  <div className='absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110'>
                    <Maximize2 size={15} />
                  </div>
                </div>

                {/* Content Details */}
                <div className='p-6 relative z-10'>
                  <motion.h3
                    layoutId={`card-title-${item.id}`}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    className='text-xl font-bold h-20 text-white group-hover:text-amber-400 transition-colors duration-300 mb-1'
                  >
                    {item.title}
                  </motion.h3>
                  <div className='text-[12px] font-mono font-bold text-white/50 mb-3 uppercase tracking-wider'>
                    {item.subtitle}
                  </div>
                  <p className='text-white/70 text-sm leading-relaxed line-clamp-2'>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveImage(null)}
              className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-xl'
            >
              <motion.div
                layoutId={`card-container-${activeImage.id}`}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className='relative max-w-5xl w-full bg-[#141416] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]'
              >
                {/* Modal Header */}
                <div className='flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5'>
                  <div className='flex items-center gap-3'>
                    <motion.span
                      layoutId={`card-badge-${activeImage.id}`}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 28,
                      }}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-black/50 backdrop-blur-xl ${activeImage.badgeColor}`}
                    >
                      {activeImage.tag}
                    </motion.span>
                    <motion.h3
                      layoutId={`card-title-${activeImage.id}`}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 28,
                      }}
                      className='font-bold text-lg text-white'
                    >
                      {activeImage.title}
                    </motion.h3>
                  </div>
                  <button
                    onClick={() => setActiveImage(null)}
                    className='w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200'
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Body / Image */}
                <div className='relative flex-1 overflow-auto bg-black/80 flex items-center justify-center p-4 min-h-[300px]'>
                  <motion.img
                    layoutId={`card-image-${activeImage.id}`}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    src={activeImage.src}
                    alt={activeImage.title}
                    className='max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl'
                  />
                </div>

                {/* Modal Footer */}
                <div className='p-6 bg-[#141416] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                  <div>
                    <div
                      className={` text-xs font-semibold   backdrop-blur-xl ${activeImage.badgeColor}`}
                    >
                      {activeImage.subtitle}
                    </div>
                    <p className='text-sm text-white/70'>
                      {activeImage.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveImage(null)}
                    className='px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors duration-200 self-start md:self-auto shrink-0'
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className='grid md:grid-cols-3 gap-8 py-10 border-t border-white/10'
        >
          <div className='flex flex-col items-center text-center px-4'>
            <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10'>
              <Database className='text-amber-500/70 w-5 h-5' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Double Backup</h4>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Changes are automatically synced to your browser's local storage.
              Quick update without Internet connection. Optimistic UI. When
              Connect Wifi, it will auto upload to server.
            </p>
          </div>
          <div className='flex flex-col items-center text-center px-4'>
            <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10'>
              <RotateCcw className='text-amber-500/70 w-5 h-5' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Instant Reset</h4>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Quickly revert to default templates with a single click at any
              time.
            </p>
          </div>
          <div className='flex flex-col items-center text-center px-4'>
            <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10'>
              <Sparkles className='text-amber-500/70 w-5 h-5' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Change Tracking</h4>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Visual indicators highlight exactly which fields have been
              modified.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
