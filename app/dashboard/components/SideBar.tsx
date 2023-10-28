"use client";

import { COLORS } from "@/app/constants/color";
import { SIDEBARLISTITEMS } from "@/app/constants/sidebarlist";
import { Stack } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { RiCloseLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import FlexWrapper from "@/app/components/FlexWrapper/FlexWrapper";

const SideBar = ({
  isMenuShow,
  setIsMenuShow,
  isMobile,
}: {
  isMenuShow: boolean;
  setIsMenuShow: (state: boolean) => void;
  isMobile?: boolean;
}) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const router = useRouter();

  const pathname = usePathname();

  const isCurrentRoute = (route: string) => pathname === route;

  const handleMenuItemClick = (items: any, index: any) => {
    if (!items.subMenu) {
      if (isMenuShow) {
        setIsMenuShow(false);
      }
      setOpenSubMenu(null);
      router.push(items.link);
    } else {
      if (openSubMenu === index) {
        setOpenSubMenu(null);
      } else {
        setOpenSubMenu(index);
      }
    }
    // Set the active menu item when a menu item is clicked
    setActiveMenuItem(index);
  };

  return (
    <div className="bg-tertiary overflow-y-auto h-screen shadow-xl pb-[6rem]">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        pt={{ xs: "2rem", md: "3rem" }}
        pb={{ xs: "2rem", md: "3rem" }}
        px={{ xs: "2rem", md: "3.5rem" }}
        sx={{
          borderBottomWidth: "1px",
          borderBottomColor: COLORS.grayTwo,
        }}
      >
        <div className="relative md:w-[17rem] w-[12rem] md:h-[4rem] h-[3rem]">
          <Image
            src={"/images/guident-logo.svg"}
            alt="logo"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
            priority={true}
          />
        </div>

        {isMobile && (
          <div onClick={() => setIsMenuShow(false)}>
            <RiCloseLine size={25} color={COLORS.dark} />
          </div>
        )}
      </Stack>

      <div className="pt-[2rem]">
        {SIDEBARLISTITEMS.map((items, index) => {
          const isSubMenuOpen = index === openSubMenu;
          const isActive = index === activeMenuItem; // Check if the menu item is active
          return (
            <div key={items.id}>
              <div
                onClick={() => handleMenuItemClick(items, index)}
                className={`md:px-[3.5rem] px-[2.5rem] ${
                  isCurrentRoute(items.link) || isActive
                    ? "bg-primaryOpac" // Apply 'bg-primary' if it's the current or active route
                    : "bg-transaparent"
                } py-[2rem] ${
                  index === 0
                    ? "my-0"
                    : isCurrentRoute(items.link) || isActive
                    ? "my-3 md:my-4"
                    : "my-6 md:my-8"
                } hover:bg-primaryLightTwo transition-colors`}
              >
                <div
                  className="flex justify-start items-center cursor-pointer"
                  key={index}
                >
                  {isCurrentRoute(items.link) ? items.iconPrimary : items.icon}
                  <p
                    className={`md:text-[1.8rem] text-[1.6rem] mx-6  ${
                      isCurrentRoute(items.link)
                        ? "text-primaryDark"
                        : "text-dark"
                    }`}
                  >
                    {items.title}
                  </p>
                  {items.subMenu &&
                    (isSubMenuOpen ? (
                      <IoIosArrowUp size={23} color={COLORS.grayOne} />
                    ) : (
                      <IoIosArrowDown size={23} color={COLORS.grayOne} />
                    ))}
                </div>
              </div>
              {items.subMenu && isSubMenuOpen && (
                <div className="mt-[1rem] md:px-[3.1rem] px-[2.5rem]">
                  {items.subMenu?.map((subItmes, subIndex) => {
                    return (
                      <div
                        key={subItmes.id}
                        onClick={() => {
                          router.push(subItmes.link);
                          setIsMenuShow(false);
                        }}
                        className={`flex items-center my-[1.2rem]`}
                      >
                        {isCurrentRoute(subItmes.link) ? (
                          <BiChevronRight size={22} color={COLORS.primary} />
                        ) : (
                          <BiChevronRight size={22} color={COLORS.grayOne} />
                        )}
                        <div className="flex items-center ml-[13.7px] cursor-pointer">
                          {isCurrentRoute(subItmes.link)
                            ? subItmes.subIconPrimary
                            : subItmes.subIcon}
                          <p
                            className={`ml-3 text-[1.3rem] ${
                              isCurrentRoute(subItmes.link)
                                ? "text-primary"
                                : "text-dark"
                            }`}
                          >
                            {subItmes.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div className="border-t-[1px]  border-t-grayTwo cursor-pointer pt-[3rem]">
          <div className=" px-[3.5rem] cursor-pointer">
            <FlexWrapper justifyContent="flex-start">
              <CiLogout size={20} color={COLORS.danger} />
              <p className={`md:text-[1.8rem] text-[1.6rem] ml-8  text-danger`}>
                {" "}
                Logout
              </p>
            </FlexWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
