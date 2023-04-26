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
            providesTags: ['Order'],
        }),

        updateOrder: builder.mutation({
            query: ( orders ) => ({
                url: `/orders/${orders.order_id}`,
                method: 'PUT',
                body: {
                   ...orders,
                },

            }),
            invalidatesTags: ['Order'],
        })
    })
})


export const {
    useGetAllOrdersQuery,
    useUpdateOrderMutation,
    useCreateOrderMutation,
} = orderApi;
