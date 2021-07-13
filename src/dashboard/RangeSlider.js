import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({handleMove}) {
  const classes = useStyles();
  const [value, setValue] = React.useState([-11, 25]);
  const [value1, setValue1] = React.useState([-8, 25]);
  const [value2, setValue2] = React.useState([-12.5, 25]);
      
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleMove(value,value1,value2);
   
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
    handleMove(value,value1,value2);
   
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    handleMove(value,value1,value2);
    
  };
  const handleReset = () =>{
    setValue([-11,25]);
    setValue1([-8,25]);
    setValue2([-12.5,25]);
    handleMove(value,value1,value2);
  }
  

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
         spread range
      </Typography>
      <Slider
        min = {-11}
        max = {25}
        step = {0.5}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      <Typography id="range-slider" gutterBottom>
         value range
      </Typography>
      <Slider
        min = {-8}
        max = {25}
        step = {0.5}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      <Typography id="range-slider" gutterBottom>
         neutral range
      </Typography>
      <Slider
        min = {-12.5}
        max = {25}
        step = {0.5}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      <Button onClick = {handleReset} variant="contained" color = "primary" size = "small"> reset </Button>
    </div>
    
    
  );
}
