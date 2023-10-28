"use client";
import { useFormik } from "formik";
import * as yup from "yup";

import { useEffect, useState } from "react";
import {
  useLoginMutation,
  useRequestOtpMutation,
} from "@/app/redux/apis/unAuthenticatedApis/unAuthenticatedApis";
import ModalOverlay from "@/app/components/Modal/Modal";
import AppError from "@/app/components/Error/AppError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setLocalStorage } from "@/app/helpers/storage";
import LoginAndSignupParent from "@/app/components/LoginAndSignupParent/LoginAndSignupParent";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  const [loginMutation, { isLoading, error }]: any = useLoginMutation();
  const [
    requestOtpMutaion,
    { isLoading: otpLoading, isSuccess: otpSuccess, data },
  ] = useRequestOtpMutation();

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (otpSuccess) {
      toast.success(data?.message);
    }
  }, [otpSuccess, data?.message]);

  const handleRightIconPress = () => {
    setShowPwd((state) => !state);
  };

  const validationSchema = yup.object().shape({
    password: yup.string().label("Password").required(),
    email: yup.string().label("Email").email().required(),
  });

  const formikProps = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const handleLogin = (email: string, password: string) => {
    loginMutation({ email, password })
      .then((data: any) => {
        if (!data?.error) {
          setLocalStorage("school_token", data?.data.schoolCredentials.token);
          setLocalStorage(
            "school_id",
            data?.data.schoolCredentials.schoolUserId
          );
          toast.success(data?.data?.message);
          if (!data?.data.schoolCredentials.isProfileCompleted) {
            router.push("/dashboard/complete-profile");
          } else if (!data?.data?.schoolCredentials?.isEmailVerified) {
            requestOtpMutaion({ email: formikProps.values.email });
            router.push(`/verify-email/${formikProps.values.email}`);
          } else {
            router.push(`/dashboard`);
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <LoginAndSignupParent
        isLoading={isLoading}
        formikProps={formikProps}
        showPwd={showPwd}
        login
        btnText="Login"
        accountQuestionText="Don't have an account?"
        accountActionText="signup"
        handleRightIconPress={handleRightIconPress}
        link="login"
      />

      <ModalOverlay open={open} handleClose={handleClose}>
        {error?.status === "FETCH_ERROR" ? (
          <AppError
            title="Warning"
            message={error?.error}
            handleClose={handleClose}
          />
        ) : (
          <AppError
            title="Warning"
            message={error?.data?.message}
            handleClose={handleClose}
          />
        )}
      </ModalOverlay>
    </>
  );
}
