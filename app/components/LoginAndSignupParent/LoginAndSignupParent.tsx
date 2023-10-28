import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { FormikProps } from "formik";
import LineInput from "../LineInput/LineInput";
import { COLORS } from "@/app/constants/color";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineEye,
} from "react-icons/ai";

interface Props {
  formikProps: FormikProps<any>;
  isLoading: boolean;
  btnText: string;
  accountQuestionText: string;
  accountActionText: string;
  showPwd: boolean;
  handleRightIconPress: () => void;
  signup?: boolean;
  login?: boolean;
  link: string;
}

const LoginAndSignupParent = ({
  formikProps,
  isLoading,
  btnText,
  accountActionText,
  accountQuestionText,
  showPwd,
  handleRightIconPress,
  signup,
  login,
  link,
}: Props) => {
  return (
    <div
      style={{ overflowX: "hidden" }}
      className="w-screen  min-h-screen bg-whiteOne overflow-y-auto  overflow-x-hidden py-0 md:py-[3rem] bg-center bg-cover flex items-center justify-center"
    >
      <div className="absolute top-14 left-14  hidden lg:block">
        <Image
          src="/images/guident-logo.svg"
          width={150}
          height={150}
          alt="Picture of the author"
          priority={true}
        />
      </div>

      <div className="max-w-[500px] w-full min-h-[100vh]   md:min-h-[70vh]  bg-tertiary rounded-lg  shadow-lg">
        <div className="relative bg-[url('/images/children.jpg')] bg-cover bg-center h-[18rem] w-full rounded-t-lg">
          <div className="absolute bg-transaparentDark left-0 top-0 right-0 backdrop-blur-[.2rem]  w-full h-full">
            <div className="pt-[6rem] px-[2rem]">
              <p className="text-tertiary text-[2.2rem] md:text-[2.4rem] font-semibold">
                Create your account
              </p>
              <p className="text-tertiary text-[1.4rem] ">
                Unleash your potential with Guident
              </p>
            </div>
          </div>
        </div>
        <form
          className="p-[20px] pt-[3.5rem] md:pt-[3rem]"
          onSubmit={formikProps.handleSubmit}
        >
          <LineInput
            leftIcon={
              <HiOutlineMail
                size={20}
                color={
                  formikProps.touched.email && formikProps.errors.email
                    ? COLORS.danger
                    : COLORS.grayOne
                }
              />
            }
            type="email"
            label="Email"
            isRequired
            formikProps={formikProps}
            inputKey="email"
            placeholder="Type your email here"
          />

          <LineInput
            leftIcon={
              <AiOutlineLock
                size={20}
                color={
                  formikProps.touched.email && formikProps.errors.email
                    ? COLORS.danger
                    : COLORS.grayOne
                }
              />
            }
            rightIcon={
              showPwd ? (
                <AiOutlineEye size={20} color={COLORS.grayOne} />
              ) : (
                <AiOutlineEyeInvisible size={20} color={COLORS.grayOne} />
              )
            }
            handleRightIconPress={handleRightIconPress}
            type={showPwd ? "text" : "password"}
            label="Password"
            isRequired
            formikProps={formikProps}
            inputKey="password"
            placeholder="Your password"
          />

          {signup && (
            <LineInput
              leftIcon={
                <AiOutlineLock
                  size={20}
                  color={
                    formikProps.touched.email && formikProps.errors.email
                      ? COLORS.danger
                      : COLORS.grayOne
                  }
                />
              }
              rightIcon={
                showPwd ? (
                  <AiOutlineEye size={20} color={COLORS.grayOne} />
                ) : (
                  <AiOutlineEyeInvisible size={20} color={COLORS.grayOne} />
                )
              }
              handleRightIconPress={handleRightIconPress}
              type={showPwd ? "text" : "password"}
              label="Confirm Password"
              isRequired
              formikProps={formikProps}
              inputKey="confirmPassword"
              placeholder="Confirm your password"
              marginBottom="mb-[2rem]"
            />
          )}

          {login && (
            <div className="text-primary text-[1.2rem] text-right cursor-pointer mt-[-2rem]">
              Forget password
            </div>
          )}
          <div className="mt-[4rem]">
            <PrimaryButton
              isProcessing={isLoading}
              disabled={isLoading || !formikProps.isValid}
              onClick={formikProps.handleSubmit}
            >
              {btnText}
            </PrimaryButton>
          </div>

          <p className="text-[1.4rem] text-center mt-[3rem]">
            <span className="text-dark">{accountQuestionText}</span>
            <span className="text-primary cursor-pointer">
              {login && <Link href="/signup"> {accountActionText}</Link>}
              {signup && <Link href="/login"> {accountActionText}</Link>}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAndSignupParent;
