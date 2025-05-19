import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import NoteList from "./components/NoteList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NoteList />
  </StrictMode>
);
