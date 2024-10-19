import axios from "axios";
import { Album, Photo, Post } from "../types/data";
import { User } from "../types/user";

const customUsers: User[] = [
  {
    id: 11,
    name: "Admin User",
    username: "admin_user",
    password: "admin!user1",
    email: "admin@example.com",
    address: {
      street: "Admin Street",
      suite: "Apt. 1",
      city: "Admin City",
      zipcode: "12345",
    },
    phone: "123-456-7890",
    website: "adminwebsite.com",
    company: {
      name: "Admin Co.",
      catchPhrase: "We manage things",
      bs: "business solutions",
    },
    state: {
      isAuthorized: true,
      role: "admin",
    },
  },
  {
    id: 12,
    name: "Regular User",
    username: "regular_user2",
    email: "user@example.com",
    password: "regular!user1",
    address: {
      street: "User Street",
      suite: "Apt. 2",
      city: "User City",
      zipcode: "54321",
    },
    phone: "987-654-3210",
    website: "userwebsite.com",
    company: {
      name: "User Co.",
      catchPhrase: "We do stuff",
      bs: "business services",
    },
    state: {
      isAuthorized: true,
      role: "user",
    },
  },
];

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return [...data, ...customUsers];
};

export const createUser = async (newUser: User): Promise<User> => {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    newUser
  );
  return data;
};

export const updateUser = async (user: User): Promise<void> => {
  await axios.put(
    `https://jsonplaceholder.typicode.com/users/${user.id}`,
    user
  );
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
};

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

export const updatePost = async (post: Post): Promise<void> => {
  await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    post
  );
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

export const getAlbums = async (): Promise<Album[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/albums"
  );
  return data;
};

export const updateAlbum = async (album: Album): Promise<void> => {
  await axios.put(
    `https://jsonplaceholder.typicode.com/albums/${album.id}`,
    album
  );
};

export const getAlbumById = async (id: number): Promise<Album> => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/${id}`
  );
  return data;
};

export const deleteAlbum = async (id: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
};

export const getPhotos = async (): Promise<Photo[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos"
  );
  return data;
};
