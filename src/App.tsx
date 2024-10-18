import React, { Children, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  AlbumsPage,
  Analitycs,
  Dashboard,
  Home,
  LandingPage,
  PostsPage,
} from "./pages";
import store, { RootState } from "./redux/store";
import { NavBar } from "./components";
import { Box } from "@mui/material";
import ProtectedRoutes from "./components/navbar/protected-routes";
import {
  isRole,
  selectIsAuthorized,
  selectUserRole,
} from "./redux/slices/authSlice";

function AppContent() {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isAdmin = useSelector((state: RootState) => isRole("admin")(state));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {isAuthorized && <NavBar isAdmin={isAdmin} />}
      <Routes>
        <Route path="/" element={isAuthorized ? <Home /> : <LandingPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route
          element={<ProtectedRoutes isAuthorized={isAdmin} redirectTo="/" />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analitycs" element={<Analitycs />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}
