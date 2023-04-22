import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setShoppingCart } from './shoppingCartSlice';


export const shoppingCartApi = createApi({
    reducerPath: "shoppingCart",
    tagTypes: ['Cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        // SHOPPING CART //
        createShoppingCart: builder.mutation({
            query: () => ({
                url: '/cart',
                method: 'POST'
            }),
            invalidateTags: ['Cart'],
        }),

        updateShoppingCart: builder.mutation({
            query: (cartId, data) => ({
                url: '/cart/' + cartId,
                body: data,
                method: 'PUT'
            }),
            invalidateTags: ['Cart']
        }),

        getOneShoppingCartWithItems: builder.query({
            query: (cartId) => '/cart/' + cartId + '/items',
            provideTags: ['Cart']
        }),

        // CART ITEMS //
        createCartItem: builder.mutation({
            query: (data) => ({
                url: '/cart-item',
                body: data,
                method: 'POST'
            }),
            InvalidateTags: ['Cart']
        }),

        updateCartItem: builder.mutation({
            query: (id, data) => ({
                url: '/cart-item/' + id,
                body: data,
                method: 'PUT'
            }),
            invalidateTags: ['Cart']
        }),

        deleteCartItem: builder.mutation({
            query: (id) => ({
                url: '/cart-item/' + id,
                method: 'DELETE'
            }),
            invalidateTags: ['Cart']
        })

    })
})


export const {
    useCreateShoppingCartMutation,
    useUpdateShoppingCartMutation,
    useGetOneShoppingCartWithItemsQuery,
    useCreateCartItemMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
} = shoppingCartApi;
