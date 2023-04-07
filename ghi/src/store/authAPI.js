import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().token
            console.log(token)

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                console.log('imloggedin')
            }
            return headers
        },
    }),
    endpoints: builder => ({
        signup: builder.mutation({
            query: info => {
                console.log(info);
                let dictionary = {}
                if (info instanceof HTMLElement) {
                    dictionary = {info}
                } else {
                    dictionary = {
                        "first_name": info.first_name,
                        "last_name": info.last_name,
                        "username": info.username,
                        "hashed_password": info.password,
                        "email": info.email,
                        "is_chef": info.isChef
                    }
                }
                return {
                    url: '/accounts',
                    method: 'post',
                    body: dictionary,
                    credentials: 'include',
                }
            },
            invalidatesTags: result => {
                return (result && ['accounts']) || [];
            },
        }),
        login: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('username', info.username);
                    formData.append('password', info.password);
                }
                return {
                    url: '/token',
                    method: 'post',
                    body: formData,
                    credentials: 'include',
                };
            },
            invalidatesTags: result => {
                return (result && ['accounts']) || [];
            },
        }),
        getToken: builder.query({
            query: () => ({
            url: '/token',

            credentials: 'include',
            }),
            providesTags: ['Token'],
        }),
        logout: builder.mutation({
            query: () => '/token',
        }),
    }),
});

export const { useAuthQuery, useLoginMutation, useSignupMutation } = authApi;
