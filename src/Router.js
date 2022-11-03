import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./Components/Main";
import Myinfo from "./Components/myinfo";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/myinfo" element={<Myinfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default router;
