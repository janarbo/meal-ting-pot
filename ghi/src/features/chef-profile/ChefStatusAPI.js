import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chefApi = createApi({
    reducerPath: "chef",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MEAL_TING_POT_API_HOST,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
        },
    }),
    endpoints: (builder) => ({
        chefAvailability: builder.mutation({
        query: (available) => ({
            url: "/chef/availability",
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({ available }),
            headers: {
            "Content-Type": "application/json",
            },
        }),
        }),
    }),
});

export const { useChefAvailabilityMutation } = chefApi;
