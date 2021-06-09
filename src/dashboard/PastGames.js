import React from 'react';
import TextField from '@material-ui/core/TextField'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, Button } from '@material-ui/core';
import axios from 'axios';
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    dateField: {
        order: 1,
        marginTop: "10px",
        size: "small",
    },
    instructionField: {
        order: 2,
        marginTop: "10px",
        fontSize: "10px",
    },
    dataGrid: {
        order: 4,
        marginTop: "10px",
        width: 500,
        pageSize: 3,
    },
    button: {
        order: 3,
        marginTop: "5px",
    }
}));

export default function PastGames(props) {
    const classes = useStyles();

    const [startDate, setStartDate] = React.useState(new Date());
    const [textInput, setTextInput] = React.useState('');
    const [apiUrl, setApiUrl] = React.useState("http://3.84.121.75:8080/schedule/GamesByDate/2021-01-01");
    const [gameRows, setGameRows] = React.useState([
        {home: "Home 1", away: "Away 1", score: "3-3"},
        {home: "Home 2", away: "Away 2", score: "0-0"},
        {home: "Home 3", away: "Away 3", score: "2-0"},
    ]);

    var columns = [
        {field: 'home', headerName: 'Home', width: 175},
        {field: 'away', headerName: 'Away', width: 175},
        {field: 'score', headerName: 'Score', width: 135},
    ];

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

    var homeTeams = [];
    var awayTeams = [];

    var finalRows = [];

    function handleClick() {
        // const dates = textInput.split('-'); 

        const dates = convertDate(startDate.toString()).split('-');

        const year = dates[0];
        const month = dates[1];
        const day = dates[2];

        for (var i = 0; i < homeTeams.length; i++) {
            finalRows.push({id: i, home: homeTeams[i], away: awayTeams[i], score: "0-0"});
        }

        console.log(finalRows);

        setGameRows(finalRows);

        setApiUrl("http://3.84.121.75:8080/schedule/GamesByDate/" + year + "-" + month + "-" + day);
    }

    function convertDate(date) {
        const dateParts = date.split(" ");
        return dateParts[3] + "-" + months[dateParts[1]] + "-" + dateParts[2];
    }

    React.useEffect(() => {
        axios
          .get(apiUrl)
          .then((response) => response.data)
          .then((data) => {
            const home = data.data.map(o => o.home);
            const away = data.data.map(o => o.away);
            home.forEach(element => {
                homeTeams.push(element);
            });
            away.forEach(element => {
                awayTeams.push(element);
            });
          });
      }, [apiUrl]);

    return (
        <div className = {classes.container}>
            <DataGrid 
                autoHeight = {true}
                className = {classes.dataGrid} 
                rows = {gameRows} 
                columns = {columns} 
                getRowId ={(gameRows) => gameRows.home}
            />
            <DatePicker 
                selected = {startDate} onChange = {(date) => setStartDate(date)} dateFormat = "yyyy-MM-dd"
            />
            <Button className = {classes.button} onClick = {handleClick} variant = "contained" color = "default">Generate Table</Button>
        </div>
    )
}