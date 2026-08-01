/** @format */

import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';

interface SaveConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modifiedItems: MenuItem[];
  addedItems: MenuItem[];
  deletedItems: MenuItem[];
  getOriginalItem: (id: string) => MenuItem | undefined;
}

export function SaveConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  modifiedItems,
  addedItems,
  deletedItems,
  getOriginalItem,
}: SaveConfirmModalProps) {
  if (!isOpen) return null;

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
        className='bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4'>
          <h2 className='text-2xl font-bold text-white'>Confirm Save Changes</h2>
        </div>
        <div className='p-6 overflow-y-auto max-h-[60vh]'>
          <div className='space-y-6'>
            {/* Modified Items */}
            {modifiedItems.length > 0 && (
              <div>
                <h3 className='text-lg font-bold text-amber-900 mb-3'>
                  📝 Modified Items ({modifiedItems.length})
                </h3>
                <div className='space-y-3'>
                  {modifiedItems.map((item) => {
                    const originalItem = getOriginalItem(item.id);
                    return (
                      <div
                        key={item.id}
                        className='bg-amber-50 rounded-lg p-4 border border-amber-200'
                      >
                        <h4 className='font-bold text-amber-900 mb-2'>
                          {item.name}
                        </h4>
                        {item.modifiedFields?.map((field) => {
                          const fieldKey = field as keyof MenuItem;
                          const oldValue = originalItem?.[fieldKey];
                          const newValue = item[fieldKey];
                          return (
                            <div key={field} className='text-sm mb-2'>
                              <span className='font-medium text-amber-800'>
                                {field}:
                              </span>
                              <div className='ml-4 mt-1 space-y-1'>
                                <div className='text-red-600'>
                                  <span className='font-medium'>Original:</span>{' '}
                                  {oldValue !== undefined ?
                                    typeof oldValue === 'object' ?
                                      JSON.stringify(oldValue)
                                    : String(oldValue)
                                  : '(None)'}
                                </div>
                                <div className='text-green-600'>
                                  <span className='font-medium'>New:</span>{' '}
                                  {newValue !== undefined ?
                                    typeof newValue === 'object' ?
                                      JSON.stringify(newValue)
                                    : String(newValue)
                                  : '(None)'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Added Items */}
            {addedItems.length > 0 && (
              <div>
                <h3 className='text-lg font-bold text-green-900 mb-3'>
                  ➕ Added Items ({addedItems.length})
                </h3>
                <div className='space-y-3'>
                  {addedItems.map((item) => (
                    <div
                      key={item.id}
                      className='bg-green-50 rounded-lg p-4 border border-green-200'
                    >
                      <h4 className='font-bold text-green-900'>{item.name}</h4>
                      <p className='text-sm text-green-700 mt-1'>
                        Price: ${item.price?.toFixed(2)}
                        {item.description && ` | ${item.description}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deleted Items */}
            {deletedItems.length > 0 && (
              <div>
                <h3 className='text-lg font-bold text-red-900 mb-3'>
                  🗑️ Deleted Items ({deletedItems.length})
                </h3>
                <div className='space-y-3'>
                  {deletedItems.map((item) => (
                    <div
                      key={item.id}
                      className='bg-red-50 rounded-lg p-4 border border-red-200'
                    >
                      <h4 className='font-bold text-red-900'>{item.name}</h4>
                      <p className='text-sm text-red-700 mt-1'>
                        Price: ${item.price?.toFixed(2)}
                        {item.description && ` | ${item.description}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='bg-gray-50 px-6 py-4 flex gap-3'>
          <button
            onClick={onConfirm}
            className='flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-medium'
          >
            ✓ Confirm Save
          </button>
          <button
            onClick={onClose}
            className='flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium'
          >
            ✕ Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
