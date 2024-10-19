import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Album, Post } from "../../types/data";
import { User } from "../../types/user";

type TableData = User | Album | Post;

interface TableProps {
  data: TableData[];
}

export default function Table({ data }: TableProps) {
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
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
