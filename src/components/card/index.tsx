import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

interface CardItemProps {
  label: string;
}

export default function CardItem({ label }: CardItemProps) {
  return (
    <Box className="flex flex-col justify-end items-start h-20 p-8 bg-sky-500">
      <Typography>{label}</Typography>
    </Box>
  );
}
