import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Album, Post } from "../../types/data";

interface SearchBarProps {
  onSearch: (query: string) => void;
  dataType: "users" | "albums" | "posts";
}

export default function SearchBar({ onSearch, dataType }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        label={`Buscar por ${
          dataType === "users" ? "ID o Nombre" : "ID o Título"
        }`}
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Buscar
      </Button>
    </Stack>
  );
}
