import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

const createNewRow = () => {
  return {
    start: new Date(),
    end: new Date(),
    ammount: 0,
    comment: "",
  };
};

export function Table() {
  const gridRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [email, setEmail] = useState("");
  const url = `http://localhost:4000/`;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    try {
      const newData = [...tableData];
      setTableData(newData.filter((row) => row !== selectedData[0]));
    } catch (error) {
      console.error("Error while removing rows:", error);
    }
  }, [tableData]);

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

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const style = {
    width: "80%",
    margin: "10%",
    marginTop: "3rem",
  };

  function handleSubmit() {
    const data = JSON.stringify(tableData);

    const mail = {
      email: email,
      subject: "Invoice Details",
      message: tableData,
    };

    axios
      .post("http://localhost:8000/data", mail)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .post(url + `saved`, tableData)
      .then(() => {
        console.log("Submitted", data);
      })
      .catch((error) => {
        console.error("Error submitting:", error);
      });
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

  return (
    <div style={style}>
      <ButtoGrid removeSelected={removeSelected} addRow={addRow} />
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", borderRadius: "100px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          dataTypeDefinitions={dataTypeDefinitions}
          rowSelection={"single"}
          animateRows={true}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
      <Grid align="right" padding="1rem">
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid align="right" padding="1rem">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
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

        {/* <ContactUs /> */}
      </div>
    </div>
  );
}

export default Table;
