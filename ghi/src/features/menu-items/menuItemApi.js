import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const menuItemApi = createApi({
    reducerPath: 'menuItem',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getAllCustomer: builder.query({
            query: chefId => ({
                url: '/menu-items',
                method: 'GET',
                params: {
                    chef_id: chefId
                }
            })
        }),
        getAllChef: builder.query({
            query: (chefId) => '/chef/' + chefId + '/menu_items',
        }),
        getOneMenuItem: builder.query({
            query: (menuItemId) => '/menu-items/' + menuItemId,
        }),
        deleteMenuItem: builder.query({
            query: (menuItemId) => '/menu-items' + menuItemId
        })
    })
})

export const {
    useGetAllCustomerQuery,
    useGetAllChefQuery,
    useGetOneMenuItemQuery,
    useDeleteMenuItemQuery
} = menuItemApi;
