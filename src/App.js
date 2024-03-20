import React from "react";
import "./App.css";
import MainPage from "./Page/MainPage";
import SpotlistPage from "./Page/SpotlistPage";
import SpotdetailPage from "./Page/SpotdetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spotlist" element={<SpotlistPage />} />
        <Route path="/spotdetail" element={<SpotdetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
