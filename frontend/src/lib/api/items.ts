import { apiClient } from './client';
import { Item, ItemType } from '../types/item';

export const itemsApi = {
    getAll: async (type?: ItemType): Promise<Item[]> => {
        const params = type ? { type } : {};
        const response = await apiClient.get<Item[]>('/items', { params });
        return response.data;
    },
    getById: async (id: string): Promise<Item> => {
        const response = await apiClient.get<Item>(`/items/${id}`);
        return response.data;
    },
};