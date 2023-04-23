import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const orderApi = createApi({
    reducerPath: "order",
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders',
                body: data,
                method: 'POST',
            }),
            invalidatesTags: ['Order'],
        }),

        getAllOrders: builder.query({
            query: () => ({
                url: '/orders',
                method: 'GET',
            }),
            provideTags: ['Order']
        }),

        updateOrder: builder.mutation({
            query: (id, data) => ({
                url: '/orders/' + id,
                body: data,
                method: 'PUT',
            }),
            invalidatesTags: ['Order']
        })
    })
})


export const {
    useGetAllOrdersQuery,
    useUpdateOrderMutation,
    useCreateOrderMutation,
} = orderApi;
