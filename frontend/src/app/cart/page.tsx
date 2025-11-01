'use client';

import { useState } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, isLoading, clearCart, isClearingCart } = useCart();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClearCart = async () => {
    await clearCart();
  };

  // Loading state - Colorful skeleton
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="flex items-center justify-between">
              <div className="h-12 bg-gradient-to-r from-primary-200 to-accent-200 rounded-2xl w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded-xl w-32"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-40 bg-white rounded-2xl shadow-md"></div>
                <div className="h-40 bg-white rounded-2xl shadow-md"></div>
                <div className="h-40 bg-white rounded-2xl shadow-md"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-white rounded-2xl shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Colorful */}
        <div className="mb-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-base text-primary-600 hover:text-primary-700 mb-6 font-semibold transition-colors group"
          >
            <ChevronLeft className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
            <span>Continue Shopping</span>
          </Link>

          {/* Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/30">
                  <ShoppingBag className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
              </div>
              <p className="text-lg text-gray-600 font-medium ml-[68px]">
                {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            {/* Clear Cart Button */}
            {cart.items.length > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowConfirmDialog(true)}
                disabled={isClearingCart}
                className="text-error-600 border-error-300 hover:bg-error-50 hover:border-error-400"
              >
                <Trash2 className="h-5 w-5 mr-2" strokeWidth={2.5} />
                <span>Clear Cart</span>
              </Button>
            )}
          </div>
        </div>

        {/* Cart Content - Optimized grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - White cards */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItem key={item.itemId} item={item} />
            ))}
          </div>

          {/* Cart Summary - Sticky colorful card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <CartSummary cart={cart} />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleClearCart}
        title="Clear Cart?"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear Cart"
        cancelText="Keep Items"
        variant="danger"
        isLoading={isClearingCart}
      />
    </div>
  );
}
