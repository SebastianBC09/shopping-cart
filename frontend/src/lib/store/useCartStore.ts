import { create } from 'zustand';
import { Cart } from '../types/cart';
import { cartApi } from '../api/cart';
import toast from 'react-hot-toast';

interface CartStore {
    cart: Cart | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchCart: () => Promise<void>;
    addItem: (itemId: string, quantity: number) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set) => ({
    cart: null,
    isLoading: false,
    error: null,

    fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
            const cart = await cartApi.get();
            set({ cart, isLoading: false });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to fetch cart';
            set({ error: message, isLoading: false });
        }
    },

    addItem: async (itemId: string, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
            const cart = await cartApi.addItem({ itemId, quantity });
            set({ cart, isLoading: false });
            toast.success('Item added to cart');
        } catch (error: unknown) {
            const message = error && typeof error === 'object' && 'response' in error
                ? (error.response as { data?: { message?: string } })?.data?.message
                : undefined;
            const errorMessage = message || 'Failed to add item';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
            throw error;
        }
    },

    updateQuantity: async (itemId: string, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
            const cart = await cartApi.updateQuantity(itemId, { quantity });
            set({ cart, isLoading: false });
            if (quantity === 0) {
                toast.success('Item removed from cart');
            } else {
                toast.success('Quantity updated');
            }
        } catch (error: unknown) {
            const message = error && typeof error === 'object' && 'response' in error
                ? (error.response as { data?: { message?: string } })?.data?.message
                : undefined;
            const errorMessage = message || 'Failed to update quantity';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
            throw error;
        }
    },

    removeItem: async (itemId: string) => {
        set({ isLoading: true, error: null });
        try {
            const cart = await cartApi.removeItem(itemId);
            set({ cart, isLoading: false });
            toast.success('Item removed from cart');
        } catch (error: unknown) {
            const message = error && typeof error === 'object' && 'response' in error
                ? (error.response as { data?: { message?: string } })?.data?.message
                : undefined;
            const errorMessage = message || 'Failed to remove item';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
            throw error;
        }
    },

    clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
            await cartApi.clear();
            set({ cart: null, isLoading: false });
            toast.success('Cart cleared');
        } catch (error: unknown) {
            const message = error && typeof error === 'object' && 'response' in error
                ? (error.response as { data?: { message?: string } })?.data?.message
                : undefined;
            const errorMessage = message || 'Failed to clear cart';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
        }
    },
}));
