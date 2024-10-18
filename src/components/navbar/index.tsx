import { Button, Stack } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert("Cerrando sesión");
  };
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <ul className="flex flex-row gap-12 list-none">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/analitycs"}>Analitycs</Link>
        </li>
      </ul>
      <Button onClick={handleLogout}>Logout</Button>
    </Stack>
  );
}
