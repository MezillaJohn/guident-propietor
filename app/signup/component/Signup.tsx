"use client";
import { useFormik } from "formik";
import * as yup from "yup";

import { useState, useEffect, useCallback } from "react";
import { useSignupMutation } from "@/app/redux/apis/unAuthenticatedApis/unAuthenticatedApis";
import { useRouter } from "next/navigation";
import AppError from "@/app/components/Error/AppError";
import toast from "react-hot-toast";
import ModalOverlay from "@/app/components/Modal/Modal";
import LoginAndSignupParent from "@/app/components/LoginAndSignupParent/LoginAndSignupParent";

export default function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  const [signUpMutation, { isLoading, error, isSuccess, data }]: any =
    useSignupMutation();

  const handleRightIconPress = () => {
    setShowPwd((state) => !state);
  };

  const notify = useCallback(() => toast.success(data?.message), [data]);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleSignup = (password: string, email: string) => {
    signUpMutation({ email, password });
  };

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .label("Password")
      .required()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase, one lowercase, a number and a special character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    email: yup.string().label("Email").email().required(),
  });

  const formikProps = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      email: "",
    },
    onSubmit: (values) => {
      handleSignup(values.password, values.email);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    if (isSuccess) {
      notify();
      router.push(`/verify-email/${formikProps.values.email}`);
    }
  }, [isSuccess, router, notify, formikProps.values.email]);

  return (
    <>
      <LoginAndSignupParent
        isLoading={isLoading}
        formikProps={formikProps}
        showPwd={showPwd}
        signup
        btnText="Signup"
        accountQuestionText="Have an account?"
        accountActionText="login"
        handleRightIconPress={handleRightIconPress}
        link="signup"
      />

      <ModalOverlay open={open} handleClose={handleClose}>
        {error?.status === 400 ? (
          <AppError
            title="Warning"
            message={error?.data?.message}
            handleClose={handleClose}
          />
        ) : (
          <AppError title="" message="" handleClose={handleClose} />
        )}
      </ModalOverlay>
    </>
  );
}
