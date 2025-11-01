'use client';

import { ItemType } from '@/lib/types/item';
import { Button } from '@/components/ui/Button';

interface ItemsFilterProps {
  selectedType: ItemType | 'ALL';
  onFilterChange: (type: ItemType | 'ALL') => void;
}

export function ItemsFilter({ selectedType, onFilterChange }: ItemsFilterProps) {
  const filters = [
    { label: 'All Items', value: 'ALL' as const },
    { label: 'Products', value: ItemType.PRODUCT },
    { label: 'Events', value: ItemType.EVENT },
  ];

  return (
    <div className="flex items-center space-x-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedType === filter.value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
