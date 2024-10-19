import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Post } from "../../types/data";

export default function PostItem({ id, title, body, userId }: Post) {
  return (
    <Box
      key={id}
      className="flex flex-col bg-[#307160] rounded-md  gap-8 drop-shadow-md"
    >
      <Box className="ms-4 bg-[#b1decd] p-8">
        <Box>
          <Typography className="text-2xl font-semibold text-[#0f241f]">
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography className="text-[#2a5b50]">{body}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
