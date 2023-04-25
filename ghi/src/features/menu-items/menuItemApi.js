import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const menuItemApi = createApi({
    reducerPath: 'menuItem',
    baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
    credentials: "include"
    }),
    tagTypes: ['MenuItems'],
    endpoints: (builder) => ({
    getAllCustomer: builder.query({
        query: (chefId) => ({
        url: '/menu-items',
        method: 'GET',
        params: {
            chef_id: chefId
        }
    }),
      provideTags:['MenuItems']
    }),
    getAllChef: builder.query({
      query: (chefId) => `/chef/${chefId}/menu_items`,
      providesTags:['MenuItems']
    }),
    getOneMenuItem: builder.query({
      query: (menuItemId) => `/menu-items/${menuItemId}`,
      providesTags:['MenuItems']
    }),

    createMenuItem: builder.mutation({
      query:(menuItem)=>({
        url:`/menu-items`,
        method:'POST',
        body: menuItem
      }),
        invalidatesTags:['MenuItems']
      }),
    updateMenuItem: builder.mutation({
      query:(menuItem)=>({
        url: `/menu-items/${menuItem.menu_item_id}`,
        method: 'PUT',
        body:{
            ...menuItem
          }
      }),
        invalidatesTags:['MenuItems']
      }),

    deleteMenuItem: builder.mutation({
      query:({menuItemId})=> ({
        url: `/menu-items/${menuItemId}`,
        method:'DELETE'
      }),
        invalidatesTags:['MenuItems']
    })
})
})

export const {
    useGetAllCustomerQuery,
    useGetAllChefQuery,
    useGetOneMenuItemQuery,
    useDeleteMenuItemMutation,
    useCreateMenuItemMutation,
    useUpdateMenuItemMutation
} = menuItemApi;
