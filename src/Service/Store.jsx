import { configureStore } from '@reduxjs/toolkit';
import { providerBaseApi } from './providerBaseApi';
import { userBaseApi } from './userBaseApi';
import { oldProviderBaseApi } from './oldProviderBaseApi';

export const Store = configureStore({
    reducer: {
        [providerBaseApi.reducerPath]: providerBaseApi.reducer,
        [oldProviderBaseApi.reducerPath]: oldProviderBaseApi.reducer,
        [userBaseApi.reducerPath]: userBaseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            providerBaseApi.middleware,
            oldProviderBaseApi.middleware,
            userBaseApi.middleware,
        ),
});