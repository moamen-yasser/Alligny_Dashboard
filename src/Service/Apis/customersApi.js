import { baseApi } from '../baseApi';

export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: () => ({
                url: '/Admin/students',
                method: 'GET',
            }),
            providesTags: ['AllStudents'],
        }),
        approveStudent: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/approve-student/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['ApproveStudent'],
        }),
        rejectStudent: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/reject-student/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['RejectStudent'],
        }),
    }),
});

export const { 
    useGetAllStudentsQuery, 
    useApproveStudentMutation, 
    useRejectStudentMutation 
} = studentApi;