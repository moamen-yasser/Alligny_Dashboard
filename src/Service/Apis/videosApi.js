import { providerBaseApi } from "../providerBaseApi";

export const videosApi = providerBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllVideos: builder.query({
            query: (params) => ({
                url: '/v1/videos',
                method: 'GET',
                params,
            }),
            providesTags: ['AllVideos'],
        }),
        uploadVideo: builder.mutation({
            query: (body) => ({
                url: `/v1/videos/upload`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AllVideos'],
        }),
        deleteVideo: builder.mutation({
            query: ({ id }) => ({
                url: `/v1/videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AllVideos'],
        }),
    }),
});

export const {
    useGetAllVideosQuery,
    useUploadVideoMutation,
    useDeleteVideoMutation,
} = videosApi;