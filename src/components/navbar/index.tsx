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
    <Stack direction={"row"} justifyContent={"space-between"}>
      <ul className="flex flex-row items-center gap-12 list-none">
        <li>
          <Link to={"/"} className="no-underline">
            <Typography>Home</Typography>
          </Link>
        </li>
        <li>
          <Link to={"/posts"} className="no-underline">
            <Typography>Posts</Typography>
          </Link>
        </li>
        <li>
          <Link to={"/albums"} className="no-underline">
            <Typography>Albums</Typography>
          </Link>
        </li>
        {isAuthorized && (
          <li className="bg-sky-400 hover:bg-transparent px-4 py-1 rounded-md group">
            <Link to={"/backoffice"} className="no-underline ">
              <Typography className="font-semibold text-neutral-100 group-hover:text-black duration-300">
                Backoffice
              </Typography>
            </Link>
          </li>
        )}
      </ul>
      <Button onClick={handleLogout}>Logout</Button>
    </Stack>
  );
}
