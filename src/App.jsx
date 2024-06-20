/* eslint-disable no-unused-vars */
// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FbLogin from "./Login";
// import S3FileManager from "./S3FileManager";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/aws" element={<S3FileManager />} /> */}
        <Route path="/" element={<FbLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
