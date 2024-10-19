import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { getUsers, getPosts, getAlbums } from "../../services/api";
import { Post, Album } from "../../types/data";
import { User } from "../../types/user";
import SearchBar from "../../components/search-bar";
import EditModal from "../../components/modal";

type DataType = "users" | "posts" | "albums";

export default function Backoffice() {
  const [dataType, setDataType] = useState<DataType>("users");
  const [data, setData] = useState<User[] | Post[] | Album[]>([]);
  const [filteredData, setFilteredData] = useState<User[] | Album[] | Post[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<User | Album | Post>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    let filtered: User[] | Album[] | Post[] = [];
    if (dataType === "users") {
      filtered = (data as User[]).filter(
        (user) =>
          user.id.toString().includes(query) ||
          user.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (dataType === "albums") {
      filtered = (data as Album[]).filter(
        (album) =>
          album.id.toString().includes(query) ||
          album.title.toLowerCase().includes(query.toLowerCase())
      );
    } else if (dataType === "posts") {
      filtered = (data as Post[]).filter(
        (post) =>
          post.id.toString().includes(query) ||
          post.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredData(filtered);
  };

  const handleEdit = (item: User | Album | Post) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (updatedItem: User | Album | Post) => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
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
        <Table data={filteredData} onEdit={handleEdit} />
        {selectedItem && (
          <EditModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            data={selectedItem}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </Box>
    </Stack>
  );
}
