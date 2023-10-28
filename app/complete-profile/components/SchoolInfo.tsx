import OutlinedInput from "@/app/components/OutlinedInput/OutlinedInput";
import { COLORS } from "@/app/constants/color";
import { FormikProps } from "formik";
import { MdOutlineSchool } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { PiTrademarkRegistered } from "react-icons/pi";

const SchoolInfo = ({ formikProps }: { formikProps: FormikProps<any> }) => {
  return (
    <form>
      <OutlinedInput
        leftIcon={
          <MdOutlineSchool
            size={20}
            color={
              formikProps.touched.schoolName && formikProps.errors.schoolName
                ? COLORS.danger
                : COLORS.grayThree
            }
          />
        }
        type="text"
        label="School Name"
        labelStyle="text-[1.4rem] md:text-[1.6rem] mb-[1.4rem]"
        isRequired
        formikProps={formikProps}
        inputKey="schoolName"
        placeholder="Type your school name here"
        marginBottom="mb-[3rem]"
      />

      <OutlinedInput
        leftIcon={
          <SlLocationPin
            size={20}
            color={
              formikProps.touched.schoolAddress &&
              formikProps.errors.schoolAddress
                ? COLORS.danger
                : COLORS.grayThree
            }
          />
        }
        type="text"
        label="School Address"
        labelStyle="text-[1.4rem] md:text-[1.6rem] mb-[1.4rem]"
        isRequired
        formikProps={formikProps}
        inputKey="schoolAddress"
        placeholder="Type your school address here"
        marginBottom="mb-[3rem]"
      />

      <OutlinedInput
        leftIcon={
          <PiTrademarkRegistered
            size={20}
            color={
              formikProps.touched.rcNumber && formikProps.errors.rcNumber
                ? COLORS.danger
                : COLORS.grayThree
            }
          />
        }
        type="text"
        label="RC Number"
        labelStyle="text-[1.4rem] md:text-[1.6rem] mb-[1.4rem]"
        isRequired
        formikProps={formikProps}
        inputKey="rcNumber"
        placeholder="Type your email here"
        marginBottom="mb-[3rem]"
        inputMode="numeric"
      />
    </form>
  );
};

export default SchoolInfo;
