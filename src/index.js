import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import indexRoutes from "./routes/index.jsx";

import "./assets/scss/material-kit-react.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {indexRoutes.map((prop, key) => {
        return (
          <Route path={prop.path} key={key} element={<prop.component />} />
        );
      })}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
