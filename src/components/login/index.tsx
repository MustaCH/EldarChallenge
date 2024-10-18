import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

interface LoginProps {
  handleLogin: (user: string, password: string) => void;
  error: boolean;
}

const validationSchema = Yup.object().shape({
  user: Yup.string()
    .required("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "La contraseña debe contener al menos un carácter especial"
    ),
});

export default function Login({ handleLogin, error }: LoginProps) {
  const form = useFormik({
    initialValues: { user: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values.user, values.password);
    },
  });

  return (
    <Container sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
      <Stack alignItems={"center"} gap={"8px"}>
        <Box>
          <Typography>Bienvenido!</Typography>
        </Box>
        <Grid2 container spacing={1} sx={{ maxWidth: "200px" }}>
          <form onSubmit={form.handleSubmit}>
            <FormControl sx={{ gap: "4px" }}>
              <TextField
                name="user"
                type="text"
                placeholder="Nombre de usuario"
                variant="outlined"
                value={form.values.user}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.user && Boolean(form.errors.user)}
                helperText={form.touched.user && form.errors.user}
              />
              <TextField
                name="password"
                type="password"
                placeholder="Contraseña"
                variant="outlined"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.password && Boolean(form.errors.password)}
                helperText={form.touched.password && form.errors.password}
              />
              {error && (
                <Typography color="error">
                  Usuario o contraseña incorrectos
                </Typography>
              )}
              <Button type="submit" variant="contained" sx={{ marginY: "8px" }}>
                Iniciar Sesión
              </Button>
            </FormControl>
          </form>
        </Grid2>
      </Stack>
    </Container>
  );
}
