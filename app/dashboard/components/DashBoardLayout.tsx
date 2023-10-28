"use client";

import React, { ReactNode, useState } from "react";
import SideBar from "./SideBar";
import { Box } from "@mui/material";
import Header from "./Header/Header";

const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  return (
    <div className="flex w-screen overflow-hidden  bg-whiteOne">
      <div className=" md:w-[35%] lg:w-[21%] w-0 min-h-screen relative z-[1112222222]">
        <div className="min-h-screen hidden md:block">
          <SideBar setIsMenuShow={setIsMenuShow} isMenuShow={isMenuShow} />
        </div>
        <div
          className={`block md:hidden absolute ${
            isMenuShow
              ? "w-[25.5rem] transition-display duration-300 ease-in-out"
              : "w-0 overflow-hidden transition-display duration-300 ease-in-out"
          }`}
        >
          <SideBar
            isMobile
            setIsMenuShow={setIsMenuShow}
            isMenuShow={isMenuShow}
          />
        </div>
      </div>

      <div className="w-[100%] md:w-[75%] lg:w-[79%] overflow-y-auto h-screen relative">
        {isMenuShow && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,.2)",
              height: "100vh",
              zIndex: 999,
            }}
          >
            dgd
          </Box>
        )}
        <Header isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />
        <div className="p-[1.5rem] md:p-[3rem] min-h-full w-full bg-[#F8F8F8]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
