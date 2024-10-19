import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Grid2,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { User } from "../../../types/user";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newUser: User) => void;
}

const initialFormData: User = {
  id: 0,
  name: "",
  username: "",
  email: "",
  password: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
  state: {
    isAuthorized: true,
    role: "user",
  },
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
    state: {
      isAuthorized: true,
      role: "user",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      state: {
        ...prevData.state,
        role: e.target.value,
      },
    }));
  };

  const handleSave = () => {
    const newUser = { ...formData, id: Math.floor(Math.random() * 1000) };
    onSave(newUser);
    setFormData(initialFormData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Nuevo Usuario</DialogTitle>
      <DialogContent>
        <Stack spacing={2} paddingY={"8px"}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <TextField
                label="Nombre completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Nombre de usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                type="password"
              />
            </Grid2>
          </Grid2>
          <FormLabel component="legend">Dirección</FormLabel>
          <Grid2 container spacing={2}>
            <Grid2 size={8}>
              <TextField
                label="Calle"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                fullWidth
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                label="Departamento"
                name="suite"
                value={formData.address.suite}
                onChange={handleAddressChange}
                fullWidth
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2}>
            <Grid2 size={8}>
              <TextField
                label="Ciudad"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                fullWidth
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                label="Código postal"
                name="zipcode"
                value={formData.address.zipcode}
                onChange={handleAddressChange}
                fullWidth
              />
            </Grid2>
          </Grid2>
          <FormLabel component="legend">Contacto</FormLabel>
          <TextField
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Sitio Web"
            name="website"
            value={formData.website}
            onChange={handleChange}
            fullWidth
          />
          <FormLabel component="legend">Rol de Usuario</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={formData.state.role}
            onChange={handleRoleChange}
            row
          >
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="Usuario"
            />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;
