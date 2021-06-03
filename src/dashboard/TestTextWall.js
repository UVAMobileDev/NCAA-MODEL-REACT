import React, { useState } from 'react';
import { Button, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { Link, Grid } from '@material-ui/core';
import testStyle from './testStyle.css';

const useStyles = makeStyles ({
    root: {
        background: 'linear-gradient(45deg, #333, #999)',
        border: 20,
        borderRadius: 15,
        color: "white",
        padding: '20 30px',
        marginRight: '20 px',
    }
})

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500],
        }
    }
})

export default function TestTextWall() {
    // const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [clickCount, setClickCount] = useState(1);

    function handleClick() {
        setClicked(true);
        setClickCount(clickCount + 1);
        // alert("Number of clicks: " + clickCount);
    }

    return (
        <div className = "project">
            <Grid container>
                <Grid item xs={12}>
                    <h1 className = "headerText">
                        For more info on UCLA's historic college team, click the link below!
                    </h1>
                </Grid>
                <Grid item xs={3}>
                    <img src = "https://d.newsweek.com/en/full/1331800/fe-lebron-10-640699820-edit.jpg" className = "kareemImage"/>
                </Grid>
                <Grid item xs={6}>
                    <Link href = 'https://en.wikipedia.org/wiki/1966–67_UCLA_Bruins_men%27s_basketball_team' className = "clickButton">
                        <Button size = "large" onClick = {handleClick} className = "clickButton">
                            Press me!
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}