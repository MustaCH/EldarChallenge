import { Box, Grid2, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CardItem } from "../../components";
import { routes } from "../../routes";

export default function Home() {
  return (
    <Grid2 container spacing={4} sx={{ placeContent: "center" }}>
      {routes.map((route) => (
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
