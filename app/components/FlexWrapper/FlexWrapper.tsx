import React, { ReactNode } from "react";

const FlexWrapper = ({
  children,
  justifyContent,
  alignItem,
}: {
  children: ReactNode;
  justifyContent?: string;
  alignItem?: string;
}) => {
  return (
    <div
      className={` flex ${justifyContent ? justifyContent : "justify-center"} ${
        alignItem ? alignItem : "items-center"
      }`}
    >
      {children}
    </div>
  );
};

export default FlexWrapper;
