import { AiOutlineHome } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { BiBookAlt } from "react-icons/bi";
import { BsPeople, BsPencil } from "react-icons/bs";
import { MdManageSearch } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { COLORS } from "./color";

export const SIDEBARLISTITEMS = [
  {
    id: "1",
    title: "Dashboard",
    icon: <AiOutlineHome size={23} color={COLORS.grayOne} />,
    iconPrimary: <AiOutlineHome size={23} color={COLORS.primaryDark} />,
    link: "/dashboard",
  },

  {
    id: "2",
    title: "Result",
    icon: <PiBookOpenTextLight size={23} color={COLORS.grayOne} />,
    iconPrimary: <PiBookOpenTextLight size={23} color={COLORS.primaryDark} />,
    link: "/dashboard/result",
    subMenu: [
      {
        id: "1b",
        title: "Manage Result",
        subIcon: <LuFileSpreadsheet size={14} color={COLORS.grayOne} />,
        subIconPrimary: <LuFileSpreadsheet size={14} color={COLORS.primary} />,
        link: "/dashboard/result/manage-result",
      },
      {
        id: "2b",
        title: "Manage Behaviour",
        subIcon: <MdManageSearch size={18} color={COLORS.grayOne} />,
        subIconPrimary: <MdManageSearch size={18} color={COLORS.primary} />,
        link: "/dashboard/result/manage-behaviour",
      },
      {
        id: "3b",
        title: "Manage Attendance",
        subIcon: <BsPeople size={14} color={COLORS.grayOne} />,
        subIconPrimary: <BsPeople size={14} color={COLORS.primary} />,
        link: "/dashboard/result/manage-attendance",
      },
    ],
  },

  {
    id: "3",
    title: "Records",
    icon: <AiOutlineFolderOpen size={23} color={COLORS.grayOne} />,
    iconPrimary: <AiOutlineFolderOpen size={23} color={COLORS.primaryDark} />,
    link: "/dashboard/records",
  },

  {
    id: "4",
    title: "Manage Students",
    icon: <PiStudent size={23} color={COLORS.grayOne} />,
    iconPrimary: <PiStudent size={23} color={COLORS.primaryDark} />,
    link: "/dashboard/manage-students",
  },

  {
    id: "5",
    title: "Manage Class",
    icon: <BsPencil size={23} color={COLORS.grayOne} />,
    iconPrimary: <BsPencil size={23} color={COLORS.primaryDark} />,
    link: "/dashboard/manage-class",
    subMenu: [
      {
        id: "1c",
        title: "Create Class / Subject",
        subIcon: <BiBookAlt size={14} color={COLORS.grayOne} />,
        subIconPrimary: <BiBookAlt size={14} color={COLORS.primary} />,
        link: "/dashboard/manage-class/create-class",
      },

      {
        id: "2c",
        title: "Academic Session",
        subIcon: <SlCalender size={14} color={COLORS.grayOne} />,
        subIconPrimary: <SlCalender size={14} color={COLORS.primary} />,
        link: "/dashboard/manage-class/academic-session",
      },
    ],
  },

  {
    id: "6",
    title: "Financials",
    icon: <GiMoneyStack size={23} color={COLORS.grayOne} />,
    iconPrimary: <GiMoneyStack size={23} color={COLORS.primaryDark} />,
    link: "/dashboard/financials",
  },
];
