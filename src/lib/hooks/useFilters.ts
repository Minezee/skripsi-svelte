// src/hooks/useFilters.ts
import { writable, derived } from 'svelte/store';
import { page } from '$app/stores';
import type { ProductProps } from '../../types/product';
import { SvelteURLSearchParams } from 'svelte/reactivity';

export function useFilters(initialCategory: string, initialSort: string) {
    // Create writable stores for state
    const activeCategory = writable<string>(initialCategory);
    const sortCriteria = writable<string>(initialSort);
    const searchQuery = writable<string>('');

    // Update URL when filters change
    // const updateQueryParams = derived(
    //     [activeCategory, sortCriteria, searchQuery, $page],
    //     ([$activeCategory, $sortCriteria, $searchQuery, $page]) => {
    //         const params = new URLSearchParams($page.url.searchParams.toString());

    //         if ($activeCategory) {
    //             params.set('category', $activeCategory);
    //         } else {
    //             params.delete('category');
    //         }

    //         if ($sortCriteria) {
    //             params.set('sort', $sortCriteria);
    //         } else {
    //             params.delete('sort');
    //         }

    //         if ($searchQuery) {
    //             params.set('search', $searchQuery);
    //         } else {
    //             params.delete('search');
    //         }

    //         // Update URL without page reload
    //         history.pushState({}, '', `${$page.url.pathname}?${params.toString()}`);
    //     }
    // );

    // Initialize from URL params
    const initializeFromUrl = () => {
        const params = new URLSearchParams();
        activeCategory.set(params.get('category') || '');
        sortCriteria.set(params.get('sort') || '');
        searchQuery.set(params.get('search') || '');
    };

    // Run initialization when page store is ready
    // if ($page) {
    //     initializeFromUrl();
    // }

    // Apply filters and sorting
    const applyFiltersAndSorting = (productData: ProductProps[]) => {
        return derived(
            [activeCategory, sortCriteria, searchQuery],
            ([$activeCategory, $sortCriteria, $searchQuery]) => {
                let filteredProducts = [...productData];

                // Search filter
                if ($searchQuery) {
                    filteredProducts = filteredProducts.filter((product) =>
                        product.title.toLowerCase().includes($searchQuery.toLowerCase())
                    );
                }

                // Category filter
                if ($activeCategory) {
                    filteredProducts = filteredProducts.filter(
                        (product) => product.category === $activeCategory
                    );
                }

                // Sorting
                filteredProducts.sort((a, b) => {
                    switch ($sortCriteria) {
                        case 'priceAsc':
                            return a.price - b.price;
                        case 'priceDesc':
                            return b.price - a.price;
                        case 'ratingAsc':
                            return a.rating.rate - b.rating.rate;
                        case 'ratingDesc':
                            return b.rating.rate - a.rating.rate;
                        case 'nameAsc':
                            return a.title.localeCompare(b.title);
                        case 'nameDesc':
                            return b.title.localeCompare(a.title);
                        default:
                            return 0;
                    }
                });

                // Convert price (example conversion)
                filteredProducts = filteredProducts.map((product) => ({
                    ...product,
                    price: product.price * 15836,
                }));

                return filteredProducts;
            }
        );
    };

    return {
        activeCategory,
        setActiveCategory: (value: string) => activeCategory.set(value),
        sortCriteria,
        setSortCriteria: (value: string) => sortCriteria.set(value),
        searchQuery,
        setSearchQuery: (value: string) => searchQuery.set(value),
        applyFiltersAndSorting,
    };
}