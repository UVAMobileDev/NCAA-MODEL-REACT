import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
//import { green, purple } from '@material-ui/core/colors';
//import Button from './Button';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({handleMove,a,b,c,d,e,f,g,h}) {
  const classes = useStyles();

  const [value, setValue] = React.useState([-100, 100]);
  const [value1, setValue1] = React.useState([-100, 100]);
  const [value2, setValue2] = React.useState([-100, 100]);
  const [value3, setValue3] = React.useState([-100, 100]);
  
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  
  
      
  const handleChange = (event, newValue) => {
    setValue(newValue);
    //handleMove(value,value1,value2,value3);
   
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
    //handleMove(value,value1,value2,value3);
   
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    //handleMove(value,value1,value2,value3);
    
  };
  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
    //handleMove(value,value1,value2,value3);
    
  };
  

  const handleReset = () =>{
    setValue([b,a]);
    //handleMove(value,value1,value2,value3);
    setOpen(!open);
  }
  const handleReset1 = () =>{
    setValue1([d,c]);
    //handleMove(value,value1,value2,value3);
    setOpen1(!open1);
  }
  const handleReset2 = () =>{
    setValue2([f,e]);
    //handleMove(value,value1,value2,value3);
    setOpen2(!open2);
  }
  const handleReset3 = () =>{
   
    setValue3([h,g])
    //handleMove(value,value1,value2,value3);
    setOpen3(!open3);
  }
  const handleApply = () =>{
    handleMove(value,value1,value2,value3);
  }

  

  return (
    <div className={classes.root}>
    <Typography variant="caption" display="block" gutterBottom>
        
      </Typography>
    <Button variant="contained" color="primary" onClick={()=>{handleApply()}}> 
      APPLY
    </Button>
      <Typography id="range-slider" gutterBottom>
         Spread range
      </Typography>
      {!open && <Button variant="contained" color="primary" size="small" onClick={() => {handleReset()}}>
        Open
      </Button>}
      {open && <Button variant="contained" color="secondary" size="small" onClick={() => {handleReset()}}>
        Close
      </Button>}
      {open && <Slider
        min = {b}
        max = {a}
        step = {0.5}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />}
      <Typography id="range-slider" gutterBottom>
         Value range
      </Typography>
      {!open1 && <Button variant="contained" color="primary" size="small" onClick={() => {handleReset1()}}>
        Open
      </Button>}
      {open1 && <Button variant="contained" color="secondary" size="small" onClick={() => {handleReset1()}}>
        Close
      </Button>}
      {open1 && <Slider
        min = {d}
        max = {c}
        step = {0.5}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />}
      <Typography id="range-slider" gutterBottom>
         Neutral range
      </Typography>
      {!open2 && <Button variant="contained" color="primary" size="small" onClick={() => {handleReset2()}}>
        Open
      </Button>}
      {open2 && <Button variant="contained" color="secondary" size="small" onClick={() => {handleReset2()}}>
        Close
      </Button>}
      {open2 && <Slider
        min = {f}
        max = {e}
        step = {0.5}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />}
      <Typography id="range-slider" gutterBottom>
         Difference range
      </Typography>
      {!open3 && <Button variant="contained" color="primary" size="small" onClick={() => {handleReset3()}}>
        Open
      </Button>}
      {open3 && <Button variant="contained" color="secondary" size="small" onClick={() => {handleReset3()}}>
        Close
      </Button>}
      { open3 && <Slider
        min = {h}
        max = {g}
        step = {1}
        value={value3}
        onChange={handleChange3}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />}
      
      
    </div>
    
    
  );
}
