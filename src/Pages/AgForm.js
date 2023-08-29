import Footer from "../Component/Footer";
import Header from "../Component/Header";
import AlertDialogSlide from "../Component/Dialog";
import Table from "../Component/Table";
import { DialogContextProvider } from "../Context/DialogContext";

function AgForm() {
  return (
    <div className="App">
      <Header />
      <DialogContextProvider>
        <h1 style={{ textAlign: "center" }}>Invoice Details</h1>
        <Table />
        <AlertDialogSlide />
      </DialogContextProvider>
      <Footer />
    </div>
  );
}

export default AgForm;
