/** @format */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Utensils,
  Flame,
  AlertTriangle,
  Info,
  ChevronRight,
  Leaf
} from 'lucide-react';
import menuData from '@/../data/menu.json';

// Types from the JSON structure
interface MenuOption {
  name: string;
  price: number;
  tags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  };
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  options: MenuOption[];
  tags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

const CATEGORY_IMAGES: Record<string, string> = {
  'homemade-dumplings': '/images/dumplings_module.png',
  'side-dish': '/images/side_dish_module.png',
  'kong-fu-rice-bowls': '/images/rice_bowls_module.png',
  'soup': '/images/soup_module.png',
  'noodle-fried-rice': '/images/noodle_module.png',
};

const CATEGORY_ACCENTS: Record<string, string> = {
  'homemade-dumplings': 'amber',
  'side-dish': 'orange',
  'kong-fu-rice-bowls': 'red',
  'soup': 'emerald',
  'noodle-fried-rice': 'blue',
};

export default function MenuShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>(menuData.categories[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active category based on scroll position
      const sections = menuData.categories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveCategory(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white selection:bg-amber-500/30 font-sans'>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
          <Link href='/' className='flex items-center gap-2 group'>
            <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-colors'>
              <ArrowLeft size={18} className='group-hover:-translate-x-1 transition-transform' />
            </div>
            <span className='font-bold text-xl tracking-tight'>KONG FU DUMPLING</span>
          </Link>

          <div className='hidden md:flex items-center gap-8'>
            {menuData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`text-sm font-medium transition-all relative ${activeCategory === category.id ? 'text-amber-500' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {category.name}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId='activeCat'
                    className='absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500'
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/menu_hero.png'
            alt='Menu Hero'
            fill
            className='object-cover opacity-60 scale-105'
            priority
          />
          <div className='absolute inset-0 bg-linear-to-b from-black/20 via-[#0a0a0a]/40 to-[#0a0a0a]'></div>
        </div>

        <div className='relative z-10 text-center px-6 max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-6'>
              <Sparkles size={14} className='text-amber-500' />
              <span className='text-amber-500 text-xs font-bold tracking-[0.2em] uppercase'>Signature Menu</span>
            </div>
            <h1 className='text-6xl md:text-8xl font-black mb-6 bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent'>
              Culinary Journey
            </h1>
            <p className='text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto'>
              Discover the authentic flavors of our kitchen, crafted with tradition and passion.
            </p>
          </motion.div>
        </div>

        <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500'>
          <span className='text-[10px] uppercase tracking-[0.3em] font-bold'>Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className='w-5 h-8 border border-white/20 rounded-full flex justify-center p-1'
          >
            <div className='w-1 h-2 bg-amber-500 rounded-full'></div>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories */}
      <main className='max-w-7xl mx-auto px-6 pb-40'>
        {menuData.categories.map((category, catIndex) => {
          const accentColor = CATEGORY_ACCENTS[category.id] || 'amber';

          return (
            <section
              key={category.id}
              id={category.id}
              className='py-20 md:py-32 scroll-mt-24'
            >
              <div className='grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start'>
                {/* Category Info Sticky */}
                <div className='lg:sticky lg:top-32'>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className='relative aspect-4/5 rounded-4xl overflow-hidden mb-8 group'>
                      <Image
                        src={CATEGORY_IMAGES[category.id] || '/images/menu_hero.png'}
                        alt={category.name}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                      />
                      <div className='absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent'></div>
                      <div className='absolute bottom-8 left-8 right-8'>
                        <h2 className='text-4xl font-bold mb-2'>{category.name}</h2>
                        <div className={`h-1 w-20 bg-${accentColor}-500 rounded-full`}></div>
                      </div>
                    </div>
                    <p className='text-gray-400 text-lg leading-relaxed mb-6 font-light'>
                      {category.description}
                    </p>
                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                      <span className='flex items-center gap-1.5'>
                        <span className={`w-2 h-2 rounded-full bg-${accentColor}-500`}></span>
                        {category.items.length} Items Available
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Items Grid */}
                <div className='grid md:grid-cols-2 gap-6 md:gap-8'>
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (itemIndex % 4) * 0.1 }}
                      className='group relative bg-white/3 backdrop-blur-2xl rounded-3xl p-5 border border-white/5 hover:border-white/10 transition-all duration-500'
                    >
                      <div className='relative h-56 rounded-2xl overflow-hidden mb-6'>
                        <Image
                          src={item.image || CATEGORY_IMAGES[category.id] || '/api/placeholder/400/300'}
                          alt={item.name}
                          fill
                          className='object-contain transition-transform duration-700 group-hover:scale-110'
                        />
                        <div className='absolute top-4 right-4'>
                          <div className='bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-amber-500 font-bold'>
                            ${item.price}
                          </div>
                        </div>
                      </div>

                      <div className='px-2'>
                        <h3 className='text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors'>
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className='text-gray-400/80 text-sm line-clamp-2 mb-4 font-light'>
                            {item.description}
                          </p>
                        )}

                        <div className='flex flex-col'>
                          <div className='flex flex-warp gap-2'>
                            {/* Ingredients */}
                            {item.tags.ingredients.length > 0 && (
                              <div className='mb-4'>
                                <span className='text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2'>Main Ingredients</span>
                                <div className='flex flex-wrap gap-1'>
                                  {item.tags.ingredients.map(ing => (
                                    <span key={ing} className='text-xs text-gray-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/5'>
                                      {ing}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* Badges */}
                            {item.tags.restrictions.length > 0 && (
                              <div className='mb-4'>
                                <span className='text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2'>Main Ingredients</span>
                                <div className='flex flex-wrap gap-1'>
                                  {item.tags.restrictions.map(ing => (
                                    <span key={ing} className='text-xs text-gray-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/5'>
                                      <Leaf size={10} />  {ing}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* Badges */}
                            <div className='flex flex-wrap gap-2'>
                              {item.tags.restrictions.map(tag => (
                                <span key={tag} className='flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-500/80 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10'>
                                  <Leaf size={10} /> {tag}
                                </span>
                              ))}
                              {item.tags.flavors.map(tag => (
                                <span key={tag} className='flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-orange-400/80 bg-orange-400/5 px-2 py-1 rounded-md border border-orange-400/10'>
                                  <Flame size={10} /> {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Options */}
                        {item.options && item.options.length > 0 && (
                          <div className='mb-6 space-y-3 '>
                            <span className='text-[10px] uppercase tracking-widest text-amber-500/80 font-bold block'>Selection Options</span>
                            <div className='space-y-2'>
                              {item.options.map((opt, idx) => (
                                <div key={idx} className='flex flex-col gap-1 border-l-2 border-amber-500/20 pl-3 py-0.5'>
                                  <div className='flex justify-between items-center'>
                                    <span className='text-sm font-semibold text-gray-200'>{opt.name}</span>
                                    {opt.price > 0 && <span className='text-xs text-amber-500'>+${opt.price}</span>}
                                  </div>
                                  <div className='flex flex-wrap gap-1'>
                                    {opt.tags.ingredients.map(ing => (
                                      <span key={ing} className='text-[10px] text-gray-500 italic'>
                                        {ing}{idx < opt.tags.ingredients.length - 1 ? '' : ''}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}


                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {catIndex < menuData.categories.length - 1 && (
                <div className='w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mt-20 md:mt-32'></div>
              )}
            </section>
          )
        })}
      </main>

      {/* Footer / CTA */}
      <footer className='py-40 bg-black relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#0a0a0a] to-transparent'></div>
        <div className='max-w-4xl mx-auto px-6 text-center relative z-10'>
          <h2 className='text-5xl md:text-7xl font-black mb-8 leading-tight'>
            Ready to <span className='text-amber-500'>Order?</span>
          </h2>
          <p className='text-xl text-gray-500 mb-12'>
            Experience these flavors in person or get them delivered to your door.
          </p>
          <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
            <Link href='/' className='px-10 py-5 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]'>
              Back to Home
            </Link>
            <Link href='/editor' className='px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:scale-105 transition-all'>
              Manage Menu
            </Link>
          </div>
        </div>
      </footer>

      {/* Background blobs */}
      <div className='fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none -z-10'></div>
      <div className='fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none -z-10'></div>
    </div>
  );
}
