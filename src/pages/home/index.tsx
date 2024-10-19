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
      spacing={{ xs: 2, md: 6 }}
      sx={{
        placeContent: "center",
        paddingY: { xs: "2rem", md: "4rem" },
        paddingX: { xs: "0.2rem", md: "2rem" },
      }}
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
