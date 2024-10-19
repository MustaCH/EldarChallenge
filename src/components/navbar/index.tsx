import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../routes";
import { RootState } from "../../redux/store";

interface NavBarProps {
  isAuthorized: boolean;
}

export default function NavBar({ isAuthorized }: NavBarProps) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert("Cerrando sesión");
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      className="bg-[#64af99]"
    >
      <ul className="flex flex-row items-center gap-12 list-none ">
        <li>
          <Link to={"/"} className="no-underline">
            <Typography className="text-[#0f241f] hover:text-[#f3faf7] duration-300 font-semibold">
              Home
            </Typography>
          </Link>
        </li>
        <li>
          <Link to={"/posts"} className="no-underline">
            <Typography className="text-[#0f241f] hover:text-[#f3faf7] duration-300 font-semibold">
              Posts
            </Typography>
          </Link>
        </li>
        <li>
          <Link to={"/albums"} className="no-underline">
            <Typography className="text-[#0f241f] hover:text-[#f3faf7] duration-300 font-semibold">
              Albums
            </Typography>
          </Link>
        </li>
        {isAuthorized && (
          <li className="bg-[#3e8e78] hover:bg-[#307160] duration-300 px-4 py-1 rounded-md">
            <Link to={"/backoffice"} className="no-underline ">
              <Typography className="font-semibold text-[#f3faf7] ">
                Backoffice
              </Typography>
            </Link>
          </li>
        )}
      </ul>
      <Button className="text-[#f3faf7]" onClick={handleLogout}>
        CERRAR SESIÓN
      </Button>
    </Stack>
  );
}
