import * as React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

export default function NumGames() {
  const [games, setGames] = React.useState(0);
  React.useEffect(() => {
    var apiurl = "http://35.153.97.187:8080/schedule/GamesByDate/2021-02-26";
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        setGames(data.data.length);
      });
  }, []);
  return (
    <React.Fragment>
      <Typography component="p" variant="h4" display="inline">
        Games Today: {games}
      </Typography>
      <Typography color="textSecondary" display="inline">
        on 06 Feb, 2021
      </Typography>
    </React.Fragment>
  );
}
