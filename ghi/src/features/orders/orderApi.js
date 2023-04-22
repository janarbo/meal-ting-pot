import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const orderApi = createApi({
    reducerPath: "order",
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include",
    }),
    endpoints: (builder) => ({
    })
})


export const {

} = orderApi;
