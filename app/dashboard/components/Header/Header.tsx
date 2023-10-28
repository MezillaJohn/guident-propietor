import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreIcon from "@mui/icons-material/MoreVert";
import { COLORS } from "@/app/constants/color";
import { Stack } from "@mui/material";
import { renderDesktopMenu, renderMobileMenuItems } from "./RenderMenu";
import Image from "next/image";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({
  isMenuShow,
  setIsMenuShow,
}: {
  isMenuShow: boolean;
  setIsMenuShow: (state: boolean) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuSelected = (arg: string) => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        className="py-[.5rem] shadow-lg bg-tertiary w-full"
        position="static"
      >
        <Toolbar>
          <div className="md:hidden block">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setIsMenuShow(true)}
            >
              <MenuIcon
                sx={{ width: 22, height: 22, color: COLORS.darkFour }}
              />
            </IconButton>
          </div>

          <Search
            sx={{
              borderColor: COLORS.grayTwo,
              borderWidth: "1px",
              flexGrow: 1,
              height: "4rem",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon
                sx={{ color: COLORS.grayOne, width: 20, height: 20 }}
              />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ width: "100%", height: "100%", fontSize: "1.6rem" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsNoneOutlinedIcon
                  sx={{ color: COLORS.grayOne, width: 22, height: 22 }}
                />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
              disableRipple={true}
            >
              <Image
                alt="profile image"
                src="/images/child.png"
                width={20}
                height={20}
                style={{width: 'auto', height: 'auto'}}
              />

              <Stack
                flexDirection="row"
                alignItems="center"
                columnGap={1}
                ml={1.3}
              >
                <Typography sx={{ fontSize: "1.6rem" }}>Mary Jones</Typography>
                <KeyboardArrowDownIcon
                  sx={{ width: 25, height: 25, color: COLORS.grayOne }}
                />
              </Stack>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon
                sx={{ width: 22, height: 22, color: COLORS.darkFour }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
      {renderMobileMenuItems(
        handleProfileMenuOpen,
        mobileMoreAnchorEl,
        mobileMenuId,
        isMobileMenuOpen,
        handleMobileMenuClose
      )}
      {renderDesktopMenu(anchorEl, isMenuOpen, handleMenuSelected, menuId)}
    </Box>
  );
}
