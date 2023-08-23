import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import { TextField } from "@mui/material";
import VendorForm from "./Form";

const createNewRow = () => {
  return {
    start: new Date(),
    end: new Date(),
    ammount: 0,
    comment: "",
  };
};

export function Table({ dispatch }) {
  const gridRef = useRef();
  const [tableData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  // const url = `http://localhost:4000/`;

  /*useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/
  /*
  const removeSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    try {
      const newData = [...tableData];
      setTableData(newData.filter((row) => row !== selectedData[0]));
    } catch (error) {
      console.error("Error while removing rows:", error);
    }
  }, [tableData]);
*/

  /*
  const addRow = useCallback(
    (idx = undefined) => {
      const newRow = createNewRow();
      const newData = [...tableData];
      if (idx !== undefined) {
        newData.splice(idx, 0, newRow);
      } else {
        newData.push(newRow);
      }
      setTableData(newData);
    },
    [tableData]
  );
  */
  const addRow = () => {
    const newRow = createNewRow();
    gridRef.current.api.applyTransaction({ add: [newRow] });
    // console.log(tableData);
  };

  const removeSelected = () => {
    const selected = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selected });
  };

  /*
  const getData = () => {
    axios.get(url + `data`).then((res) => {
      const data2 = res.data.map((row) => {
        const startParts = row.start.split("/");
        const endParts = row.end.split("/");
        return {
          ...row,
          start: new Date(
            parseInt(startParts[2]),
            parseInt(startParts[1]) - 1,
            parseInt(startParts[0])
          ),
          end: new Date(
            parseInt(endParts[2]),
            parseInt(endParts[1]) - 1,
            parseInt(endParts[0])
          ),
        };
      });
      setTableData(data2);
    });
  };
*/
  const onGridReady = (params) => {
    console.log(params);
    setGridApi(params.api);
  };

  function handleSubmit(info) {
    let data = [];
    gridRef.current.api.forEachNode((node) => data.push(node.data));

    const mail = {
      email: info.email,
      subject: "Invoice Details",
      message: data,
      selectedDate: info.selectedDate,
      vendorName: info.vendorName,
    };

    console.log(mail);

    // // axios
    // //   .post("http://localhost:8000/data", mail)
    // //   .then((response) => {
    // //     console.log("Response:", response.data);
    // //   })
    // //   .catch((error) => {
    // //     console.error("Error:", error);
    // //     errorStatus = true;
    // //   });

    axios
      .post("http://localhost:5000/data", mail)
      .then((response) => {
        console.log("Response:", response.data);
        dispatch({ type: "show_message", email: info.email });
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch({ type: "show_error" });
      });

    /*
    axios
      .post(url + `saved`, tableData)
      .then(() => {
        // console.log("Submitted", data);
      })
      .catch((error) => {
        // console.error("Error submitting:", error);
        errorStatus = true;
      });
    */
  }

  function onCellValueChanged(e) {
    const start = e.data.start;
    const end = e.data.end;
    if (start > end) {
      const newEnd = new Date(start);
      e.node.setDataValue("end", newEnd);
      gridApi.stopEditing();
      gridApi.flashCells({ rowNodes: [e.node], flashDelay: 1000 });
    }
  }

  const dataTypeDefinitions = useMemo(() => {
    return {
      object: {
        baseDataType: "object",
        extendsDataType: "object",
        valueParser: (params) => ({ name: params.newValue }),
        valueFormatter: (params) =>
          params.value == null ? "" : params.value.name,
      },
    };
  }, []);

  const defaultColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
    editable: true,
  };

  const columnDefs = [
    { headerName: "Start", field: "start" },
    { headerName: "End", field: "end" },
    { headerName: "Amount", field: "ammount" },
    { headerName: "Comment", field: "comment" },
  ];

  const style = {
    width: "80%",
    margin: "10%",
    marginTop: "3rem",
  };

  return (
    <div style={style}>
      <ButtoGrid removeSelected={removeSelected} addRow={addRow} />
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", borderRadius: "100px", marginBottom: "1rem" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          dataTypeDefinitions={dataTypeDefinitions}
          rowSelection={"multiple"}
          animateRows={true}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
      <VendorForm onSubmit={handleSubmit} />
    </div>
  );
}

function ButtoGrid({ removeSelected, addRow }) {
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
        <Button variant="contained" color="success" onClick={addRow}>
          Add Row
        </Button>
      </div>
      <div style={space}>
        <Button variant="contained" color="error" onClick={removeSelected}>
          Remove
        </Button>
      </div>
    </div>
  );
}

export default Table;
