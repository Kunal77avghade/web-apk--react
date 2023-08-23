import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AgForm from "./Pages/AgForm";
import Admin from "./Pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AgForm />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<AgForm />} />
      </Routes>
    </BrowserRouter>
  );
}
