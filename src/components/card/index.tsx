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
    <Grid2
      size={{ xs: 12, md: 6 }}
      alignItems={"center"}
      className={`hover:scale-105 duration-300 drop-shadow-md group`}
    >
      <Link to={path} className="no-underline w-full">
        <Box
          className={`relative flex flex-col justify-end items-start p-8 rounded-lg h-52`}
          sx={{
            backgroundImage: `url(${icon})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: color,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e8e78] to-transparent rounded-lg"></div>
          <Typography className="relative z-10 no-underline text-white text-4xl font-semibold group-hover:drop-shadow-lg group-hover:scale-110 duration-300">
            {label}
          </Typography>
        </Box>
      </Link>
    </Grid2>
  );
}
