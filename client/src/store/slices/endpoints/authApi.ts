import { apiSlice } from "../apiSlice";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  username: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    register: builder.mutation({
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Constructs a query configuration for the register mutation endpoint.
 * 
 * Sends a POST request to the "/register" URL with the provided registration data.
 * The request includes credentials for cookie-based authentication.
 *
 * @param data - The registration input data containing username, email, and password.

/*******  e4a526d7-491f-4f0f-acdd-30bea2100514  *******/
      query: (data: RegisterInput) => ({
        url: "/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice;
