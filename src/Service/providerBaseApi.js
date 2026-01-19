import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const providerBaseUrl = import.meta.env.VITE_PROVIDER_API_BASE_URL;

const providerBaseQuery = fetchBaseQuery({
    baseUrl: providerBaseUrl,
    prepareHeaders: (headers) => {
        const token = Cookies.get('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const providerBaseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await providerBaseQuery(args, api, extraOptions);

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

export const providerBaseApi = createApi({
    reducerPath: 'providerApi',
    baseQuery: providerBaseQueryWithReauth,
    tagTypes: ['Auth', 'AllServices', 'AllVideos', 'AllNotifications'],
    endpoints: () => ({}),
});
