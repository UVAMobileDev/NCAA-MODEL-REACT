import * as React from "react";
import { Button } from '@material-ui/core';
import axios from 'axios';

export function Test() {
    axios
        .get("./U-Z.json")
        .then((response) => response.data)
        .then((data) => {
            const team = data.data.map(o => o.name);
            const imageTxt = data.data.map(o => o.srcTxt);
            
            team.forEach(element => {
                console.log(element);
            });

    });

    function onClick() {
        console.log("TESTING!");
    }

    return (
        <div>
            <p>Testing 1 2 3.
            https://www.youtube.com/watch?v=TzZ3YOUhCxo
            </p>
            <Button onClick = {onClick}> https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
            
            </Button>
        </div>
    )
}