// // src/hooks.server.ts
// import { auth } from '$lib/store/auth';
// import { redirect } from '@sveltejs/kit';

// export const handle = async ({ event, resolve }) => {
//     const token = event.cookies.get('token');
//     const route = event.url.pathname;

//     if (!token && !['/login', '/register'].includes(route)) {
//         throw redirect(302, '/login');
//     }

//     if (token && ['/login', '/register'].includes(route)) {
//         throw redirect(302, '/dashboard');
//     }

//     if (token) {
//         auth.setToken(token);
//     }

//     return await resolve(event);
// };