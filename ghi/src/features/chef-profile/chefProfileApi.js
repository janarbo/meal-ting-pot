import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chefProfileApi = createApi({
    reducerPath: 'profiles',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include"
    }),
    endpoints: builder => ({
        getAllChefProfiles: builder.query({
            query: () => '/profile/',
            providesTags: ['ProfileList'],
        }),

        createProfile: builder.mutation({
            query: data =>({
            url: '/profile',
            body: data,
            method: 'post',

            }),
            invalidatesTags: ['ProfileList'],
        }),
    }),
});

export const {
    useGetAllChefProfilesQuery,
    useCreateProfileMutation,
} = chefProfileApi;