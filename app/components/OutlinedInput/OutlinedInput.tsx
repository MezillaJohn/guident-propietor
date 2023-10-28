"use client";
import { FormikProps } from "formik";
import { useState } from "react";
import InputFieldWrapper from "../LineInput/InputFieldWrapper";

interface Props {
  formikProps: FormikProps<any>;
  type: string;
  inputKey: string;
  inputMode?:"search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
  placeholder: string;
  leftIcon: JSX.Element;
  rightIcon?: JSX.Element;
  label?: string;
  isRequired?: boolean;
  marginBottom?: string;
  labelStyle?: string;
  handleRightIconPress?: () => void;
}

const OutlinedInput = ({
  formikProps,
  type,
  inputKey,
  placeholder,
  leftIcon,
  rightIcon,
  label,
  labelStyle,
  isRequired,
  marginBottom,
  inputMode,
  handleRightIconPress,
  ...others
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <InputFieldWrapper
      marginBottom={marginBottom}
      label={label}
      labelStyle={labelStyle}
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
            : "border-grayTwo"
        } border-[1px] h-[5rem] px-2 rounded-lg`}
      >
        <div>{leftIcon}</div>
        <input
        inputMode={inputMode}
          className="flex-1 pl-5 text-[1.4rem] h-full outline-none"
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

export default OutlinedInput;
