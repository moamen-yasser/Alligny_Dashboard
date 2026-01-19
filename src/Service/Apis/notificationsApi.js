import { providerBaseApi } from '../providerBaseApi';
import { userBaseApi } from '../userBaseApi';

// Api for Provider Notifications (using providerBaseApi)
export const providerNotificationsApi = providerBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProviderNotifications: builder.query({
            query: (params) => ({
                url: '/v1/admin/notifications/all',
                method: 'GET',
                params,
            }),
            providesTags: ['AllNotifications'],
        }),
        sendProviderNotification: builder.mutation({
            query: (body) => ({
                url: '/v1/admin/notifications/broadcast',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AllNotifications'],
        }),
    }),
});

// Api for User Notifications (using userBaseApi)
export const userNotificationsApi = userBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserNotifications: builder.query({
            query: (params) => ({
                url: '/admin/notifications/all',
                method: 'GET',
                params,
            }),
            providesTags: ['AllNotifications'],
        }),
        sendUserNotification: builder.mutation({
            query: (body) => ({
                url: '/admin/notifications/broadcast',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AllNotifications'],
        }),
    }),
});

export const {
    useGetProviderNotificationsQuery,
    useSendProviderNotificationMutation,
} = providerNotificationsApi;

export const {
    useGetUserNotificationsQuery,
    useSendUserNotificationMutation,
} = userNotificationsApi;
