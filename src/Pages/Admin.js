import React, { useEffect, useState } from "react";
import DataTable from "../Component/DashBoardTable";
import axios from "axios";

// const sampleData = [
//   { id: 1, vendor: "Vendor 1", comment: "Comment 1", sendDate: "2023-08-23" },
//   { id: 2, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 3, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 4, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 5, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 6, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 7, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 8, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 9, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 10, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 11, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 12, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
//   { id: 13, vendor: "Vendor 2", comment: "Comment 2", sendDate: "2023-08-24" },
// ];

const Admin = () => {
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

  return (
    <div>
      <h1>Table with Pagination</h1>
      <DataTable
        data={sampleData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Admin;
