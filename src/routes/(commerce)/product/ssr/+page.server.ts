export const load = async ({ fetch }) => {
    const fetchProducts = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        return await response.json();
    };

    const fetchCategories = async () => {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        return await response.json();
    };

    return {
        products: await fetchProducts(),
        categories: await fetchCategories()
    };
};