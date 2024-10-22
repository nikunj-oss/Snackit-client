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

    createRestaurant:builder.mutation({
      query:({data,token})=>({
        url:"restaurant",
        method:"POST",
        body:data,
        headers:{
          'Authorization':`Bearer ${token}`,
        }
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error creating restaurant", error);
        }
      },
    }),
    getMyRestaurant:builder.query({
      query:({token})=>({
        url:"restaurant",
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        }
      }),
      onQueryStarted:async (arg,{queryFulfilled})=>{
        try{
          await queryFulfilled;
        }
        catch(e){
          console.error("Error fetching restaurant",e)
        }
      }
    }),

    updateMyRestaurant:builder.mutation({
      query:({data,token})=>({
        url:"restaurant",
        method:"PUT",
        body:data,
        headers:{
          'Authorization':`Bearer ${token}`
        }
      }),
      onQueryStarted:async (arg,{queryFulfilled})=>{

        try{
          await queryFulfilled;
        }
        catch(e){
          console.error("error updating restaurant",e);
        }
      }
    })
  }),

});

export default api;
export const {
  useCreateUserProfileMutation,
  useEditUserProfileMutation,
  useGetUserProfileQuery,
  useCreateRestaurantMutation,
  useGetMyRestaurantQuery,
  useUpdateMyRestaurantMutation
  
} = api;
