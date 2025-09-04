import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router-dom";
import "tailwindcss";
import "././components/layout/manualThemeToggle.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
