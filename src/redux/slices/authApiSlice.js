import { apiSlice } from "./apiSlice";

const AUTH_URL = "/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login API
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include", // Enables cookies/session handling
      }),
    }),

    // Register API
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include", // Enables cookies/session handling
      }),
    }),

    // Logout API
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include", // Enables cookies/session handling
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApiSlice;

