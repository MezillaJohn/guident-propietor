"use client";

import { COLORS } from "@/app/constants/color";
import React from "react";

interface Props {
  otp: string[];
  inputRef: any;
  handleChange: (index: number, value: string) => void;
  handleKeyPress: (
    index: number,
    value: React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

export default function OtpInputCom({
  otp,
  handleChange,
  inputRef,
  handleKeyPress,
}: Props) {
  return (
    <>
      {otp.map((digit, index) => (
        <input
          key={index}
          value={digit}
          ref={(ref) => (inputRef.current[index] = ref)}
          onChange={(e) => handleChange(index, e.target.value)}
          maxLength={1}
          onKeyUp={(event) => handleKeyPress(index, event)}
          style={{
            height: "6vh",
            width: "5vh",
            fontSize: "2rem",
            borderRadius: 10,
            color: COLORS.dark,
            borderColor: COLORS.dark,
            borderWidth: 1,
            outlineColor: COLORS.primary,
            outlineWidth: 1,
            marginRight: index !== 5 ? 10 : 0,
            textAlign: "center",
          }}
        />
      ))}
    </>
  );
}
