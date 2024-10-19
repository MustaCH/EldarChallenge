import React, { useEffect, useState } from "react";
import { Album } from "../../types/data";
import { getAlbums } from "../../services/api";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import StartIcon from "@mui/icons-material/Start";

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const albumsData = await getAlbums();
        setAlbums(albumsData);
      } catch (error) {
        console.error("Error al cargar los álbumes:", error);
      }
    };

    loadAlbums();
  }, []);

  return (
    <div>
      <Typography className="text-3xl font-bold my-8 text-center">
        Álbumes
      </Typography>
      <ul className="flex flex-col gap-6 p-0">
        {albums.map((album) => (
          <li
            key={album.id}
            className="list-none bg-[#b1decd] p-4 rounded-md drop-shadow-lg"
          >
            <Link
              to={`/albums/${album.id}`}
              className="flex justify-between items-center no-underline capitalize"
            >
              <Typography className="text-xl font-semibold text-[#0f241f]">
                {album.title}
              </Typography>
              <StartIcon className="text-xl font-semibold text-[#0f241f]" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
