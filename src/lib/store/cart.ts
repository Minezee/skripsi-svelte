// src/stores/cartStore.ts
import { derived, writable } from 'svelte/store';
import type { ProductProps } from '../../types/product';

interface CartItem extends ProductProps {
    quantity: number;
}

function createCartStore() {
    const { subscribe, update } = writable<CartItem[]>([]);

    return {
        subscribe,
        items: [],
        addToCart: (product: ProductProps) => {
            update(items => {
                const existingItem = items.find(item => item.id === product.id);
                if (existingItem) {
                    return items.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...items, { ...product, quantity: 1 }];
            });
        },
        removeFromCart: (productId: number) => {
            update(items => items.filter(item => item.id !== productId));
        },
        updateQuantity: (productId: number, quantity: number) => {
            update(items =>
                items.map(item =>
                    item.id === productId
                        ? { ...item, quantity }
                        : item
                ).filter(item => item.quantity > 0)
            );
        },
        clearCart: () => {
            update(() => []);
        },
        getTotalItems: () => {
            let total = 0;
            const unsubscribe = subscribe(items => {
                total = items.reduce((sum, item) => sum + item.quantity, 0);
            });
            unsubscribe();
            return total;
        },
        getTotalPrice: () => {
            let total = 0;
            const unsubscribe = subscribe(items => {
                total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            });
            unsubscribe();
            return total;
        }
    };
}

export const cart = createCartStore();

// Derived stores for reactive totals
export const totalItems = derived(cart, $cart =>
    $cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const totalPrice = derived(cart, $cart =>
    $cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);