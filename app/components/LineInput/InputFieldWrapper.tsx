import React from "react";

const InputFieldWrapper = ({
  label,
  isRequired,
  children,
  formikProps,
  inputKey,
  marginBottom,
  labelStyle,
}: any) => {
  return (
    <div className={`${marginBottom ? marginBottom : "mb-[3rem]"}`}>
      <div className="flex justify-start items-start">
        {label && (
          <p
            className={
              labelStyle ? labelStyle : "text-dark font-medium text-[1.4rem]"
            }
          >
            {label}
          </p>
        )}
        {isRequired && <p className="text-danger text-[1.6rem] ml-1">*</p>}
      </div>
      {children}
      <p className="text-[13px] text-danger mt-[5px] mb-[12px] leading-[20px]">
        {formikProps.touched[inputKey] && formikProps.errors[inputKey] && (
          <span className="text-[12px] text-danger mt-[5px] mb-[12px] leading-[20px]">
            {formikProps.errors[inputKey]}
          </span>
        )}
      </p>
    </div>
  );
};

export default InputFieldWrapper;
