'use client';

import { Item, ItemType } from '@/lib/types/item';
import { formatPrice, formatShortDate } from '@/lib/utils/formatters';
import { Calendar, MapPin, Package, User, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useCart } from '@/lib/hooks/useCart';
import toast from 'react-hot-toast';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const { addItem, isAddingItem, cart } = useCart();

  const handleAddToCart = async () => {
    // Check if item is already in cart
    const cartItem = cart?.items.find(ci => ci.itemId === item.id);
    const currentQuantityInCart = cartItem?.quantity || 0;

    // Check if adding one more would exceed stock
    if (currentQuantityInCart >= item.stock) {
      toast.error(`Cannot add more. Only ${item.stock} available in stock.`);
      return;
    }

    await addItem({ itemId: item.id, quantity: 1 });
  };

  const isProduct = item.type === ItemType.PRODUCT;
  const hasStock = item.stock > 0;
  const isLowStock = hasStock && item.stock <= 10;

  // Check if item is already at max quantity in cart
  const cartItem = cart?.items.find(ci => ci.itemId === item.id);
  const isAtMaxQuantity = cartItem && cartItem.quantity >= item.stock;

  return (
    <Card
      hover
      className="h-full flex flex-col group"
      colorAccent={isProduct ? 'primary' : 'accent'}
    >
      {/* Image Container with gradient overlay */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {item.thumbnail ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
            {isProduct ? (
              <Package className="h-24 w-24 text-primary-300" strokeWidth={1.5} />
            ) : (
              <Calendar className="h-24 w-24 text-accent-300" strokeWidth={1.5} />
            )}
          </div>
        )}

        {/* Badges Container */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          {/* Stock/Status Badge */}
          {!hasStock ? (
            <Badge variant="error" size="md">
              Out of Stock
            </Badge>
          ) : isLowStock ? (
            <Badge variant="warning" size="md">
              Only {item.stock} left!
            </Badge>
          ) : (
            <div />
          )}

          {/* Type Badge with icon */}
          <Badge
            variant={isProduct ? 'primary' : 'accent'}
            size="sm"
          >
            {isProduct ? (
              <><Package className="h-3 w-3 mr-1" /> Product</>
            ) : (
              <><Calendar className="h-3 w-3 mr-1" /> Event</>
            )}
          </Badge>
        </div>
      </div>

      {/* Content - Spacious white area */}
      <div className="p-6 flex flex-col flex-1 bg-white">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {item.name}
        </h3>

        {/* Metadata with colorful icons */}
        <div className="space-y-2 mb-4">
          {isProduct ? (
            <>
              {item.brand && (
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center mr-2">
                    <Package className="h-3.5 w-3.5 text-primary-600" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium">{item.brand}</span>
                </div>
              )}
              {item.category && (
                <div className="flex items-center text-sm">
                  <Badge variant="default" size="sm">
                    {item.category}
                  </Badge>
                </div>
              )}
            </>
          ) : (
            <>
              {item.eventDate && (
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-lg bg-accent-100 flex items-center justify-center mr-2">
                    <Calendar className="h-3.5 w-3.5 text-accent-600" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium">{formatShortDate(item.eventDate)}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-lg bg-accent-100 flex items-center justify-center mr-2">
                    <MapPin className="h-3.5 w-3.5 text-accent-600" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium truncate">{item.location}</span>
                </div>
              )}
              {item.artist && (
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-lg bg-accent-100 flex items-center justify-center mr-2">
                    <User className="h-3.5 w-3.5 text-accent-600" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium truncate">{item.artist}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Footer - Sticky at bottom */}
        <div className="mt-auto pt-4">
          {/* Price Row with gradient */}
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {formatPrice(item.price)}
              </span>
            </div>
            {hasStock && item.stock > 10 && (
              <div className="flex items-center text-xs text-success-600 font-semibold bg-success-50 px-2 py-1 rounded-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                In Stock
              </div>
            )}
          </div>

          {/* CTA Button - Colorful */}
          <Button
            onClick={handleAddToCart}
            disabled={!hasStock || isAddingItem || isAtMaxQuantity}
            isLoading={isAddingItem}
            fullWidth
            size="lg"
            variant={hasStock && !isAtMaxQuantity ? (isProduct ? 'primary' : 'accent') : 'secondary'}
            title={isAtMaxQuantity ? 'Maximum quantity in cart' : undefined}
          >
            {!hasStock ? (
              <span>Out of Stock</span>
            ) : isAtMaxQuantity ? (
              <span>Max Quantity in Cart</span>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2" strokeWidth={2.5} />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
