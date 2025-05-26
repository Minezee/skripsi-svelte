// src/lib/stores/auth.ts
import { writable } from 'svelte/store';
import { toast } from 'svelte-sonner';

function createAuthStore() {
    const { subscribe, update, set } = writable<{
        token: string | null;
    }>({ token: null });

    return {
        subscribe,
        setToken: (token: string | null) => {
            update(store => {
                if (token) {
                    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
                }
                return { ...store, token };
            });
        },
        logout: () => {
            toast.error('Success Logout');
            set({ token: null });
            document.cookie = 'token=; path=/; max-age=0';
            document.cookie = 'refreshToken=; path=/; max-age=0';
        },
        initialize: () => {
            const tokenFromCookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            set({ token: tokenFromCookie || null });
        }
    };
}

export const auth = createAuthStore();