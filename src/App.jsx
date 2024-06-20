/* eslint-disable no-unused-vars */
// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FbLogin from "./Login";


function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<FbLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
