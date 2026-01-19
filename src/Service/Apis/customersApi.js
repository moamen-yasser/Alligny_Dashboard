import { userBaseApi } from '../userBaseApi';

export const customerApi = userBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomers: builder.query({
            query: (params) => ({
                url: '/admin/users',
                method: 'GET',
                params,
            }),
            providesTags: ['AllCustomers'],
        }),

        getCustomer: builder.query({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: 'GET',
            }),
            providesTags: ['AllCustomers'],
        }),

        activeCustomer: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/users/activate-subscription/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['AllCustomers'],
        }),
        deleteCustomer: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/Delete-User/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AllCustomers'],
        }),
    }),
});

export const {
    useGetAllCustomersQuery,
    useGetCustomerQuery,
    useActiveCustomerMutation,
    useDeleteCustomerMutation,
} = customerApi;