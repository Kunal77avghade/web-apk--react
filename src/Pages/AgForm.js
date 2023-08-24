import Footer from "../Component/Footer";
import Header from "../Component/Header";
import AlertDialogSlide from "../Component/Dialog";
import Table from "../Component/Table";

function AgForm({ state, dispatch }) {
  return (
    <div className="App">
      <Header />
      <h1 style={{ textAlign: "center" }}>Invoice Details</h1>
      <Table dispatch={dispatch} />
      <AlertDialogSlide state={state} dispatch={dispatch} />
      <Footer />
    </div>
  );
}

export default AgForm;
