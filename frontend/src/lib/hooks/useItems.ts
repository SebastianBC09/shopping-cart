import { useQuery } from '@tanstack/react-query';
import { itemsApi } from '../api/items';
import { ItemType } from '../types/item';

export function useItems(type?: ItemType) {
  return useQuery({
    queryKey: ['items', type],
    queryFn: () => itemsApi.getAll(type),
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ['items', id],
    queryFn: () => itemsApi.getById(id),
    enabled: !!id,
  });
}
