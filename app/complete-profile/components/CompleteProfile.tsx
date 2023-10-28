"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CgBorderStyleSolid } from "react-icons/cg";
import Image from "next/image";

import PrimaryButton from "@/app/components/PrimaryButton/PrimaryButton";
import { getLocalStorage } from "@/app/helpers/storage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ModalOverlay from "@/app/components/Modal/Modal";
import AppError from "@/app/components/Error/AppError";
import { useOnBoardingMutation } from "@/app/redux/apis/unAuthenticatedApis/unAuthenticatedApis";
import SchoolInfo from "./SchoolInfo";
import SchoolLogo from "./SchoolLogo";
import ContactInfo from "./ContactInfo";

const CompleteProfile = () => {
  const [page, setPage] = useState(0);
  const [image, setImage] = useState("/svgs/profileIcon.svg");
  const [schoolLogo, setSchoolLogo] = useState("");
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [completeProfileMutation, { isLoading, error }]: any =
    useOnBoardingMutation();

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const school_id = getLocalStorage("school_id");
  const school_token = getLocalStorage("school_token");

  const router = useRouter();

  const FormTitles = [
    "School Information",
    "School's Logo",
    "Contact Person Information",
  ];

  // form validation
  const schoolInfoValidationSchema = yup.object().shape({
    schoolName: yup.string().label("School name").required(),
    schoolAddress: yup.string().label("School address").required(),
    rcNumber: yup.number().label("School Name").required(),
  });
  const contactValidationSchema = yup.object().shape({
    firstName: yup.string().label("First name").required(),
    lastName: yup.string().label("Last name").required(),
    phone: yup.string().label("Phone number").required(),
    position: yup.string().label("This").required(),
  });

  const formikProps = useFormik({
    initialValues: {
      schoolName: "",
      schoolAddress: "",
      rcNumber: "",
    },
    onSubmit: (values) => {
      handlePageChangeIncrement();
    },
    validationSchema: schoolInfoValidationSchema,
    validateOnMount: true,
  });

  /////////////////////////////////////

  const contactFormikProps = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      position: "",
    },
    onSubmit: (values) => {
      handleCompleteProfile();
    },
    validationSchema: contactValidationSchema,
    validateOnMount: true,
  });
  // form validation end

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompleteProfile = () => {
    try {
      const completeProfileSentData = {
        schoolName: formikProps.values.schoolName,
        schoolAddress: formikProps.values.schoolAddress,
        rcNumber: formikProps.values.rcNumber,
        firstName: contactFormikProps.values.firstName,
        lastName: contactFormikProps.values.lastName,
        phoneNumber: contactFormikProps.values.phone,
        adminPosition: contactFormikProps.values.position,
      };

      completeProfileMutation(completeProfileSentData)
        .then((data: any) => {
          if (!data?.error) {
            toast.success("Profile completed");
            router.push("/dashboard");
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChangeIncrement = () => {
    if (formikProps.isValid) {
      if (page === 1) {
        try {
          const formD = new FormData();
          formD.append("image", schoolLogo);
          ///////////////////////////////////////
          setIsUploading(true);
          fetch(
            `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/profile/${school_id}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${school_token}`,
              },
              body: formD,
            }
          )
            .then((json) => json.json())
            .then((res) => {
              console.log(res);
              if (!res) {
                toast.success("Error uploading profile picture");
                return;
              } else {
                toast.success(res?.message);
                setPage((currPage) => currPage + 1);
              }
              setIsUploading(false);
            });
        } catch (error) {
          console.log(error);
        }

        return;
      }

      setPage((currPage) => currPage + 1);
    }
  };

  const handlePageChangeDecrement = () => setPage((currPage) => currPage - 1);

  const updateSchoolLogo = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSchoolLogo(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <SchoolInfo formikProps={formikProps} />;
    } else if (page === 1) {
      return <SchoolLogo image={image} updateSchoolLogo={updateSchoolLogo} />;
    } else {
      return <ContactInfo contactFormikProps={contactFormikProps} />;
    }
  };

  return (
    <>
      <div className="flex items-center w-screen h-screen overflow-x-hidden overflow-y-hidden">
        <div className=" hidden md:block md:w-[35rem] lg:w-[50rem] min-h-screen bg-primary relative ">
          <div className="bg-primaryTransaparent absolute top-0 left-0 right-0 bottom-0"></div>
          <Image
            alt="guident"
            src="/images/child.png"
            width={560}
            height={800}
            priority={true}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="top-[50%] left-[50%] absolute -translate-x-1/2 -translate-y-1/2">
            <Image
              src={"/svgs/parentChildIcon.svg"}
              alt="icon"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        <div className=" flex-auto  px-[2rem] lg:px-[4rem] h-screen py-[4rem]  overflow-y-auto">
          <h1 className="text-[3rem] md:text-[3.6rem] lg:text-[5rem] font-bold ">
            Complete your profile
          </h1>
          <p className="text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] font-normal text-grayOne ">
            We need some more information from you
          </p>

          <div className="flex item-center">
            <CgBorderStyleSolid
              color={page === 0 ? "#ff7d33" : "#d9d99"}
              size={40}
            />
            <CgBorderStyleSolid
              color={page === 1 || page === 2 ? "#ff7d33" : "#d9d9d9"}
              size={40}
            />
            <CgBorderStyleSolid
              color={page === 2 ? "#ff7d33" : "#d9d9d9"}
              size={40}
            />
          </div>

          <div>
            <div className="font-semibold text-[2rem] md:text-[2.5rem] lg:text-[3rem] text-dark mb-[2rem]">
              {FormTitles[page]}
            </div>

            <div className="w-[100%] lg:w-[80%]">
              {PageDisplay()}
              <div className="mt-[6rem] flex items-center justify-between">
                <div className="w-[15rem]">
                  {page === 0 ? (
                    ""
                  ) : (
                    <PrimaryButton onClick={handlePageChangeDecrement}>
                      Prev
                    </PrimaryButton>
                  )}
                </div>
                <div className="w-[15rem]">
                  <PrimaryButton
                    isProcessing={page === 1 ? isUploading : isLoading}
                    onClick={
                      page === 2
                        ? contactFormikProps.handleSubmit
                        : formikProps.handleSubmit
                    }
                  >
                    {page === 2 ? "Submit" : "Next"}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalOverlay open={open} handleClose={handleClose}>
        {error?.originalStatus === 404 ? (
          <AppError
            title="Warning"
            message={error?.data}
            handleClose={handleClose}
          />
        ) : error?.status === 400 ? (
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
};

export default CompleteProfile;
