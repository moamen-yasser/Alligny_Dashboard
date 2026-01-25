import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const oldProviderBaseUrl = import.meta.env.VITE_OLD_PROVIDER_API_BASE_URL;

const oldpProviderBaseQuery = fetchBaseQuery({
    baseUrl: oldProviderBaseUrl,
    prepareHeaders: (headers) => {
        const token = Cookies.get('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const oldProviderBaseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await oldpProviderBaseQuery(args, api, extraOptions);

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

export const oldProviderBaseApi = createApi({
    reducerPath: 'oldProviderApi',
    baseQuery: oldProviderBaseQueryWithReauth,
    tagTypes: ['AllVideos'],
    endpoints: () => ({}),
});
