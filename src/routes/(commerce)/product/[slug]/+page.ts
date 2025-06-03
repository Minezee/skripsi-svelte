import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const { slug } = params;

    return {
        slug,
    };
};
