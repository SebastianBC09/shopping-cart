export enum ItemType {
    PRODUCT = 'PRODUCT',
    EVENT = 'EVENT',
}

export interface Item {
    id: string;
    name: string;
    type: ItemType;
    price: number;
    thumbnail?: string;
    description?: string;
    stock: number;
    brand?: string;
    category?: string;
    eventDate?: string;
    location?: string;
    artist?: string;
    venue?: string;
}