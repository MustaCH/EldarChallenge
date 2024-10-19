import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { getUsers, getPosts, getAlbums } from "../../services/api";
import { Post, Album } from "../../types/data";
import { User } from "../../types/user";
import SearchBar from "../../components/search-bar";

type DataType = "users" | "posts" | "albums";

export default function Backoffice() {
  const [dataType, setDataType] = useState<DataType>("users");
  const [data, setData] = useState<User[] | Post[] | Album[]>([]);
  const [filteredData, setFilteredData] = useState<User[] | Album[] | Post[]>(
    []
  );

  const handleSearch = (query: string) => {
    if (dataType === "users") {
      setFilteredData(
        (data as User[]).filter(
          (user) =>
            user.id.toString().includes(query) ||
            user.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else if (dataType === "albums") {
      setFilteredData(
        (data as Album[]).filter(
          (album) =>
            album.id.toString().includes(query) ||
            album.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else if (dataType === "posts") {
      setFilteredData(
        (data as Post[]).filter(
          (post) =>
            post.id.toString().includes(query) ||
            post.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

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
      setFilteredData(fetchedData);
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
          <Button onClick={() => setDataType("albums")}>Buscar álbum</Button>
        </Stack>
      </Stack>
      <Box>
        <SearchBar onSearch={handleSearch} dataType={dataType} />
        <Table data={filteredData} />
      </Box>
    </Stack>
  );
}
