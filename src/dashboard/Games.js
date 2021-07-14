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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleMove = (value,value1,value2,value3) =>{
      console.log(value,value1,value2,value3);
      const newData = rawData.filter(d => d.spread <= value[1] && d.spread >= value[0] && 
        d.value <= value1[1] && d.value >=value1[0] && d.neutral <= value2[1] && d.neutral >= value2[0] 
        && d.difference <= value3[1] && d.difference >= value3[0] ) ;
      setRowData(newData);
      
  
  }
  

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
      });
        
  }, []);
//find max and min values dynamically for spread,value,neutral,and difference.
     let  spreadMax= 0;
     rawData.forEach((e)=> { spreadMax < e.spread ? spreadMax = e.spread : spreadMax = spreadMax});
     spreadMax = Math.floor(spreadMax + 1);
     //console.log(spreadMax);
 
     let spreadMin = 0;
     rawData.forEach((e)=> {spreadMin > e.spread? spreadMin = e.spread : spreadMin = spreadMin});
     spreadMin = Math.floor(spreadMin);
     //console.log(spreadMin);

     let  valueMax= 0;
     rawData.forEach((e)=> { valueMax < e.value ? valueMax = e.value : valueMax = valueMax});
     valueMax = Math.floor(valueMax + 1);
     //console.log(valueMax);
 
     let valueMin = 0;
     rawData.forEach((e)=> {valueMin > e.value? valueMin = e.value : valueMin = valueMin});
     valueMin = Math.floor(valueMin);
     //console.log(valueMin);

     let  neutralMax= 0;
     rawData.forEach((e)=> { neutralMax < e.neutral ? neutralMax = e.neutral : neutralMax = neutralMax});
     neutralMax = Math.floor(neutralMax + 1);
     //console.log(neutralMax);
 
     let neutralMin = 0;
     rawData.forEach((e)=> {neutralMin > e.neutral? neutralMin = e.neutral : neutralMin = neutralMin});
     neutralMin = Math.floor(neutralMin);
     //console.log(neutralMin);

     let  differenceMax= 0;
     rawData.forEach((e)=> { differenceMax < e.difference ? differenceMax = e.difference : differenceMax = differenceMax});
     differenceMax = Math.floor(differenceMax + 1);
     //console.log(differenceMax);
 
     let differenceMin = 0;
     rawData.forEach((e)=> {differenceMin > e.difference? differenceMin = e.difference : differenceMin = differenceMin});
     differenceMin = Math.floor(differenceMin);
     //console.log(differenceMin);
    

  return (
    <div>
      <RangeSlider handleMove = {handleMove} a = {spreadMax} b = {spreadMin}
      c = {valueMax} d = {valueMin} e = {neutralMax} f = {neutralMin} g = {differenceMax} h = {differenceMin}/>

      {isLoaded ? <DataGrid rows={rowData} columns={columns} getRowId ={(rowData) => rowData.home} autoHeight={true} /> :
      <CircularProgress />}
      
    </div>
  );
}


