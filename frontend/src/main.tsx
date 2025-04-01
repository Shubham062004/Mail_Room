// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import logo from "./assests/Logo.png";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    const img = document.createElement("img");
    img.src = logo;
    img.alt = "Vibe Connect Logo";
    img.style.width = "150px"; 
    root.prepend(img);
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
    <App />
//   </React.StrictMode>
);
