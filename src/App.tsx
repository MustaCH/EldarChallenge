import React from "react";
import { Provider, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Analitycs, Dashboard, Home, LandingPage } from "./pages";
import store, { RootState } from "./redux/store";
import { NavBar } from "./components";
import { Box } from "@mui/material";

function AppContent() {
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {isAuthorized && <NavBar />}
      <Routes>
        <Route path="/" element={isAuthorized ? <Home /> : <LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analitycs" element={<Analitycs />} />
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
