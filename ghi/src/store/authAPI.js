import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
    }),
    endpoints: builder => ({
        signup: builder.query({
            query: () => '/api/accounts',
        }),
        login: builder.query({
            query: () => '/token',
        }),
        logout: builder.query({
            query: () => '/token',
        }),
        getToken: builder.query({
            query: () => '/token'
        })
    }),
});

export const { useAuthQuery } = authApi;
