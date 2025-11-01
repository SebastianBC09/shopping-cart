export function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
    }).format(price);
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

export function formatShortDate(date: string | Date): string {
    return new Intl.DateTimeFormat('es-ES', {
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
}