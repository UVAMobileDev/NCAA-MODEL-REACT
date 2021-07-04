import * as React from "react";
import { Button } from '@material-ui/core';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Line} from 'react-chartjs-2';

export function ComparatorModel() { // Make it better to look at; over/under graph (scatterplot).
    const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    };

    const [startDate, setStartDate] = React.useState(new Date());
    const [label, setLabel] = React.useState([]);
    const [modelValues, setModelValues] = React.useState([]);
    const [vegasValues, setVegasValues] = React.useState([]);
    const [apiUrl, setApiUrl] = React.useState('http://35.153.97.187:8080/schedule/GamesByDate/2021-02-26');

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
                backgroundColor: 'rgb(255,0,0)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: modelValues,
            },
            {
                label: 'Vegas',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgb(0,88,255)',
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
      }, [apiUrl]);

    function handleClick() {
        const dates = convertDate(startDate.toString()).split('-');

        const year = dates[0];
        const month = dates[1];
        const day = dates[2];

        if (!(apiUrl === ("http://35.153.97.187:8080/schedule/GamesByDate/" + year + "-" + month + "-" + day))) {
            setApiUrl("http://35.153.97.187:8080/schedule/GamesByDate/" + year + "-" + month + "-" + day);
        }
    }

    function convertDate(date) {
        const dateParts = date.split(" ");
        return dateParts[3] + "-" + months[dateParts[1]] + "-" + dateParts[2];
    }

    return (
        <div>
            <Button onClick={handleClick} variant = "contained" color = "default">Generate Chart</Button>
            <DatePicker 
                selected = {startDate} 
                onChange = {(date) => {setStartDate(date)}}
                dateFormat = "yyyy-MM-dd"
            />
            <Line
                data={state}
                fontSize = {15}
                width={1200}
	            height={600}
                options={{
                    maintainAspectRatio: false,
                    responsive: false,
                }}
            />
        </div>
    )
}