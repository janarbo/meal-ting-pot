import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chefProfileApi = createApi({
    reducerPath: 'profiles',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include"
    }),
    endpoints: builder => ({
        getOneChefProfile: builder.query({
            query: (id) => '/profile/' + id,
            provideTags: ['MainPage'],
        }),

        getAllChefProfiles: builder.query({
            query: () => '/profile/',
            providesTags: ['MainPage'],
        }),


        getOneProfile: builder.query({
            query: (profileId) => '/profile/' + profileId,
            providesTags: ['MainPage'],

        }),

        getAllTags: builder.query({
            query: () => '/tags',
            providesTags: ['Tags'],
        }),


        createProfile: builder.mutation({
            query: (data) =>({
            url: '/profile',
            body: data,
            method: 'post'

            }),
           invalidatesTags: ['MainPage'],
        }),


        updateProfile: builder.mutation({
            query: (data) => ({
                url: `/profile/${data.profile_id}`,
                method: 'PUT',
                body:{
                    ...data,
                }
            }),
            invalidatesTags: ['MainPage'],
        }),

        getAvailableChefProfilesQuery: builder.query({
            query: (availability) => "/profile/" + availability,
            providesTags: ['MainPage'],
        }),

    })
})


export const {
    useGetAllChefProfilesQuery,
    useCreateProfileMutation,
    useGetAllTagsQuery,
    useUpdateProfileMutation,
    useGetOneProfileQuery,
    useGetOneChefProfileQuery,
    useGetAvailableChefProfilesQueryQuery

} = chefProfileApi;
