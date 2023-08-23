import Footer from "../Component/Footer";
import Header from "../Component/Header";

import { useReducer } from "react";
import AlertDialogSlide from "../Component/Dialog";
import Table from "../Component/Table";

function AgForm() {
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

export default AgForm;
