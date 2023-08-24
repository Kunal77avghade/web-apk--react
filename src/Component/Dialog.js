import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

function AlertDialogSlide({ state, dispatch }) {
  function close() {
    dispatch({ type: "close_dialoag" });
    console.log(state);
  }
  return (
    <div>
      <Dialog
        open={state.open}
        keepMounted
        onClose={() => {
          close();
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {!state.isLoading && state.message}
            {state.isLoading && <CircularProgress />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!state.isLoading && (
            <Button
              onClick={() => {
                close();
              }}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide;
