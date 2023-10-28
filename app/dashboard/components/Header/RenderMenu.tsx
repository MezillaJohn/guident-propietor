import { Badge, IconButton, Menu, Stack, Typography } from "@mui/material";
import ProfileMenuDesktop from "./ProfileMenuDesktop";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { COLORS } from "@/app/constants/color";
import { AccountCircle } from "@mui/icons-material";

export const renderDesktopMenu = (
  anchorEl: null | HTMLElement,
  isMenuOpen: boolean,
  handleMenuSelected: (arg: string) => void,
  menuId: string
) => {
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuSelected}
    >
      <ProfileMenuDesktop handleMenuSelected={handleMenuSelected} />
    </Menu>
  );

  return renderMenu;
};

export const renderMobileMenuItems = (
  handleProfileMenuOpen: (arg: React.MouseEvent<HTMLElement>) => void,
  mobileMoreAnchorEl: null | HTMLElement,
  mobileMenuId: string,
  isMobileMenuOpen: boolean,
  handleMobileMenuClose: (arg: string) => void
) => {
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        pr={3}
        sx={{
          borderBottomWidth: "1px",
          borderBottomColor: COLORS.grayTwo,
          cursor: "pointer",
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneOutlinedIcon
              sx={{ width: 18, height: 18, color: COLORS.grayOne }}
            />
          </Badge>
        </IconButton>
        <Typography fontSize="1.4rem" color={COLORS.darkFour}>
          Notifications
        </Typography>
      </Stack>
      <Stack
        flexDirection="row"
        alignItems="center"
        pr={3}
        sx={{ cursor: "pointer" }}
        onClick={handleProfileMenuOpen}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle
            sx={{ width: 18, height: 18, color: COLORS.grayOne }}
          />
        </IconButton>
        <Typography fontSize="1.4rem" color={COLORS.darkFour}>
          Profile
        </Typography>
      </Stack>
    </Menu>
  );

  return renderMobileMenu;
};
