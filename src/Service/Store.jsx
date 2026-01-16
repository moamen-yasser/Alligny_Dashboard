import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './Apis/authApi';
import { servicesApi } from './Apis/servicesApi';

export const Store = configureStore({
    reducer: {
        [servicesApi.reducerPath]: servicesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            servicesApi.middleware,
            authApi.middleware,
        ),
});