import React from "react";
import { Provider, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LandingPage } from "./pages";
import store, { RootState } from "./redux/store";
import { NavBar } from "./components";
import { Box } from "@mui/material";
import { routes } from "./routes";

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
        {routes.map(
          ({ path, component: Component, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected && !isAuthorized ? <LandingPage /> : <Component />
              }
            />
          )
        )}
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
