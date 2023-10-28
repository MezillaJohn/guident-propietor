import { COLORS } from "@/app/constants/color";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Image from "next/image";
const menuStyle = {
  fontSize: "1.4rem",
  color: COLORS.grayOne,
};

const wrapperStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 1,
  cursor: "pointer",
};

const iconStyle = { color: COLORS.grayOne, width: 22, height: 22 };

const ProfileMenuDesktop = ({
  handleMenuSelected,
}: {
  handleMenuSelected: (arg: string) => void;
}) => {
  return (
    <Box sx={{}}>
      <Stack
        flexDirection="row"
        alignItems="center"
        columnGap={2}
        pb={1.5}
        sx={{
          borderBottomWidth: "1px",
          borderBottomColor: COLORS.grayTwo,
          paddingRight: 12,
          paddingLeft: 2,
        }}
      >
        <Image
          alt="profile image"
          src="/images/child.png"
          width={50}
          height={50}
          style={{ width: "auto", height: "auto" }}
        />
        <Box>
          <Typography fontSize="1.4rem" fontWeight="600">
            Mary Jones
          </Typography>
          <Typography fontSize="1.2rem" color={COLORS.grayOne}>
            Propietor
          </Typography>
        </Box>
      </Stack>
      <Stack
        py={1.5}
        sx={{
          paddingLeft: 2,
          borderBottomWidth: "1px",
          borderBottomColor: COLORS.grayTwo,
        }}
        rowGap={1}
      >
        <Stack
          sx={wrapperStyle}
          onClick={() => handleMenuSelected("View Profile")}
        >
          <NotificationsNoneOutlinedIcon sx={iconStyle} />
          <Typography sx={menuStyle}>View Profile</Typography>
        </Stack>

        <Stack onClick={() => handleMenuSelected("Settings")} sx={wrapperStyle}>
          <NotificationsNoneOutlinedIcon sx={iconStyle} />
          <Typography sx={menuStyle}>Settings</Typography>
        </Stack>

        <Stack
          onClick={() => handleMenuSelected("Switch Account")}
          sx={wrapperStyle}
        >
          <NotificationsNoneOutlinedIcon sx={iconStyle} />
          <Typography sx={menuStyle}>Switch Account</Typography>
        </Stack>
      </Stack>

      <Stack
        py={1.5}
        sx={{
          paddingLeft: 2,
        }}
        rowGap={1}
      >
        <Stack onClick={() => handleMenuSelected("Support")} sx={wrapperStyle}>
          <NotificationsNoneOutlinedIcon sx={iconStyle} />
          <Typography sx={menuStyle}>Support</Typography>
        </Stack>

        <Stack onClick={() => handleMenuSelected("About")} sx={wrapperStyle}>
          <NotificationsNoneOutlinedIcon sx={iconStyle} />
          <Typography sx={menuStyle}>About</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProfileMenuDesktop;
