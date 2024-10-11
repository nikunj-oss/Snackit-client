import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["User", "Food"],
  endpoints: (builder) => ({
    createUserProfile: builder.mutation({
      query: ({ data, token }) => ({
        url: "user",
        method: "POST",
        body: data,  // Remove JSON.stringify for proper auto serialization
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error creating user profile:", error);
        }
      },
    }),
    editUserProfile: builder.mutation({
      query: ({ data, token }) => ({
        url: "user",
        method: "PUT",
        body: data,  // Same here
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error editing user profile:", error);
        }
      },
    }),
    getUserProfile: builder.query({
        
      query: ( {token} ) => ({
        url: "user",
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      },
    }),
  }),
});

export default api;
export const {
  useCreateUserProfileMutation,
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} = api;
