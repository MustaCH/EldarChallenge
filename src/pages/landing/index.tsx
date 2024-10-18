import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Login } from "../../components";
import { getUsers } from "../../services/api";
import { User } from "../../types/user";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

export default function LadingPage() {
  const [users, setUsers] = useState<User[]>();
  const [badLogin, setBadLogin] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async (username: string, password: string) => {
    const user = users?.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      dispatch(login({ role: user.state.role }));
      alert("Inicio de sesion exitoso");
    } else {
      setBadLogin(true);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <Box>
      <Login handleLogin={handleLogin} error={badLogin} />
    </Box>
  );
}
