import React from 'react';
import TextField from '@material-ui/core/TextField'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, Button } from '@material-ui/core';
import axios from 'axios';

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
    const [textInput, setTextInput] = React.useState('');
    const [apiUrl, setApiUrl] = React.useState("http://3.84.121.75:8080/schedule/GamesByDate/2021-01-01");

    const columns = [
        {field: 'home', headerName: 'Home', width: 175},
        {field: 'away', headerName: 'Away', width: 175},
        {field: 'score', headerName: 'Score', width: 135},
    ]

    const rows = [
        {id: 1, home: "Home 1", away: "Away 1", score: "3-3"},
        {id: 2, home: "Home 2", away: "Away 2", score: "0-0"},
        {id: 3, home: "Home 3", away: "Away 3", score: "2-0"},
    ]

    function handleClick() {
        const dates = textInput.split('-'); 

        const year = dates[0];
        const month = dates[1];
        const day = dates[2];

        setApiUrl("http://3.84.121.75:8080/schedule/GamesByDate/" + year + "-" + month + "-" + day);
    }

    React.useEffect(() => {
        axios
          .get(apiUrl)
          .then((response) => response.data)
          .then((data) => {
            const home = data.data.map(o => o.home);
            home.forEach(element => {
                if (element == 'Cincinnati') {
                    console.log("Cincinatti at home found!")
                }                
            });
          });
      }, [apiUrl]);

    return (
        <div className = {classes.container}>
            <TextField className = {classes.dateField} onChange = {e => setTextInput(e.target.value)}/>
            <i className = {classes.instructionField} >Type the desired date in this format (minus quotations): "2021-02-26".</i>
            <DataGrid 
                autoHeight = {true}
                className = {classes.dataGrid} 
                rows = {rows} 
                columns = {columns} 
            />
            <Button className = {classes.button} onClick = {handleClick} variant = "contained" color = "default">Generate Table</Button>
        </div>
    )
}