import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import Dashboard from "./dashboard/Dashboard";
import PastGames from "./dashboard/PastGames";
import UpcomingGames from "./dashboard/UpcomingGames";
import AllGames from "./dashboard/AllGames";
import Totals from "./dashboard/Totals";
import About from "./dashboard/About";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Test, ComparatorModel } from "./dashboard/Test";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/About" component={About} />
        <Route path="/UpcomingGames" component={UpcomingGames} />
        <Route path="/AllGames" component={AllGames} />
        <Route path="/Totals" component={Totals} />
        <Route path="/PastGames" component={PastGames} />
        <Route path="/Test" component={ComparatorModel} />
      </Switch>
    </BrowserRouter>
  );
}
