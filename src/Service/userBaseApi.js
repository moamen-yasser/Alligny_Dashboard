import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const userBaseUrl = import.meta.env.VITE_USER_API_BASE_URL;

const userBaseQuery = fetchBaseQuery({
    baseUrl: userBaseUrl,
    prepareHeaders: (headers) => {
        const token = Cookies.get('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const userBaseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await userBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Reset cookies
        Cookies.remove('isAuthenticated');
        Cookies.remove('admin');
        Cookies.remove('token');

        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }

    return result;
};

export const userBaseApi = createApi({
    reducerPath: 'userApi',
    baseQuery: userBaseQueryWithReauth,
    tagTypes: ['AllCustomers', 'AllNotifications'],
    endpoints: () => ({}),
});
