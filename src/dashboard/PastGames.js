import React from 'react';
import TextField from '@material-ui/core/TextField'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
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
        order: 3,
        marginTop: "10px",
        width: 525,
        pageSize: 3,
    }
}));

export default function PastGames() {
    const classes = useStyles();
    const [textInput, setTextInput] = React.useState('');

    const columns = [
        {field: 'home', headerName: 'Home', width: 175},
        {field: 'away', headerName: 'Away', width: 175},
        {field: 'score', headerName: 'Score', width: 175},
    ]

    const rows = [
        {id: 1, home: "Home 1", away: "Away 1", score: "3-3"},
        {id: 2, home: "Home 2", away: "Away 2", score: "0-0"},
        {id: 3, home: "Home 3", away: "Away 3", score: "2-0"},
    ]

    // React.useEffect(() => {
    //     var apiurl = "http://3.84.121.75:8080/schedule/GamesByDate/2021-02-26";
    //     axios.get(apiurl).then((response) => response.data).then((data) => {
    //         const team = data.data.map(o => o.home);
    //         team.forEach(element => {
    //             if (element == "Cincinnati") {
    //                 console.log(element);
    //             }
    //         }
    //     }
    // });

    return (
        <div className = {classes.container}>
            <TextField className = {classes.dateField}/>
            <i className = {classes.instructionField}>Type the desired date in this format (minus quotations): "2021-02-26".</i>
            <DataGrid stickyHeader autoHeight={true} className = {classes.dataGrid} rows={rows} columns={columns}/>
        </div>
    )
}