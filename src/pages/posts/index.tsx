import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PostItem } from "../../components";
import { Post } from "../../types/data";
import { getPosts } from "../../services/api";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const post = await getPosts();
        setPosts(post);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <Stack className="gap-12 p-16">
      {posts?.map((post) => (
        <Box key={post.id}>
          <PostItem
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
          />
        </Box>
      ))}
    </Stack>
  );
}
