export interface CartItem {
    itemId: string;
    name: string;
    type: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    thumbnail?: string;
}

export interface Cart {
    id: string;
    sessionId?: string;
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface AddToCartDto {
    itemId: string;
    quantity: number;
}

export interface UpdateQuantityDto {
    quantity: number;
}