import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (params) => ({
                url: '/v1/auth/login',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Auth'],
        }),
        changePassword: builder.mutation({
            query: (params) => ({
                url: '/v1/admin/change-password',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/v1/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useChangePasswordMutation } = authApi;