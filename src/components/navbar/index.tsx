import {
  Button,
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

interface NavBarProps {
  isAuthorized: boolean;
}

export default function NavBar({ isAuthorized }: NavBarProps) {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleLogout = () => {
    dispatch(logout());
    alert("Cerrando sesión");
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuItems = (
    <>
      <ListItem component={Link} to="/">
        <ListItemText
          primary="Home"
          className="hover:text-[#0f241f] text-[#f3faf7] duration-300"
        />
      </ListItem>
      <ListItem component={Link} to="/posts">
        <ListItemText
          primary="Posts"
          className="hover:text-[#0f241f] text-[#f3faf7] duration-300"
        />
      </ListItem>
      <ListItem component={Link} to="/albums">
        <ListItemText
          primary="Albums"
          className="hover:text-[#0f241f] text-[#f3faf7] duration-300"
        />
      </ListItem>
      {isAuthorized && (
        <ListItem
          component={Link}
          to="/backoffice"
          className="bg-[#3e8e78] hover:bg-[#307160] duration-300 px-4 py-1 rounded-md"
        >
          <ListItemText primary="Backoffice" className=" text-[#f3faf7] " />
        </ListItem>
      )}
    </>
  );

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      className="bg-[#64af99]"
      alignItems="center"
      height={{ xs: "4rem", md: "6rem" }}
      paddingX={2}
    >
      {isMobile ? (
        <>
          <IconButton onClick={toggleDrawer(true)} edge="start">
            <MenuIcon className="text-3xl text-white" />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                backgroundColor: "#64af99",
                color: "#0f241f",
                width: 250,
              },
            }}
          >
            <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              {menuItems}
            </List>
          </Drawer>
        </>
      ) : (
        <List className="flex flex-row items-center gap-12 list-none">
          {menuItems}
        </List>
      )}
      <Button
        className="flex justify-end text-[#f3faf7] p-0"
        onClick={handleLogout}
      >
        <LogoutIcon />
      </Button>
    </Stack>
  );
}
