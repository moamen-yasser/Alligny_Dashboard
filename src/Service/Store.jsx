import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './Apis/authApi';
import { servicesApi } from './Apis/servicesApi';
import { customerBaseApi } from './customerBaseApi';

export const Store = configureStore({
    reducer: {
        [servicesApi.reducerPath]: servicesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [customerBaseApi.reducerPath]: customerBaseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            servicesApi.middleware,
            authApi.middleware,
            customerBaseApi.middleware,
        ),
});