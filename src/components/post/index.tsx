import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Post } from "../../types/data";

export default function PostItem({ id, title, body, userId }: Post) {
  return (
    <Box
      key={id}
      className="flex flex-wrap bg-neutral-50 rounded-md p-8 gap-8 drop-shadow-md"
    >
      <Box>
        <Typography className="text-2xl">{title}</Typography>
      </Box>
      <Box>
        <Typography>{body}</Typography>
      </Box>
    </Box>
  );
}
