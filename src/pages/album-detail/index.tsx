import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumById, getPhotos } from "../../services/api";
import { Album, Photo } from "../../types/data";
import { Box, Grid, Grid2, Stack, Typography } from "@mui/material";

export default function AlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const loadAlbum = async () => {
      try {
        const albumData = await getAlbumById(Number(id));
        setAlbum(albumData);
        const response = await getPhotos();
        const filteredPhotos = response.filter(
          (photo) => photo.albumId === albumData.id
        );
        setPhotos(filteredPhotos);
      } catch (error) {
        console.error("Error al cargar el álbum:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbum();
  }, [id]);

  if (!album) return <div>Cargando...</div>;

  return (
    <Stack gap={"4rem"}>
      <Typography className="text-center text-3xl font-semibold capitalize mt-12">
        {album.title}
      </Typography>
      <Grid2 container spacing={{ xs: 4, md: 6 }} className={"mb-12 p-8"}>
        {photos.map((photo) => (
          <Grid2 size={{ xs: 6, md: 4 }} key={photo.id}>
            <Stack justifyContent={"center"} alignItems={"center"}>
              {isLoading ? (
                <Box className={"h-52 bg-gray-400 animate-pulse"}>
                  <Typography>Cargando...</Typography>
                </Box>
              ) : (
                <Box>
                  <img
                    className="w-32 md:w-56 rounded-md"
                    src={photo.url}
                    alt={photo.title}
                  />
                </Box>
              )}
              <Box>
                <Typography className="text-xs md:text-sm capitalize font-medium text-center">
                  {photo.title}
                </Typography>
              </Box>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
