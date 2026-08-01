/** @format */

import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import { TagSelector } from './TagSelector';
import Image from 'next/image';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  newItemForm: Omit<MenuItem, 'id'> & { category?: string };
  onFormChange: (updates: Partial<Omit<MenuItem, 'id'> & { category?: string }>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage: boolean;
  categories: string[];
  onSubmit: () => void;
}

export function AddItemModal({
  isOpen,
  onClose,
  newItemForm,
  onFormChange,
  onImageChange,
  uploadingImage,
  categories,
  onSubmit,
}: AddItemModalProps) {
  if (!isOpen) return null;

  const handleTagToggle = (
    type: 'ingredients' | 'flavors' | 'restrictions',
    tag: string,
  ) => {
    const currentTags = newItemForm.tags || {
      ingredients: [],
      flavors: [],
      restrictions: [],
    };
    const currentTypeTags = currentTags[type] || [];
    const newTypeTags = currentTypeTags.includes(tag) ?
      currentTypeTags.filter((t) => t !== tag)
    : [...currentTypeTags, tag];

    onFormChange({
      tags: {
        ...currentTags,
        [type]: newTypeTags,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-2xl font-bold text-amber-900 mb-6'>Add New Dish</h2>
        <div className='space-y-4 max-h-[70vh] overflow-y-auto'>
          <div>
            <label className='block text-sm font-medium text-amber-900 mb-1'>
              Category *
            </label>
            <select
              value={newItemForm.category}
              onChange={(e) => onFormChange({ category: e.target.value })}
              className='w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
            >
              <option value=''>Select Category</option>
              {categories
                .filter((cat) => cat !== 'all')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-amber-900 mb-1'>
              Dish Name *
            </label>
            <input
              type='text'
              value={newItemForm.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
              className='w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
              placeholder='Enter dish name'
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className='block text-sm font-medium text-amber-900 mb-1'>
              Dish Image
            </label>
            <div className='flex items-center gap-4'>
              <input
                type='file'
                accept='image/*'
                onChange={onImageChange}
                disabled={
                  uploadingImage || !newItemForm.category || !newItemForm.name
                }
                className='flex-1 px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm'
              />
              {uploadingImage && (
                <span className='text-sm text-amber-600'>Uploading...</span>
              )}
            </div>
            {newItemForm.image && (
              <div className='mt-2 relative w-32 h-32'>
                <Image
                  src={newItemForm.image}
                  alt='Preview'
                  fill
                  sizes='128px'
                  className='object-cover rounded-lg border border-amber-200'
                />
              </div>
            )}
            {(!newItemForm.category || !newItemForm.name) && (
              <p className='text-xs text-amber-600 mt-1'>
                Please fill in category and dish name first
              </p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-amber-900 mb-1'>
                Price ($) *
              </label>
              <input
                type='number'
                step='0.5'
                value={newItemForm.price}
                onChange={(e) =>
                  onFormChange({ price: parseFloat(e.target.value) || 0 })
                }
                className='w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-amber-900 mb-1'>
                Description (Optional)
              </label>
              <input
                type='text'
                value={newItemForm.description}
                onChange={(e) => onFormChange({ description: e.target.value })}
                className='w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                placeholder='Short description'
              />
            </div>
          </div>

          {/* Tag Selection */}
          <TagSelector
            selectedTags={
              newItemForm.tags || {
                ingredients: [],
                flavors: [],
                restrictions: [],
              }
            }
            onToggle={handleTagToggle}
          />

          <div className='flex gap-3 pt-4'>
            <button
              onClick={onSubmit}
              className='flex-1 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-medium'
            >
              ✓ Add Dish
            </button>
            <button
              onClick={onClose}
              className='flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium'
            >
              ✕ Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
