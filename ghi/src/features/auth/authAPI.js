import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser } from "./user.js";

<<<<<<< HEAD
export const authApi = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include",
        tagTypes: ['token'],
        prepareHeaders: (headers, { getState }) => {
            const token = getState().token;
            console.log(token);

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                console.log('imloggedin')
            }
            return headers
        },
    }),
    endpoints: builder => ({
        signup: builder.mutation({
            query: info => {
                console.log(info);
=======

export const authApi = createApi({
    reducerPath: 'authentication',
    tagTypes: ['token'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: info => {
>>>>>>> main
                let dictionary = {};
                if (info instanceof HTMLElement) {
                    dictionary = {info};
                } else {
                    dictionary = {
                        "first_name": info.first_name,
                        "last_name": info.last_name,
                        "username": info.username,
                        "hashed_password": info.password,
                        "email": info.email,
                        "is_chef": info.isChef
                    };
                }
                return {
                    url: '/accounts',
                    method: 'post',
                    body: dictionary,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['token'],
        }),
        login: builder.mutation({
<<<<<<< HEAD
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
            invalidatesTags: ['token'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(authApi.endpoints.getToken.initiate());
                } catch (error) {
                    console.error(error);
                }
            }
=======
        query: info => {
            let formData = null;
            if (info instanceof HTMLElement) {
                formData = new FormData(info);
            } else {
                formData = new FormData();
                formData.append("username", info.username);
                formData.append("password", info.password);
            }
            return {
                url: '/token',
                method: 'post',
                body: formData,
                credentials: 'include',
            };
        },
        invalidatesTags: ['token'],
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
            try {
                await queryFulfilled;
                await dispatch(authApi.endpoints.getToken.initiate());
            } catch (error) {
                console.error(error);
            }
        },
>>>>>>> main
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
<<<<<<< HEAD
                method: "get",
                credentials: 'include'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.error(error);
                }
            }
=======
                method: 'get',
                credentials: 'include',
            }),
            providesTags: ['token'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data != null) {
                        dispatch(setUser(data));
                    }
                } catch (error) {
                    console.error(error);
                }
            },
>>>>>>> main
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'delete',
            }),
<<<<<<< HEAD
            invalidatesTags: ['token']
=======
            invalidatesTags: ['token'],
>>>>>>> main
        }),
    }),
});

export const { useAuthQuery, useLoginMutation, useSignupMutation, useLogoutMutation, useGetTokenQuery } = authApi;
