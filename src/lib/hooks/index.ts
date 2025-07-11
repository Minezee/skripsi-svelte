import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import APIInstance from '$lib/axios/init';
import { derived } from 'svelte/store';

interface QueryKey {
    queryKey: [string, string];
}

interface PostParams {
    endpoint: string;
    payload: Record<string, any>;
}

const fetchData = async ({ queryKey }: QueryKey) => {
    const [_key, endpoint] = queryKey;
    const { data } = await APIInstance.get(endpoint);
    return data;
};

const postData = async ({ endpoint, payload }: PostParams) => {
    const { data } = await APIInstance.post(endpoint, payload);
    return data;
};

const checkout = async ({ payload }: { payload: Record<string, any> }) => {
    const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Checkout failed');
    }

    const data = await response.json();
    return data;
};

export const useFetch = (endpoint: string, queryKey: string) => {
    return createQuery({
        queryKey: [queryKey, endpoint],
        queryFn: fetchData,
        enabled: !!endpoint,
    });
};

export const usePostData = () => {
    const queryClient = useQueryClient();
    const mutation = createMutation({
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    return ({
        mutateAsync: derived(mutation, ($m) => $m.mutateAsync),
        isLoading: derived(mutation, ($m) => $m.isPending),
        isError: derived(mutation, ($m) => $m.isError),
        error: derived(mutation, ($m) => $m.error),
    })
};

export const useCheckout = () => {
    const queryClient = useQueryClient();
    return createMutation({
        mutationFn: checkout,
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });
};
