/** @format */

import { MenuItem } from '@/types/menu';
import { TagDisplay } from './TagDisplay';
import { Badge } from '@/components/UI/badge';
import { Button } from '@/components/UI/Button';
import { Edit, RotateCcw, Trash2 } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: () => void;
  onReset: () => void;
  onDelete: () => void;
}

export function MenuItemCard({
  item,
  onEdit,
  onReset,
  onDelete,
}: MenuItemCardProps) {
  // Calculate display price
  const getPriceDisplay = () => {
    const basePrice = item.price || 0;
    
    if (item.options && item.options.length > 0) {
      const optionPrices = item.options
        .map((opt) => opt.price || 0);
      
      // Check if all option prices are the same
      const allSame = optionPrices.every(p => p === optionPrices[0]);
      
      if (allSame) {
        // All options have same additional price
        const finalPrice = basePrice + optionPrices[0];
        return {
          price: finalPrice,
          showFrom: false
        };
      } else {
        // Different prices, show lowest
        const lowestOptionPrice = Math.min(...optionPrices);
        const lowestFinalPrice = basePrice + lowestOptionPrice;
        return {
          price: lowestFinalPrice,
          showFrom: true
        };
      }
    }
    
    return {
      price: basePrice,
      showFrom: false
    };
  };

  const { price: displayPrice, showFrom } = getPriceDisplay();
  const hasOptions = item.options && item.options.length > 0;

  return (
    <div className='flex items-start gap-4'>
      {/* Image */}
      {item.image && (
        <div className='flex-shrink-0'>
          <img
            src={item.image}
            alt={item.name}
            className='w-24 h-24 object-contain rounded-lg'
          />
        </div>
      )}

      <div className='flex-1'>
        <div className='flex items-center gap-3 mb-2'>
          <h3 className='text-lg font-semibold text-ink-primary'>{item.name}</h3>
          {item.isModified && (
            <Badge variant='warning'>Modified</Badge>
          )}
        </div>

        {/* Tags */}
        {item.tags && <TagDisplay tags={item.tags} />}

        {item.description && (
          <p className='text-sm text-ink-secondary mb-2'>{item.description}</p>
        )}

        {/* Options Display */}
        {hasOptions && (
          <div className='mt-2 space-y-1'>
            {item.options!.map((option, idx) => {
              const basePrice = item.price || 0;
              const optionPrice = option.price || 0;
              return (
                <div key={idx} className='flex items-center gap-2 text-sm'>
                  <Badge variant='neutral'>{option.name}</Badge>
                  {optionPrice > 0 && (
                    <span className='text-ink-secondary'>
                      +${optionPrice.toFixed(2)}
                    </span>
                  )}
                  {option.tags && option.tags.ingredients.length > 0 && (
                    <span className='text-xs text-ink-secondary'>
                      ({option.tags.ingredients.join(', ')})
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {item.modifiedFields && item.modifiedFields.length > 0 && (
          <p className='text-xs text-ink-secondary mt-2'>
            Modified fields: {item.modifiedFields.join(', ')}
          </p>
        )}
      </div>

      <div className='flex items-center gap-4'>
        <span className='text-2xl font-bold text-ink-primary'>
          {showFrom ? `from $${displayPrice.toFixed(2)}` : `$${displayPrice.toFixed(2)}`}
        </span>
        <div className='flex gap-2'>
          <Button
            onClick={onEdit}
            variant='secondary'
            size='sm'
            Icon={Edit}
          >
            Edit
          </Button>
          {item.isModified && (
            <Button
              onClick={onReset}
              variant='outline'
              size='sm'
              Icon={RotateCcw}
            >
              Reset
            </Button>
          )}
          <Button
            onClick={onDelete}
            variant='destructive'
            size='sm'
            Icon={Trash2}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
