import * as React from "react";
import {
  DataGrid,
  useGridSlotComponentProps,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import RangeSlider from "./RangeSlider";
import Header from "./Header";
import PieChart from "./PieChart";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const columns = [
  { field: "home", headerName: "Home", width: 120 },
  { field: "away", headerName: "Away", width: 120 },
  {
    field: "spread",
    headerName: "Spread",
    type: "number",
    width: 130,
  },
  {
    field: "neutral",
    headerName: "Neutral",
    type: "number",
    width: 130,
  },
  {
    field: "difference",
    headerName: "Difference",
    type: "number",
    width: 170,
  },
  {
    field: "pick",
    headerName: "Pick",
    width: 110,
  },
  {
    field: "level",
    headerName: "Level",
    width: 130,
  },
  {
    field: "final_result",
    headerName: "Final Result",
    type: "Number",
    width: 180,
  },
  {
    field: "time",
    headerName: "Time",
    width: 200,
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .super-app-theme--1": {
      backgroundColor: "rgba(248, 118, 0, 0.7)",
    },
    "& .super-app-theme--0": {
      backgroundColor: "rgba(0, 0, 112, 0.6)",
    },
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Games() {
  const [rowData, setRowData] = React.useState([]);
  const [rawData, setRawData] = React.useState([]);
  // const [currentData,setCurrentData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);
  const [closer, setcloser] = React.useState(0);

  const handleMove = (value, value2, value3) => {
    console.log(value, value2, value3);
    let newData = rawData.filter(
      (d) =>
        d.spread <= value[1] &&
        d.spread >= value[0] &&
        d.neutral <= value2[1] &&
        d.neutral >= value2[0]
    );
    setRowData(newData);
    let num = 0;
    rowData.forEach((e) => {
      num += e.isCloser;
    });
    setcloser(num);
    let num2 = 0;
    rowData.forEach((e) => (num2 += e.isCorrect));
    setCorrect(num2);
  };
  const handleButton1 = () => {
    let num = 0;
    rowData.forEach((e) => {
      num += e.isCloser;
    });
    setcloser(num);
    setIsOpen(!isOpen);
    setRowData(rowData);
  };
  const handleButton2 = () => {
    let num = 0;
    rowData.forEach((e) => {
      num += e.isCorrect;
    });
    setCorrect(num);
    setIsOpen(!isOpen);
    setRowData(rowData);
  };

  const classes = useStyles();

  React.useEffect(() => {
    var apiurl = "http://35.153.97.187:8080/schedule/Games";
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        setRawData(data.data);
        const newdata = data.data;
        setRowData(newdata);
        let num = 0;
        let num2 = 0;
        newdata.forEach((e) => {
          num += e.isCloser;
        });
        newdata.forEach((e) => {
          num2 += e.isCorrect;
        });
        setcloser(num);
        setCorrect(num2);
        // console.log(num, num2);
      });
  }, []);

  //find max and min values dynamically for spread,value,neutral,and difference.
  let spreadMax = 0;
  rawData.forEach((e) => {
    spreadMax < e.spread ? (spreadMax = e.spread) : (spreadMax = spreadMax);
  });
  spreadMax = Math.floor(spreadMax + 1);
  //console.log(spreadMax);

  let spreadMin = 0;
  rawData.forEach((e) => {
    spreadMin > e.spread ? (spreadMin = e.spread) : (spreadMin = spreadMin);
  });
  spreadMin = Math.floor(spreadMin);
  //console.log(spreadMin);

  let neutralMax = 0;
  rawData.forEach((e) => {
    neutralMax < e.neutral
      ? (neutralMax = e.neutral)
      : (neutralMax = neutralMax);
  });
  neutralMax = Math.floor(neutralMax + 1);
  //console.log(neutralMax);

  let neutralMin = 0;
  rawData.forEach((e) => {
    neutralMin > e.neutral
      ? (neutralMin = e.neutral)
      : (neutralMin = neutralMin);
  });
  neutralMin = Math.floor(neutralMin);
  //console.log(neutralMin);

  let differenceMax = 0;
  rawData.forEach((e) => {
    differenceMax < e.difference
      ? (differenceMax = e.difference)
      : (differenceMax = differenceMax);
  });
  differenceMax = Math.floor(differenceMax + 1);
  //console.log(differenceMax);

  let differenceMin = 0;
  rawData.forEach((e) => {
    differenceMin > e.difference
      ? (differenceMin = e.difference)
      : (differenceMin = differenceMin);
  });
  differenceMin = Math.floor(differenceMin);
  //console.log(differenceMin);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={7}>
          {!isOpen && (
            <Paper>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleButton2}
              >
                See correct
              </Button>
              <PieChart
                correct={closer}
                incorrect={rowData.length - closer}
                name="close"
              />
            </Paper>
          )}
          {isOpen && (
            <Paper>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleButton1}
              >
                See closer
              </Button>
              <PieChart
                correct={correct}
                incorrect={rowData.length - correct}
                name="correct"
              />
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={7} lg={5}>
          <Paper
            style={{
              padding: 12,
            }}
          >
            <RangeSlider
              handleMove={handleMove}
              a={spreadMax}
              b={spreadMin}
              e={neutralMax}
              f={neutralMin}
              g={differenceMax}
              h={differenceMin}
            />
          </Paper>
        </Grid>
      </Grid>
      {isLoaded && isOpen && (
        <DataGrid
          className={classes.root}
          pagination
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{
            Pagination: CustomPagination,
          }}
          rows={rowData}
          columns={columns}
          getRowId={(rowData) => rowData.difference.toString()}
          autoHeight={true}
          getRowClassName={(params) =>
            `super-app-theme--${params.getValue(params.id, "isCorrect")}`
          }
          laoding={true}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      )}
      {isLoaded && !isOpen && (
        <DataGrid
          className={classes.root}
          pagination
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{
            Pagination: CustomPagination,
          }}
          rows={rowData}
          columns={columns}
          getRowId={(rowData) => rowData.difference.toString()}
          autoHeight={true}
          getRowClassName={(params) =>
            `super-app-theme--${params.getValue(params.id, "isCloser")}`
          }
          laoding={true}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      )}

      {!isLoaded && <CircularProgress />}
    </div>
  );
}
