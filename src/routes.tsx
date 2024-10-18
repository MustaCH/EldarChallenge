import {
  Home,
  LandingPage,
  PostsPage,
  AlbumsPage,
  Dashboard,
  Analitycs,
} from "./pages";

export const routes = [
  {
    id: 1,
    path: "/",
    component: Home,
    label: "Home",
    protected: false,
    iconUrl: "",
  },
  {
    id: 2,
    path: "/posts",
    component: PostsPage,
    label: "Posts",
    protected: false,
    iconUrl: "",
  },
  {
    id: 3,
    path: "/albums",
    component: AlbumsPage,
    label: "Albums",
    protected: false,
    iconUrl: "",
  },
  {
    path: "/dashboard",
    component: Dashboard,
    label: "Dashboard",
    protected: false,
    iconUrl: "",
  },
  {
    id: 4,
    path: "/analitycs",
    component: Analitycs,
    label: "Analitycs",
    protected: false,
    iconUrl: "",
  },
  {
    id: 5,
    path: "/landing",
    component: LandingPage,
    label: "Landing",
    protected: false,
    iconUrl: "",
  },
];
