import * as React from "react";
import {IconButton, Button} from '@material-ui/core';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Line, Scatter} from 'react-chartjs-2';
import {makeStyles} from '@material-ui/core';
import {Card, CardContent} from '@material-ui/core';
import {KeyboardArrowDown} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({ 
    containerOne: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    instructionField: {
        order: 1,
        marginTop: "5px",
        fontSize: "10px",
    },
    pastGamesButton: {
        order: 2,
        marginTop: "5px",
    },
    pastGamesDateField: {
        order: 3,
        marginTop: "10px",
    },
    firstGraphText: { 
        order: 4,
        marginTop: "25px",
        fontSize: "20px",
    },
    pastGamesGraph: {
        order: 5,
        marginTop: "5px",
    },
    secondGraphText: { 
        order: 6,
        marginTop: "5px",
        fontSize: "20px",
    },
    valueSpreadGraph: {
        display: "flex",
        order: 7,
        marginLeft: "200px",
        marginBottom: "20px",
        marginTop: "20px",
    },
        // arrow: {
    //     display: "flex",
    //     order: 5,
    //     marginLeft: "1300px",
    //     size: 'small',
    // },
    card: {
        maxWidth: 1400,
        margin: "auto",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#292423",
        marginTop: "10px",
        marginBottom: "10px",
    },
}));

export function ComparatorModel() {
    const classes = useStyles();

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
    
    const [startDate, setStartDate] = React.useState(new Date('2021-02-27'));
    const [apiUrl, setApiUrl] = React.useState('http://35.153.97.187:8080/schedule/GamesByDate/2021-02-26');

    // Graph #1:
    const [pastGamesLabel, setPastGamesLabel] = React.useState([]);
    const [modelValues, setModelValues] = React.useState([]);
    const [vegasValues, setVegasValues] = React.useState([]);
    
    // Graph #2:
    const [valueSpreadLabel, setValueSpreadLabel] = React.useState([]);    
    const [valueSpreadDatasets, setValueSpreadDatasets] = React.useState([{
        labels: valueSpreadLabel,
        datasets: {
            label: "Test",
            backgroundColor: "rgb(0,88,255)",
            borderColor: 'rgba(0,0,0,1)',
            pointRadius: 5,
            pointHoverRadius: 5,
            borderWidth: 2,
            pointStyle: 'rectRounded',
            showLine: false,
            data: {x: 1, y: 2},
        },
    }]);

    var spreadList = [];
    var valueList = [];

    var homeTeams = [];
    var awayTeams = [];

    var pastGamesState = {
        labels: pastGamesLabel,
        datasets: [
            {
                label: 'Model',
                backgroundColor: 'rgb(255,0,0)',
                borderColor: 'rgba(0,0,0,1)',
                pointRadius: 5,
                pointHoverRadius: 5,
                borderWidth: 2,
                pointStyle: 'rectRounded',
                showLine: false,
                data: modelValues,
            },
            {
                label: 'Vegas',
                backgroundColor: 'rgb(0,88,255)',
                borderColor: 'rgba(0,0,0,1)',
                pointRadius: 5,
                pointHoverRadius: 5,
                borderWidth: 2,
                pointStyle: 'rectRounded',
                showLine: false,
                data: vegasValues,
            }
        ]
    }  

    var valueSpreadState = {
        labels: valueSpreadLabel,
        datasets: valueSpreadDatasets,
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

            let pastGamesLabelTemp = [];

            for (let i = 0; i < homeTeams.length; i++) {
                pastGamesLabelTemp.push(homeTeams[i] + " - " + awayTeams[i]);
            }
 
            setPastGamesLabel(pastGamesLabelTemp);
            setModelValues(valueList);
            setVegasValues(spreadList);

            setValueSpreadLabel(pastGamesLabelTemp);

            let tempArray = [];

            for (let j = 0; j < pastGamesLabelTemp.length; j++) {
                let tempPoint = {
                    label: null,
                    backgroundColor: null,
                    borderColor: 'rgba(0,0,0,1)',
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    borderWidth: 2,
                    pointStyle: 'rectRounded',
                    showLine: false,
                    data: null,
                }

                var matchup = pastGamesLabelTemp[j];

                tempPoint.label = matchup;
                tempPoint.backgroundColor = 'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255) + ")";

                tempPoint.data = [{x: valueList[j], y: spreadList[j]}];

                tempArray.push(tempPoint);

                if (j == pastGamesLabelTemp.length - 1) {
                    setValueSpreadDatasets(tempArray);
                }
            }
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

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    return (
        <div>
            <Card className={classes.card} variant = "outlined">
                <CardContent>
                    <div className = {classes.containerOne}>
                        <i className = {classes.instructionField}>Games present from February 26th, 2021 and onwards.</i>
                        <DatePicker 
                            selected = {startDate} 
                            onChange = {(date) => {setStartDate(date)}}
                            dateFormat = "yyyy-MM-dd"
                            className = {classes.pastGamesDateField}
                        />
                        <b className = {classes.firstGraphText}>Model-Vegas Graph:</b>
                        <Line
                            data = {pastGamesState}
                            fontSize = {15}
                            width = {1200}
	                        height = {600}
                            options = {{
                                animation: false,
                                maintainAspectRatio: false,
                                responsive: false,
                                legend: {
                                    labels: {
                                        fontColor: 'black'
                                    }
                                }
                            }}
                            className = {classes.pastGamesGraph}
                        />
                        <b className = {classes.secondGraphText}>Model-Vegas Scatterplot:</b>
                        <Scatter 
                            data = {valueSpreadState}
                            fontSize = {15}
                            width = {1200}
                            height = {600}
                            options = {{
                                animation: false,
                                maintainAspectRatio: false,
                                responsive: false,
                                legend: {
                                    labels: {
                                        fontColor: 'black'
                                    }
                                }
                            }}
                            className = {classes.valueSpreadGraph}
                        />
                        <Button className = {classes.pastGamesButton} onClick={handleClick} variant = "contained" color = "default">Generate Chart</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}