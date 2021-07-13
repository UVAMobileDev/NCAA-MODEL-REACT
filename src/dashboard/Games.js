import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import RangeSlider from './RangeSlider';
import Header from './Header';


const columns = [
  { field: 'home', headerName: 'Home', width: 130 },
  { field: 'away', headerName: 'Away', width: 130 },
  {
    field: 'spread',
    headerName: 'Spread',
    type: 'number',
    width: 100,
  },
  {
    field: 'value',
    headerName: 'Value',
    type: 'number',
    width: 90,
  },
  {
    field: 'neutral',
    headerName: 'Neutral',
    type: 'number',
    width: 100,
  },
  {
    field: 'difference',
    headerName: 'Difference',
    type: 'number',
    width: 105,
  },
  {
    field: 'pick',
    headerName: 'Pick',
    width: 90,
  },
  {
    field: 'level',
    headerName: 'Level',
    width: 130,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 200,
  }
];
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


export default function Games() {
  const [rowData, setRowData] = React.useState([]);
  const [rawData, setRawData] = React.useState([]);
  const [max, setMax] = React.useState();
  const [min, setMin] = React.useState();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [showAddTask, setShowAddTask] = React.useState(false)
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleMove = (value,value1,value2) =>{
      console.log(value,value1,value2);
      const newData = rawData.filter(d => d.spread <= value[1] && d.spread >= value[0] && 
        d.value <= value1[1] && d.value >=value1[0] && d.neutral <= value2[1] && d.neutral >= value2[0]) ;
      setRowData(newData);
      
      //const newData2 = rowData.filter(d => d.value <= value1[1] && d.value >=value1[0]);
      //setRowData(newData2);
      //const newData3 = rowData.filter(d => d.neutral <= value2[1] && d.neutral >= value2[0]);
      //setRowData(newData3);
  
  }
  

  const classes = useStyles();

  React.useEffect(() => {
    var apiurl = "http://35.153.97.187:8080/schedule/Games";
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        //setRowData(data.data);
        setRawData(data.data);
        const newdata = data.data;
        setRowData(newdata);
      });
        //const maxdata = rawData.sort(function(a, b){return a.spread - b.spread});
        //console.log(typeof(maxdata));
        //setMin(maxdata[0].spread);
        //const mindata = rawData.sort(function(a, b){return b.spread - a.spread});
        //setMax(mindata[0].spread);
        //console.log(max.spread);
  }, []);
  
  
  
  
  


  return (
    <div>
    <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <RangeSlider handleMove = {handleMove}/>}

      {isLoaded ? <DataGrid rows={rowData} columns={columns} getRowId ={(rowData) => rowData.home} autoHeight={true} /> :
      <CircularProgress />}
      
    </div>
  );
}


