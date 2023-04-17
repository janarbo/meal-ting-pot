import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shoppingCartApi = createApi({
    reducerPath: "shoppingCart",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include",
        tagTypes: ['Cart']
    }),
    endpoints: (builder) => ({
        createShoppingCart: builder.mutation({
            query: () => ({
                url: '/cart',
                method: 'POST'
            }),
            invalidateTags: ['Cart']
        }),
        getOneShoppingCart: builder.query({
            query: (cartId) => '/cart/' +  cartId
        }),
        updateShoppingCart: builder.mutation({
            query: (cartId, data) => ({
                url: '/cart/' + cartId,
                body: data,
                method: 'PUT',
            }),
            invalidateTags: ['Cart']
        }),
        getOneShoppingCartWithItems: builder.query({
            query: (cartId) => '/cart/' + cartId + '/items'
        })
    })
})


export const {
    useCreateShoppingCartMutation,
    useGetOneShoppingCartQuery,
    useUpdateShoppingCartMutation,
    useGetOneShoppingCartWithItemsQuery,
} = shoppingCartApi;
