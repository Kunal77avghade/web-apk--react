import { useReducer } from "react";
import "./App.css";
import AlertDialogSlide from "./Component/Dialog";
import { Table } from "./Table";
import { LogoIcon } from "./logo";

export default function App() {
  const init = {
    message: "",
    title: "",
    open: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "show_message":
        return {
          ...state,
          message: `Mail is sent to ${action.email}`,
          title: `Mail send`,
          open: true,
        };

      case "show_error":
        return {
          ...state,
          message: `Something Whent wrong !`,
          title: `Error`,
          open: true,
        };

      case "close_dialoag":
        return {
          ...state,
          open: false,
          message: "",
          title: "s",
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init);

  return (
    <div className="App">
      <Header />
      <Table dispatch={dispatch} />
      <AlertDialogSlide state={state} dispatch={dispatch} />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {
    padding: "20px",
    textAlign: "center",
    background: "#CCECDC",
    color: "white",
    fontSize: "30px",
  };
  return (
    <>
      <div style={style}>
        <LogoIcon />
      </div>
      <h1>Invoice details</h1>
    </>
  );
}

function Footer() {
  const style = {
    padding: "20px",
    textAlign: "center",
    background: "#CCECDC",
    color: "white",
    fontSize: "30px",
  };

  return (
    <div style={style}>
      <h4> &copy; Checkr</h4>
    </div>
  );
}
