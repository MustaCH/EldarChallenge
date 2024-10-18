import { Button, Stack } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../routes";
import { RootState } from "../../redux/store";

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );

  const handleLogout = () => {
    dispatch(logout());
    alert("Cerrando sesión");
  };
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <ul className="flex flex-row gap-12 list-none">
        {routes
          .filter((route) => isAuthorized || !route.protected)
          .map((route) => (
            <li
              key={route.path}
              className={`${route.path === "/landing" && "hidden"}`}
            >
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
      </ul>
      <Button onClick={handleLogout}>Logout</Button>
    </Stack>
  );
}
