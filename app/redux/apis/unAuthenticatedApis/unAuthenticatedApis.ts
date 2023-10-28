import { getLocalStorage } from "@/app/helpers/storage";
import { unAuthenticatedBase } from "../../services";

export const unAuthenticatedBaseEndpoints = unAuthenticatedBase.injectEndpoints(
  {
    endpoints: (builder) => ({
      signup: builder.mutation({
        query: (data) => {
          return {
            url: "signup",
            method: "POST",
            body: data,
          };
        },
      }),
      login: builder.mutation({
        query: (data) => {
          return {
            url: "login/",
            method: "POST",
            body: data,
          };
        },
      }),
      requestOtp: builder.mutation({
        query: (data) => {
          return {
            url: "request-otp",
            method: "POST",
            body: data,
          };
        },
      }),
      verifyEmail: builder.mutation({
        query: (data) => {
          return {
            url: "verify-email/",
            method: "PATCH",
            body: data,
          };
        },
      }),

      onBoarding: builder.mutation({
        query: (data) => {
          return {
            url: `onboarding/${getLocalStorage("school_id")}`,
            method: "PATCH",
            body: data,
            headers: {
              Authorization: `Bearer ${getLocalStorage("school_token")}`,
            },
          };
        },
      }),
    }),
  }
);

export const {
  useSignupMutation,
  useLoginMutation,
  useRequestOtpMutation,
  useVerifyEmailMutation,
  useOnBoardingMutation,
} = unAuthenticatedBaseEndpoints;
