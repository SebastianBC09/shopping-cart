'use client';

import { useEffect, useState } from 'react';
import { Item, ItemType } from '@/src/lib/types/item';
import { itemsApi } from '@/src/lib/api/items';
import { ItemsList } from '@/src/components/items/ItemsList';
import { ItemsFilter } from '@/src/components/items/ItemsFilter';
import { ItemsLoadingSkeleton } from '@/src/components/items/ItemSkeleton';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedType, setSelectedType] = useState<ItemType | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (selectedType === 'ALL') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.type === selectedType));
    }
  }, [selectedType, items]);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await itemsApi.getAll();
      setItems(data);
      setFilteredItems(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load items');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing Products & Events
            </h1>
            <p className="text-xl text-gray-600">
              Shop the latest products and book exclusive events
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedType === 'ALL' ? 'All Items' : selectedType === ItemType.PRODUCT ? 'Products' : 'Events'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
            </p>
          </div>
          <ItemsFilter selectedType={selectedType} onFilterChange={setSelectedType} />
        </div>

        {/* Loading State */}
        {isLoading && <ItemsLoadingSkeleton />}

        {/* Error State */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-error-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-error-800">Error loading items</h3>
              <p className="text-sm text-error-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Items List */}
        {!isLoading && !error && <ItemsList items={filteredItems} />}
      </div>
    </div>
  );
}
