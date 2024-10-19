import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { User } from "../../types/user";
import { Album, Post } from "../../types/data";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  data: User | Album | Post;
  onSave: (updatedData: User | Album | Post) => void;
  onDelete: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  data,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<User | Album | Post>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isUser = (data: User | Album | Post): data is User => {
    return (data as User).name !== undefined;
  };

  const isAlbum = (data: User | Album | Post): data is Album => {
    return (
      (data as Album).title !== undefined && (data as Album).id !== undefined
    );
  };

  const isPost = (data: User | Album | Post): data is Post => {
    return (
      (data as Post).title !== undefined && (data as Post).userId !== undefined
    );
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  useEffect(() => {
    setFormData(data);
  }, [data]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" mb={2}>
          {isUser(data)
            ? "Editar Usuario"
            : isAlbum(data)
            ? "Editar Album"
            : isPost(data)
            ? "Editar Post"
            : ""}
        </Typography>

        <Stack spacing={2}>
          {isUser(formData) && (
            <>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}

          {isAlbum(formData) && (
            <>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </>
          )}

          {isPost(formData) && (
            <>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="User ID"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </>
          )}

          {/* Botones */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={onDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
