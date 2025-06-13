export const prerender = true;

export const load = async ({ fetch }) => {
    const [products, categories] = await Promise.all([
        fetch('https://fakestoreapi.com/products').then(res => res.json()),
        fetch('https://fakestoreapi.com/products/categories').then(res => res.json()),
    ]);

    return { products, categories };
};
