"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import OtpInputCom from "../../components/OtpInputCom/OtpInputCom";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useParams, useRouter } from "next/navigation";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";
import {
  useRequestOtpMutation,
  useVerifyEmailMutation,
} from "@/app/redux/apis/unAuthenticatedApis/unAuthenticatedApis";
import { CircularProgress, Stack } from "@mui/material";
import { COLORS } from "@/app/constants/color";
import AppError from "@/app/components/Error/AppError";
import ModalOverlay from "@/app/components/Modal/Modal";
import Image from "next/image";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [openRequestOtpErrorModal, setOpenRequestOtpErrorModal] =
    useState(false);
  const [openVerifyEmailErrorModal, setOpenVerifyEmailErrorModal] =
    useState(false);

  const inputRef = useRef<HTMLInputElement[]>([]);

  const router = useRouter();

  const params = useParams();

  const decodedEmail = decodeURIComponent(params.email as string);

  const handleRequestOtpErrorModalClose = () =>
    setOpenRequestOtpErrorModal(false);

  const handleVerifyEmailErrorModalClose = () =>
    setOpenVerifyEmailErrorModal(false);

  const [requestOtpMutation, { isLoading, error, isSuccess, data }]: any =
    useRequestOtpMutation();

  const [
    verifyEmailMutation,
    {
      isLoading: verifyEmailLoading,
      error: verifyEmailError,
      data: verifyEmailData,
      isSuccess: verifyEmailSuccess,
    },
  ]: any = useVerifyEmailMutation();

  useEffect(() => {
    if (error) {
      setOpenRequestOtpErrorModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isSuccess, data?.message]);

  useEffect(() => {
    if (verifyEmailError) {
      setOpenVerifyEmailErrorModal(true);
    }
  }, [verifyEmailError]);

  const notifySuccess = useCallback(
    (message: Renderable | ValueFunction<Renderable, Toast>) => {
      toast.success(message);
    },
    [toast]
  );

  // ... (rest of the code)

  useEffect(() => {
    if (verifyEmailSuccess) {
      notifySuccess(verifyEmailData?.message);
      router.push("/login");
    }
  }, [verifyEmailSuccess, router, verifyEmailData?.message, notifySuccess]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer as NodeJS.Timeout);
    };
  }, [seconds]);

  const handleChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleRequestOtp = () => {
    requestOtpMutation({ email: decodedEmail });
  };

  const handleVerifyOtp = () => {
    verifyEmailMutation({
      token: otp,
      email: decodedEmail,
    });
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full m-auto text-center mt-[5rem]">
        <div className="md:w-[20rem] w-[15rem]">
          <Image
            src="/svgs/emailverify-guident.svg"
            width={200}
            height={200}
            alt="email-guident"
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Stack mt={1}>
          {isLoading && (
            <CircularProgress size={30} sx={{ color: COLORS.primary }} />
          )}
        </Stack>
        <h2 className="text-[3rem] font-semibold text-left mt-[3rem] text-dark">
          Verify your email
        </h2>
        <p className="text-[1.6rem] text-grayOne font-medium mb-[3rem]">
          Please enter the 5-digit code sent to <br /> {decodedEmail}
        </p>
        <div className="flex">
          <OtpInputCom
            inputRef={inputRef}
            otp={otp}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
          />
        </div>

        {seconds > 0 && (
          <p className="mt-[2rem] text-grayOne"> Resend OTP in {seconds}s</p>
        )}
        <button
          onClick={handleRequestOtp}
          disabled={isLoading || seconds > 0}
          className={`text-[1.6rem] ${
            isLoading || seconds > 0 ? "text-grayThree" : "text-primary"
          } font-medium mt-[2rem]`}
        >
          Resend Code
        </button>
        <div className="w-[30%] m-auto mt-[3rem] mb-[3rem]">
          <PrimaryButton
            isProcessing={verifyEmailLoading}
            disabled={verifyEmailLoading || otp.length !== 5}
            onClick={handleVerifyOtp}
          >
            Verify
          </PrimaryButton>
        </div>
      </div>

      <ModalOverlay
        open={openRequestOtpErrorModal}
        handleClose={handleRequestOtpErrorModalClose}
      >
        <AppError
          title={error?.data?.name}
          message={error?.data?.message}
          handleClose={handleRequestOtpErrorModalClose}
        />
      </ModalOverlay>
      <ModalOverlay
        open={openVerifyEmailErrorModal}
        handleClose={handleVerifyEmailErrorModalClose}
      >
        <AppError
          title={verifyEmailError?.data?.error}
          message={verifyEmailError?.data?.message}
          handleClose={handleVerifyEmailErrorModalClose}
        />
      </ModalOverlay>
    </>
  );
};

export default VerifyEmail;
