import React from "react";
import "./App.css";
import MainPage from "./Page/MainPage";
import SpotlistPage from "./Page/SpotlistPage";
import SpotdetailPage from "./Page/SpotdetailPage";
import ReviewPage from "./Page/ReviewPage";
import ReviewWritePage from "./Page/ReviewWritePage";
import SearchSpotlistPage from "./Page/SearchSpotlistPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spotlist/:category" element={<SpotlistPage />} />
        <Route
          path="/spotlist/search/:token"
          element={<SearchSpotlistPage />}
        />
        <Route path="/spotdetail/:spotId" element={<SpotdetailPage />} />
        <Route path="/review/:spotId" element={<ReviewPage />} />
        <Route path="/reviewwrite/:spotId" element={<ReviewWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
