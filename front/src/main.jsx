import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
// import "react-toastify/dist/ReactT"
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

axios.defaults.baseURL = "https://api.oltinsoy-takm.uz";

axios.defaults.headers.common["Content-Type"] = "application/json";
let token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["x-auth-token"] = token;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer theme="colored" />
    </BrowserRouter>
  </React.StrictMode>
);
