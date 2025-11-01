'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types/cart';
import { useCart } from '@/lib/hooks/useCart';
import { useItems } from '@/lib/hooks/useItems';
import { formatPrice } from '@/lib/utils/formatters';
import { Minus, Plus, Trash2, Package, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import toast from 'react-hot-toast';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, isUpdatingQuantity, isRemovingItem } = useCart();
  const { data: items = [] } = useItems();

  // Find the actual item to get current stock
  const actualItem = items.find(i => i.id === item.itemId);
  const maxStock = actualItem?.stock || item.quantity;

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 0) return;

    // Validate against stock
    if (newQuantity > maxStock) {
      toast.error(`Cannot add more. Only ${maxStock} available in stock.`);
      return;
    }

    await updateQuantity({ itemId: item.itemId, quantity: newQuantity });
  };

  const handleRemove = async () => {
    await removeItem(item.itemId);
  };

  const isProduct = item.type === 'PRODUCT';
  const isLoading = isUpdatingQuantity || isRemovingItem;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
      {/* Image - Larger and more prominent */}
      <div className="shrink-0 w-full sm:w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.name}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
            {isProduct ? (
              <Package className="h-12 w-12 text-primary-300" strokeWidth={1.5} />
            ) : (
              <Calendar className="h-12 w-12 text-accent-300" strokeWidth={1.5} />
            )}
          </div>
        )}
      </div>

      {/* Details - Better spacing */}
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {item.name}
          </h3>
          <Badge variant={isProduct ? 'primary' : 'accent'} size="sm">
            {isProduct ? 'Product' : 'Event'}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {formatPrice(item.unitPrice)} <span className="text-gray-400">× {item.quantity}</span>
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-gray-500 font-medium">Subtotal:</span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {formatPrice(item.subtotal)}
          </span>
        </div>
      </div>

      {/* Quantity Controls - Colorful buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            disabled={isLoading || item.quantity <= 1}
            className="h-10 w-10 p-0 hover:bg-primary-100 hover:text-primary-700"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" strokeWidth={2.5} />
          </Button>

          <div className="flex flex-col items-center">
            <span className="text-base font-bold w-10 text-center text-gray-900">
              {item.quantity}
            </span>
            {maxStock < 999 && (
              <span className="text-[10px] text-gray-500 whitespace-nowrap">
                of {maxStock}
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            disabled={isLoading || item.quantity >= maxStock}
            className="h-10 w-10 p-0 hover:bg-accent-100 hover:text-accent-700"
            aria-label="Increase quantity"
            title={item.quantity >= maxStock ? 'Maximum stock reached' : undefined}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </Button>
        </div>

        {/* Remove Button - More prominent */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          disabled={isLoading}
          className="h-10 w-10 p-0 text-error-600 hover:bg-error-100 hover:text-error-700"
          aria-label="Remove item"
        >
          <Trash2 className="h-5 w-5" strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
}
