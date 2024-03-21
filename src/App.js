import React from "react";
import "./App.css";
import MainPage from "./Page/MainPage";
import SpotlistPage from "./Page/SpotlistPage";
import SpotdetailPage from "./Page/SpotdetailPage";
import ReviewPage from "./Page/ReviewPage";
import ReviewWritePage from "./Page/ReviewWritePage";
import WishlistPage from "./Page/WishlistPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spotlist" element={<SpotlistPage />} />
        <Route path="/spotdetail" element={<SpotdetailPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/reviewwrite" element={<ReviewWritePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
