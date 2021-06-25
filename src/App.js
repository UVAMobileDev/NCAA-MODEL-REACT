import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import Dashboard from "./dashboard/Dashboard";
import UpcomingGames from "./dashboard/UpcomingGames";
import AllGames from "./dashboard/AllGames";
import Totals from "./dashboard/Totals";
import About from "./dashboard/About";
import TeamList from "./dashboard/TeamList";
import TeamInfo from "./dashboard/TeamInfo";
import { Switch, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/About" component={About} />
        <Route path="/UpcomingGames" component={UpcomingGames} />
        <Route path="/AllGames" component={AllGames} />
        <Route path="/Totals" component={Totals} />
        <Route exact path="/Teams" component={TeamList} />
        <Route exact path="/Teams/:TeamName" component={TeamInfo} />
      </Switch>
    </BrowserRouter>
  );
}
