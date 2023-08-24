import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import axios from "axios";

const DataTable = ({
  data,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  dispatch,
}) => {
  async function download(id) {
    try {
      dispatch({ type: "loading" });
      const response = await axios.get(`http://localhost:5000/${id}`);
      const row = response.data.details.map((i) => [
        i.start.split("T")[0],
        i.end.split("T")[0],
        i.ammount,
        i.comment,
      ]);

      const csvHeader = ["Start", "End", "Ammout", "Commnet"];
      const csvContent = `vendor, ${
        response.data.vendor
      }\n${csvHeader}\n${row.join("\n")}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `${id}_Report.csv`);
      dispatch({ type: "loading_off" });
    } catch (e) {
      dispatch({ type: "show_error" });
    }
  }

  async function deleteReq(id) {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Mail Sent On</TableCell>
            <TableCell>For Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.vendor}</TableCell>
                <TableCell>{row.mailed_on.split("T")[0]}</TableCell>
                <TableCell>{row.dateFor}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => deleteReq(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="download"
                    color="primary"
                    onClick={() => download(row.id)}
                  >
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DataTable;
