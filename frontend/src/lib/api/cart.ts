import { apiClient } from './client';
import { Cart, AddToCartDto, UpdateQuantityDto } from '../types/cart';

export const cartApi = {
    get: async (): Promise<Cart> => {
        const response = await apiClient.get<Cart>('/cart');
        return response.data;
    },
    addItem: async (dto: AddToCartDto): Promise<Cart> => {
        const response = await apiClient.post<Cart>('/cart/items', dto);
        return response.data;
    },
    updateQuantity: async (itemId: string, dto: UpdateQuantityDto): Promise<Cart> => {
        const response = await apiClient.patch<Cart>(`/cart/items/${itemId}`, dto);
        return response.data;
    },
    removeItem: async (itemId: string): Promise<Cart> => {
        const response = await apiClient.delete<Cart>(`/cart/items/${itemId}`);
        return response.data;
    },
    clear: async (): Promise<void> => {
        await apiClient.delete('/cart');
    },
};