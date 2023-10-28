import OutlinedInput from "@/app/components/OutlinedInput/OutlinedInput";
import { COLORS } from "@/app/constants/color";
import { FormikProps } from "formik";
import React from "react";
import { MdOutlineSchool } from "react-icons/md";
import { PiTrademarkRegistered } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

const ContactInfo = ({
  contactFormikProps,
}: {
  contactFormikProps: FormikProps<any>;
}) => {
  return (
    <form>
      <OutlinedInput
        leftIcon={
          <MdOutlineSchool
            size={20}
            color={
              contactFormikProps.touched.schoolName &&
              contactFormikProps.errors.schoolName
                ? COLORS.danger
                : COLORS.grayThree
            }
          />
        }
        type="text"
        label="First Name"
        labelStyle="text-[1.4rem] md:text-[1.6rem] mb-[1.4rem]"
        isRequired
        formikProps={contactFormikProps}
        inputKey="firstName"
        placeholder="Your first name"
        marginBottom="mb-[3rem]"
      />

      <OutlinedInput
        leftIcon={
          <SlLocationPin
            size={20}
            color={
              contactFormikProps.touched.schoolAddress &&
              contactFormikProps.errors.schoolAddress
                ? COLORS.danger
                : COLORS.grayThree
            }
          />
        }
        type="text"
        label="Last Name"
        labelStyle="text-[1.4rem] md:text-[1.6rem] mb-[1.4rem]"
        isRequired
        formikProps={contactFormikProps}
        inputKey="lastName"
        placeholder="Your last name"
        marginBottom="mb-[3rem]"
      />

      <OutlinedInput
        leftIcon={
          <PiTrademarkRegistered
            size={20}
            color={
              contactFormikProps.touched.rcNumber &&
              contactFormikProps.errors.rcNumber
                ? COLORS.danger
                : COLORS.grayThree
            }
          />
        }
        type="text"
        inputMode="numeric"
        label="Phone"
        labelStyle="text-[1.4rem] md:text-[1.6rem] mb-[1.4rem]"
        isRequired
        formikProps={contactFormikProps}
        inputKey="phone"
        placeholder="Your active contact number"
        marginBottom="mb-[3rem]"
      />

      <OutlinedInput
        leftIcon={
          <PiTrademarkRegistered
            size={20}
            color={
              contactFormikProps.touched.rcNumber &&
              contactFormikProps.errors.rcNumber
                ? COLORS.danger
                : COLORS.grayThree
            }
          />
        }
        type="text"
        label="Contact Person's Position"
        labelStyle="text-[1.4rem] md:text-[1.6rem] mb-[1.4rem]"
        isRequired
        formikProps={contactFormikProps}
        inputKey="position"
        placeholder="Position"
        marginBottom="mb-[3rem]"
      />
    </form>
  );
};

export default ContactInfo;
