import React, { useEffect, useState } from "react";
import DataTable from "../Component/DashBoardTable";
import axios from "axios";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Button } from "@mui/material";
import AlertDialogSlide from "../Component/Dialog";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import { Delete } from "@mui/icons-material";

const Admin = ({ state, dispatch }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    async function getAll() {
      const response = await axios.get("http://localhost:5000/");
      console.log(response.data);
      setSampleData(response.data);
    }
    getAll();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const style = {
    width: "80%",
    margin: "10%",
    marginTop: "3rem",
  };

  return (
    <>
      <Header />
      <div style={style}>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <DataTable
          data={sampleData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          dispatch={dispatch}
        />
        <ButtoGrid dispatch={dispatch} />
      </div>
      <AlertDialogSlide state={state} dispatch={dispatch} />
      <Footer />
    </>
  );
};

export default Admin;

function ButtoGrid({ state, dispatch }) {
  async function download() {
    try {
      dispatch({ type: "loading" });
      const response = await axios.get(`http://localhost:5000/download`);
      const row = response.data.map((i) => [
        i.vendor,
        i.start.split("T")[0],
        i.end.split("T")[0],
        i.ammount,
        i.comment,
      ]);
      const csvHeader = ["vendor", "Start", "End", "Ammout", "Commnet"];
      const csvContent = `${csvHeader}\n${row.join("\n")}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `Report.csv`);
      dispatch({ type: "loading_off" });
    } catch (e) {
      dispatch({ type: "show_error" });
    }
  }

  async function deleteall() {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`http://localhost:5000/`);
      dispatch({ type: "loading_off" });
      window.location.reload();
    } catch (e) {
      dispatch({ type: "show_error" });
    }
  }

  const style = {
    display: "flex",
    align: "left",
    justifyContent: "right",
    margin: "2px",
  };

  const space = {
    margin: "10px",
  };

  return (
    <div style={style}>
      <div style={space}>
        <Button variant="contained" color="success" onClick={() => download()}>
          Download <DownloadIcon />
        </Button>
      </div>
      <div style={space}>
        <Button variant="contained" color="error" onClick={() => deleteall()}>
          Delete All <Delete />
        </Button>
      </div>
    </div>
  );
}
