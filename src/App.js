import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AgForm from "./Pages/AgForm";
import Admin from "./Pages/Admin";
import SendMail from "./Pages/SendMail";
import { DialogContextProvider } from "./Context/DialogContext";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AgForm />} />
        <Route path="admin" element={<Admin />} />
        <Route
          path="send"
          element={
            <DialogContextProvider>
              <SendMail />
            </DialogContextProvider>
          }
        />
        <Route path="*" element={<AgForm />} />
      </Routes>
    </BrowserRouter>
  );
}
