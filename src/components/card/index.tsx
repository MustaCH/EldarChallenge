import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface CardItemProps {
  label: string;
  icon: string;
  path: string;
  color: string;
}

export default function CardItem({ label, icon, path, color }: CardItemProps) {
  return (
    <Grid2 size={{ xs: 8, md: 6 }} alignItems={"center"}>
      <Link to={path}>
        <Box
          className={`flex flex-col justify-end items-start h-20 p-8 bg-[${color}]`}
        >
          <img src={icon} alt={label} />
          <Typography>{label}</Typography>
        </Box>
      </Link>
    </Grid2>
  );
}
