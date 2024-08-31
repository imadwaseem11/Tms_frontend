import { UserAction } from "../../components/Dialogs";
import { apiSlice } from "./apiSlice";


const USER_URL = "/user"
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        updateUser: builder.mutation({
           query:(data)=>({
            url: `${USER_URL}/profile`,
            method:"PUT",
            body:data,
            credentials: "include",
           }),
        }),

        deleteUser: builder.mutation({
            query:(id)=>({
             url: `${USER_URL}/${id}`,
             method:"DELETE",
             credentials: "include",
            }),
         }),

         getTeamList: builder.query({
            query:()=>({
             url: `${USER_URL}/get-team`,
             method:"GET",
             credentials: "include",
            }),
         }),

         UserAction: builder.mutation({
            query:(data)=>({
             url: `${USER_URL}/${data.id}`,
             method:"PUT",
             body:data,
             credentials: "include",
            }),
         }),

         getNotifications: builder.query({
            query: () => ({
                url: `${USER_URL}/notifications`,
                method: "GET",
                credentials: "include",
            }),
        }),
        
         markNotiAsRead: builder.mutation({
            query:(data)=>({
             url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
             method:"PUT",
             body:data,
             credentials: "include",
            }),
         }),

         changePassword: builder.mutation({
            query:(data)=>({
             url: `${USER_URL}/change-password`,
             method:"PUT",
             body:data,
             credentials: "include",
            }),
         }),

         forgetpassword: builder.mutation({
            query: (data) => ({
               url: `${USER_URL}/forgot-password`,
               method: "POST",
               body: data,  // data contains the email
               credentials: "include",
            }),
         }),
         
         
         verifyOTP: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/verify-otp`,
                method: "POST",
                body: data,  // data should contain both otp and userId
                credentials: "include",
            }),
        }),
        
        resetPassword: builder.mutation({
         query: (data) => ({
             url: `${USER_URL}/reset-password`,
             method: "POST",
             body: data,  // data should contain both otp and userId
             credentials: "include",
         }),
     }),

        })
});

export const {useUpdateUserMutation, 
   useGetTeamListQuery, 
   useDeleteUserMutation, 
   useUserActionMutation, 
   useGetNotificationsQuery, 
   useMarkNotiAsReadMutation, 
   useChangePasswordMutation, useForgetpasswordMutation, useVerifyOTPMutation, useResetPasswordMutation } = userApiSlice