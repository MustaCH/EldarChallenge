import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { getUsers, getPosts, getAlbums } from "../../services/api";
import { Post, Album } from "../../types/data";
import { User } from "../../types/user";

type DataType = "users" | "posts" | "albums";

export default function Backoffice() {
  const [dataType, setDataType] = useState<DataType>("users");
  const [data, setData] = useState<User[] | Post[] | Album[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedData: User[] | Post[] | Album[] = [];
      switch (dataType) {
        case "users":
          fetchedData = await getUsers();
          break;
        case "posts":
          fetchedData = await getPosts();
          break;
        case "albums":
          fetchedData = await getAlbums();
          break;
        default:
          fetchedData = [];
      }
      setData(fetchedData);
    };

    fetchData();
  }, [dataType]);

  return (
    <Stack>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginY={"2rem"}
      >
        <Box>
          <Button variant="contained">+ Nuevo usuario</Button>
        </Box>
        <Stack flexDirection={"row"} gap={"2rem"}>
          <Button onClick={() => setDataType("users")}>Buscar usuario</Button>
          <Button onClick={() => setDataType("posts")}>Buscar post</Button>
          <Button onClick={() => setDataType("albums")}>Buscar album</Button>
        </Stack>
      </Stack>
      <Box>
        <Table data={data} />
      </Box>
    </Stack>
  );
}
