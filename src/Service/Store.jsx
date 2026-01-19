import { configureStore } from '@reduxjs/toolkit';
import { providerBaseApi } from './providerBaseApi';
import { userBaseApi } from './userBaseApi';

export const Store = configureStore({
    reducer: {
        [providerBaseApi.reducerPath]: providerBaseApi.reducer,
        [userBaseApi.reducerPath]: userBaseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            providerBaseApi.middleware,
            userBaseApi.middleware,
        ),
});