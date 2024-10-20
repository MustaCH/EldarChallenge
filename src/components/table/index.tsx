import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React from "react";
import { Album, Post } from "../../types/data";
import { User } from "../../types/user";

type TableData = User | Album | Post;

interface TableProps {
  data: TableData[];
  onEdit: (item: TableData) => void;
}

export default function Table({ data, onEdit }: TableProps) {
  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  const headers = Object.keys(data[0]).filter(
    (key) => typeof data[0][key as keyof TableData] !== "object"
  );

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
            <TableCell>Edit</TableCell>{" "}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header}>
                  {item[header as keyof TableData]}
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="outlined"
                  className="border-2 border-[#3e8e78] text-[#3e8e78]"
                  onClick={() => onEdit(item)}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
