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
      <Link to={path} className="no-underline">
        <Box
          className={`flex flex-col justify-end items-start h-20 p-8 rounded-lg 	`}
          sx={{ backgroundColor: color }}
        >
          <img src={icon} alt={label} />
          <Typography className="no-underline">{label}</Typography>
        </Box>
      </Link>
    </Grid2>
  );
}
