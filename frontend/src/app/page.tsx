'use client';

import { useState } from 'react';
import { ItemType } from '@/lib/types/item';
import { useItems } from '@/lib/hooks/useItems';
import { ItemsList } from '@/components/items/ItemsList';
import { ItemsFilter } from '@/components/items/ItemsFilter';
import { ItemsLoadingSkeleton } from '@/components/items/ItemSkeleton';
import { AlertCircle, Sparkles, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [selectedType, setSelectedType] = useState<ItemType | 'ALL'>('ALL');
  const { data: items = [], isLoading, error, refetch } = useItems(
    selectedType === 'ALL' ? undefined : selectedType
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Colorful gradient */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm mb-6">
              <Sparkles className="h-4 w-4" fill="currentColor" />
              <span>Premium Shopping Experience</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-warning-300 to-orange-300 bg-clip-text text-transparent">
                Products & Events
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Shop the latest products and book exclusive events with confidence. Quality guaranteed.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{items.length}+</div>
                  <div className="text-sm text-white/80">Items Available</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Fast</div>
                  <div className="text-sm text-white/80">Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Clean white background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedType === 'ALL' ? 'All Items' : selectedType === ItemType.PRODUCT ? 'Products' : 'Events'}
            </h2>
            <p className="text-base text-gray-600 font-medium">
              {items.length} {items.length === 1 ? 'item' : 'items'} available
            </p>
          </div>
          <ItemsFilter selectedType={selectedType} onFilterChange={setSelectedType} />
        </div>

        {/* Loading State */}
        {isLoading && <ItemsLoadingSkeleton />}

        {/* Error State - Colorful alert */}
        {error && (
          <div className="bg-white border-2 border-error-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-error-500 to-error-600 flex items-center justify-center shadow-lg shadow-error-500/30">
                <AlertCircle className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Oops! Something went wrong
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  {error instanceof Error ? error.message : 'Failed to load items. Please try again.'}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => refetch()}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Items List */}
        {!isLoading && !error && <ItemsList items={items} />}

        {/* Empty State */}
        {!isLoading && !error && items.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 mb-6">
              <Package className="h-12 w-12 text-primary-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No items found
            </h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your filters to see more results
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={() => setSelectedType('ALL')}
            >
              View All Items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
