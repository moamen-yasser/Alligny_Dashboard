import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_API_BASE_URL;

const customerBaseQuery = fetchBaseQuery({
    baseUrl: customerBaseUrl,
    prepareHeaders: (headers) => {
        const token = Cookies.get('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const customerBaseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await customerBaseQuery(args, api, extraOptions);

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

export const customerBaseApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: customerBaseQueryWithReauth,
    tagTypes: ['AllCustomers'],
    endpoints: () => ({}),
});
