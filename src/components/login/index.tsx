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
import React from "react";

export default function Login() {
  return (
    <Container sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
      <Stack alignItems={"center"} gap={"8px"}>
        <Box>
          <Typography>Bienvenido!</Typography>
        </Box>
        <Grid2 container spacing={1}>
          <FormControl sx={{ gap: "4px" }}>
            <TextField
              name="user"
              type="text"
              placeholder="Nombre de usuario"
              variant="outlined"
            />
            <TextField
              name="pass"
              type="password"
              placeholder="Contraseña"
              variant="outlined"
            />
            <Button variant="contained" sx={{ marginY: "8px" }}>
              Iniciar Sesión
            </Button>
          </FormControl>
        </Grid2>
      </Stack>
    </Container>
  );
}
