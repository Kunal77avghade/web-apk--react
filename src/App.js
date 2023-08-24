import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AgForm from "./Pages/AgForm";
import Admin from "./Pages/Admin";
import SendMail from "./Pages/SendMail";
import { useReducer } from "react";

export default function App() {
  const init = {
    message: "",
    title: "",
    open: false,
    isLoading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "show_message":
        return {
          ...state,
          message: `Mail is sent to ${action.email}`,
          title: `Mail send`,
          open: true,
          isLoading: false,
        };

      case "show_status":
        return {
          ...state,
          message: action.maessage,
          title: `Status`,
          open: true,
          isLoading: false,
        };

      case "loading":
        return {
          ...state,
          isLoading: true,
          title: "Loading..",
          open: true,
        };

      case "loading_off":
        return {
          ...state,
          isLoading: false,
          title: "Loading..",
          open: false,
        };

      case "show_error":
        return {
          ...state,
          message: action.message ? action.message : `Something Whent wrong !`,
          title: `Error`,
          open: true,
          isLoading: false,
        };

      case "close_dialoag":
        return {
          ...state,
          open: false,
          message: "",
          title: "s",
          isLoading: false,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AgForm state={state} dispatch={dispatch} />} />
        <Route
          path="admin"
          element={<Admin state={state} dispatch={dispatch} />}
        />
        <Route
          path="send"
          element={<SendMail state={state} dispatch={dispatch} />}
        />
        <Route
          path="*"
          element={<AgForm state={state} dispatch={dispatch} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
