"use client";
import { FormikProps } from "formik";
import InputFieldWrapper from "./InputFieldWrapper";
import { useState } from "react";

interface Props {
  formikProps: FormikProps<any>;
  type: string;
  inputKey: string;
  placeholder: string;
  leftIcon: JSX.Element;
  rightIcon?: JSX.Element;
  label?: string;
  isRequired?: boolean;
  marginBottom?: string;
  handleRightIconPress?: () => void;
}

const LineInput = ({
  formikProps,
  type,
  inputKey,
  placeholder,
  leftIcon,
  rightIcon,
  label,
  isRequired,
  marginBottom,
  handleRightIconPress,
  ...others
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <InputFieldWrapper
      marginBottom={marginBottom}
      label={label}
      isRequired={isRequired}
      formikProps={formikProps}
      inputKey={inputKey}
    >
      <div
        className={`flex justify-between items-center w-full ${
          formikProps.touched[inputKey] && formikProps.errors[inputKey]
            ? "border-danger"
            : isFocused
            ? "border-primary"
            : "border-grayOne"
        } border-b-[1px] pb-5`}
      >
        <div>{leftIcon}</div>
        <input
          className="flex-1 pl-5 text-[1.4rem] outline-none"
          onChange={formikProps.handleChange(inputKey)}
          onBlur={formikProps.handleBlur(inputKey)}
          onFocus={() => {
            setIsFocused(true);
          }}
          type={type}
          placeholder={placeholder}
          value={formikProps.values[inputKey]}
          {...others}
        />
        <div onClick={handleRightIconPress}>{rightIcon}</div>
      </div>
    </InputFieldWrapper>
  );
};

export default LineInput;
