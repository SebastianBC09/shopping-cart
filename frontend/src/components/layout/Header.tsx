'use client';

import Link from 'next/link';
import { ShoppingCart, Store, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';

export function Header() {
  const { cart } = useCart();
  const pathname = usePathname();
  const itemCount = cart?.totalQuantity || 0;

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Colorful branding */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            aria-label="Shop Home"
          >
            <div className="relative">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all">
                <Store className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-4 w-4 text-warning-500 animate-pulse" fill="currentColor" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                Shop
              </span>
              <span className="text-xs font-medium text-primary-600">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Navigation - Modern desktop tabs */}
          <nav className="flex items-center space-x-2" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className={cn(
                // Base styles
                'relative flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all',

                // Active/Inactive states
                isActive('/')
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              <Store className="h-5 w-5" strokeWidth={2.5} />
              <span>Products</span>
              {isActive('/') && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1/2 h-1 bg-primary-400 rounded-full" />
              )}
            </Link>

            <Link
              href="/cart"
              className={cn(
                // Base styles
                'relative flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all',

                // Active/Inactive states with accent color
                isActive('/cart')
                  ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
              aria-current={isActive('/cart') ? 'page' : undefined}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" strokeWidth={2.5} />
                {itemCount > 0 && !isActive('/cart') && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-error-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-error-500 text-white text-xs font-bold items-center justify-center">
                      {itemCount}
                    </span>
                  </span>
                )}
              </div>
              <span>Cart</span>
              {itemCount > 0 && isActive('/cart') && (
                <Badge variant="warning" size="sm">
                  {itemCount}
                </Badge>
              )}
              {isActive('/cart') && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1/2 h-1 bg-accent-400 rounded-full" />
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
