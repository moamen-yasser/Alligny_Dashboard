import { customerBaseApi } from '../customerBaseApi';

export const customerApi = customerBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomers: builder.query({
            query: () => ({
                url: '/admin/users',
                method: 'GET',
            }),
            providesTags: ['AllCustomers'],
        }),

        getCustomer: builder.query({
            query: ({ id }) => ({
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
    }),
});

export const {
    useGetAllCustomersQuery,
    useGetCustomerQuery,
    useActiveCustomerMutation
} = customerApi;