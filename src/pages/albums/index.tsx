import React, { useEffect, useState } from "react";
import { Album } from "../../types/data";
import { getAlbums } from "../../services/api";
import { Link } from "react-router-dom";

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
      <h1>Álbumes</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
