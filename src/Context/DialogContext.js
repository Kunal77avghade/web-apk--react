import { createContext, useContext, useReducer } from "react";

const DialogContext = createContext(null);

export function DialogContextProvider({ children }) {
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
    <DialogContext.Provider value={{ state, dispatch }}>
      {children}
    </DialogContext.Provider>
  );
}
export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined)
    throw new Error(
      "DialogContext was used outside of the DialogContextProvider"
    );
  return context;
}
