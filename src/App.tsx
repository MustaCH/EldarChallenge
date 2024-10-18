import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Analitycs, Dashboard, Home, LandingPage } from "./pages";
import store from "./redux/store";
import { NavBar } from "./components";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analitycs" element={<Analitycs />} />
        </Routes>
      </Router>
    </Provider>
  );
}
