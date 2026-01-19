import { providerBaseApi } from '../providerBaseApi';

export const servicesApi = providerBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: (params) => ({
                url: '/v1/admin/services-filter',
                method: 'GET',
                params,
            }),
            providesTags: ['AllServices'],
        }),
        getService: builder.query({
            query: (id) => ({
                url: `/v1/admin/services/${id}`,
                method: 'GET',
            }),
            providesTags: ['AllServices'],
        }),

        approveService: builder.mutation({
            query: ({ id }) => ({
                url: `/v1/admin/services/${id}/approve`,
                method: 'POST',
            }),
            invalidatesTags: ['AllServices'],
        }),
        rejectService: builder.mutation({
            query: ({ id }) => ({
                url: `/v1/admin/services/${id}/reject`,
                method: 'POST',
            }),
            invalidatesTags: ['AllServices'],
        }),
    }),
});

export const {
    useGetAllServicesQuery,
    useGetServiceQuery,

    useApproveServiceMutation,
    useRejectServiceMutation,
} = servicesApi;