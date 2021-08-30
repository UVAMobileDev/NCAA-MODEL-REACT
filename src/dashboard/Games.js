import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const columns = [
  { field: "home", headerName: "Home", width: 130 },
  { field: "away", headerName: "Away", width: 130 },
  {
    field: "spread",
    headerName: "Spread",
    type: "number",
    width: 100,
  },
  {
    field: "value",
    headerName: "Value",
    type: "number",
    width: 90,
  },
  {
    field: "neutral",
    headerName: "Neutral",
    type: "number",
    width: 100,
  },
  {
    field: "difference",
    headerName: "Difference",
    type: "number",
    width: 105,
  },
  {
    field: "pick",
    headerName: "Pick",
    width: 90,
  },
  {
    field: "level",
    headerName: "Level",
    width: 130,
  },
  {
    field: "time",
    headerName: "Time",
    width: 200,
  },
];
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Games() {
  const [rowData, setRowData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    var apiurl = "http://35.153.97.187:8080/schedule/GamesByDate/2021-02-26";
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        setRowData(data.data);
        console.log("rows" + rowData);
      });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {isLoaded ? (
        <DataGrid
          rows={rowData}
          columns={columns}
          getRowId={(rowData) => rowData.home}
          autoHeight={true}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

{
  /* <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Home</StyledTableCell>
              <StyledTableCell align="right">Away</StyledTableCell>
              <StyledTableCell align="right">Spread</StyledTableCell>
              <StyledTableCell align="right">Neutral</StyledTableCell>
              <StyledTableCell align="right">Differences</StyledTableCell>
              <StyledTableCell align="right">Level</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Home}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table> */
}
