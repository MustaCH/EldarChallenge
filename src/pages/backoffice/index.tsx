import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import {
  getUsers,
  getPosts,
  getAlbums,
  updatePost,
  updateAlbum,
  deletePost,
  deleteAlbum,
  deleteUser,
  updateUser,
} from "../../services/api";
import { Post, Album } from "../../types/data";
import { User } from "../../types/user";
import SearchBar from "../../components/search-bar";
import EditModal from "../../components/modal";

type DataType = "users" | "posts" | "albums";

export default function Backoffice() {
  const [dataType, setDataType] = useState<DataType>("users");
  const [data, setData] = useState<User[] | Post[] | Album[]>([]);
  const [filteredData, setFilteredData] = useState<(User | Album | Post)[]>([]);
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

  const handleSave = async (updatedItem: User | Album | Post) => {
    try {
      if ("name" in updatedItem) {
        await updateUser(updatedItem as User);
      } else if ("title" in updatedItem) {
        if ("userId" in updatedItem) {
          await updatePost(updatedItem as Post);
        } else {
          await updateAlbum(updatedItem as Album);
        }
      }

      setFilteredData((prevData) => {
        return prevData.map((item) => {
          if ("name" in updatedItem && "name" in item) {
            return item.id === updatedItem.id ? (updatedItem as User) : item;
          }
          if ("title" in updatedItem && "title" in item) {
            return item.id === updatedItem.id
              ? (updatedItem as Album | Post)
              : item;
          }
          return item;
        });
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        if ("name" in selectedItem) {
          await deleteUser(selectedItem.id);
        } else if ("title" in selectedItem) {
          if ("userId" in selectedItem) {
            await deletePost(selectedItem.id);
          } else {
            await deleteAlbum(selectedItem);
          }
        }
        setIsModalOpen(false);
        setFilteredData(
          filteredData.filter((item) => item.id !== selectedItem.id)
        );
        setSelectedItem(undefined);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
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
