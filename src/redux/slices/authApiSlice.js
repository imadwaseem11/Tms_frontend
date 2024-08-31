import { apiSlice } from "./apiSlice";

const AUTH_URL = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
           query:(data)=>({
            url: `${AUTH_URL}/login`,
            method:"POST",
            body:data,
            credentials: "include",
             mode:"no-cors"
           }),
        }),

        register: builder.mutation({
            query:(data)=>({
             url: `${AUTH_URL}/register`,
             method:"POST",
             body:data,
             credentials: "include",
             mode:"no-cors"
            }),
         }),

         logout: builder.mutation({
            query:(data)=>({
             url: `${AUTH_URL}/logout`,
             method:"POST",
             credentials: "include",
              mode:"no-cors"
            }),
         }),

    })
});

export const {useLoginMutation,useRegisterMutation,useLogoutMutation} = authApiSlice;