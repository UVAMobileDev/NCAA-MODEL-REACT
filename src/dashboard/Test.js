import * as React from "react";
import { Button } from '@material-ui/core';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Line} from 'react-chartjs-2';

/* 
    1. Get specific values/spreads from a certain day and store it in an array.
    2. Update the chart with these specific spreads/values as plot points.
        2a. Make the labels at the bottom the same as the match-ups.
        2b. Make the labels at the side a range of numbers that fits the spreads/values.
        2c. Add a key to differentiate!
*/

export function Test() {
    const [startDate, setStartDate] = React.useState(new Date());
    const [label, setLabel] = React.useState([]);
    const [modelValues, setModelValues] = React.useState([]);
    const [vegasValues, setVegasValues] = React.useState([]);

    var apiUrl = "http://localhost:8080/schedule/GamesByDate/2021-02-26";
    var spreadList = [];
    var valueList = [];

    var homeTeams = [];
    var awayTeams = [];

    var state = {
        labels: label,
        datasets: [
            {
                label: 'Model',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgb(216,61,61)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: modelValues,
            },
            {
                label: 'Vegas',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgb(61,93,216)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: vegasValues,
            }
        ]
    }  

    React.useEffect(() => {
        axios
          .get(apiUrl)
          .then((response) => response.data)
          .then((data) => {
            const spread = data.data.map(o => o.spread);
            const value = data.data.map(o => o.value);
            const home = data.data.map(o => o.home);
            const away = data.data.map(o => o.away);

            spread.forEach(element => {
                spreadList.push(element);
            });
            value.forEach(element => {
                valueList.push(element);
            });
            home.forEach(element => {
                homeTeams.push(element);
            });
            away.forEach(element => {
                awayTeams.push(element);
            });

            let labelTemp = [];

            for (let i = 0; i < homeTeams.length; i++) {
                labelTemp.push(homeTeams[i] + " - " + awayTeams[i]);
            }
        
            setLabel(labelTemp);
            setModelValues(valueList);
            setVegasValues(spreadList);

          });
      }, []);

    function onClick() {
        console.log(state.labels);
    }

    function onChange() {

    }

    return (
        <div>
            <Button onClick={onClick}>Cool button.</Button>
            <DatePicker 
                selected = {startDate} 
                onChange = {(date) => {setStartDate(date)}}
                dateFormat = "yyyy-MM-dd"
            />
            <Line
                onChange = {onChange}
                data={state}
                options={{
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            />
        </div>
    )
}