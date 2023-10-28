import React, { ReactNode } from "react";
import CircularProgressSpinner from "../LoadingSpinner/LoadingSpinner";

interface Props {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
}

const PrimaryButton = ({
  children,
  onClick,
  disabled,
  isProcessing,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        isProcessing ? "bg-primary" : disabled ? "bg-grayTwo" : "bg-primary"
      }  w-full p-[1.2rem] rounded-[.5rem]  text-[1.4rem] md:text-[1.6rem] text-tertiary shadow-lg`}
    >
      {isProcessing ? <CircularProgressSpinner /> : children}
    </button>
  );
};

export default PrimaryButton;
