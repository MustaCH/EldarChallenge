import { Box, Grid2, Stack } from "@mui/material";
import React from "react";
import { CardItem } from "../../components";
import { routes } from "../../routes";

interface HomeProps {
  isAuthorized: boolean;
}

export default function Home({ isAuthorized }: HomeProps) {
  return (
    <Grid2
      container
      spacing={10}
      sx={{ placeContent: "center", height: "80vh" }}
    >
      {routes
        .filter((route) => isAuthorized || route.path !== "/backoffice")
        .map((route) => (
          <CardItem
            key={route.id}
            label={route.label}
            icon={route.iconUrl}
            path={route.path}
            color={route.color}
          />
        ))}
    </Grid2>
  );
}
