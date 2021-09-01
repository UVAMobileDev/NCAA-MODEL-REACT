import React from "react";
import clsx from "clsx";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { CircularProgress } from "@material-ui/core";

import BarChartGames from "./BarChartGames";
import Games from "./Games";
import NumGames from "./NumGames";
import Copyright from "./Copyright";
import Donut from "./components/Donut.js";
import {
  PieChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Pie,
  Legend,
  Cell,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [highCorrect, setHighCorrect] = React.useState(0);
  const [medCorrect, setMedCorrect] = React.useState(0);
  const [lowCorrect, setLowCorrect] = React.useState(0);
  const [corrects, setCorrects] = React.useState(0);
  const [accurate, setAccurate] = React.useState(0);
  const [vegasCorrect, setVegasCorrect] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [donutLevel, setDonutLevel] = React.useState("Low");
  const [donutValue, setDonutValue] = React.useState(0);
  const [barChartData, setBarChartData] = React.useState([]);

  const [activeItem, setActiveItem] = React.useState("low");

  const handleClick = (type) => {
    setActiveItem(type);
  };

  const changeDonut = (level, donutVal) => {
    console.log(donutLevel);
    setDonutLevel(level);
    console.log(donutLevel);
    setDonutValue(donutVal);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const findNumberOfCorrectLevels = (array) => {
    var total = 0;
    var low = 0;
    var corLow = 0;
    var med = 0;
    var corMed = 0;
    var high = 0;
    var corHigh = 0;
    var correct = 0;
    var ourAcc = 0;
    var vegasAcc = 0;
    var vegasCorr = 0;
    for (const obj of array) {
      total += 1;

      if (
        (obj.spread < 0 && obj.final_result < 0) ||
        (obj.spread > 0 && obj.final_result > 0)
      )
        vegasCorr += 1;
      if (obj.isCorrect) correct += 1;
      if (obj.isCloser) ourAcc += 1;
      else vegasAcc += 1;

      if (obj.level == "low") {
        low += 1;
        if (obj.isCorrect) corLow += 1;
      } else if (obj.level == "medium") {
        med += 1;
        if (obj.isCorrect) corMed += 1;
      } else if (obj.level == "high") {
        high += 1;
        if (obj.isCorrect) corHigh += 1;
      }
    }
    changeDonut("Low", Math.round((corLow / low) * 1000) / 10);
    /* Vegas Prediction Accuracy on correctness */
    setVegasCorrect(Math.round((vegasCorr / total) * 1000) / 10);
    /* Our Prediction Accuracy on being correct */
    setCorrects(Math.round((correct / total) * 1000) / 10);
    /* Point Prediction Accuracy */
    setAccurate(Math.round((ourAcc / vegasAcc) * 100) - 10);
    /* Times we were correct comparing to confidence levels */
    setHighCorrect(Math.round((corHigh / high) * 1000) / 10);
    setMedCorrect(Math.round((corMed / med) * 1000) / 10);
    setLowCorrect(Math.round((corLow / low) * 1000) / 10);
  };

  React.useEffect(() => {
    axios
      .get("http://35.153.97.187:8080/all")
      .then((response) => response.data)
      .then((data) => {
        findNumberOfCorrectLevels(data.data);
      });
    axios
      .get("http://35.153.97.187:8080/schedule/GamesBySeason/2020")
      .then((response) => response.data)
      .then((data) => {
        setBarChartData(data.data);
        setIsLoaded(true);
      });
  }, [isLoaded]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Comparison and accuracy of our model compared to Vegas */}

            <Grid item xs={6}>
              <Paper>
                <Typography variant="h3" align="center">
                  Correctness on Deviation
                </Typography>
                <ResponsiveContainer width="99%" height={400}>
                  <PieChart width={400} height={400}>
                    <text
                      x="50%"
                      y="42%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={30}
                    >
                      {donutLevel}
                    </text>
                    <text
                      x="50%"
                      y="55%"
                      fontSize={44}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {donutValue}%
                    </text>
                    <Pie
                      data={[{ name: "Low", value: lowCorrect }]}
                      nameKey="low"
                      dataKey="value"
                      startAngle={90}
                      endAngle={90 - 360 * (lowCorrect / 100)}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill={"low" === activeItem ? "#ea8e33" : "#39425d"}
                      animationBegin={400}
                      onClick={() => {
                        changeDonut("Low", lowCorrect);
                        handleClick("low");
                      }}
                    />
                    <Pie
                      data={[{ name: "Medium", value: medCorrect }]}
                      nameKey="med"
                      dataKey="value"
                      startAngle={90}
                      endAngle={90 - 360 * (medCorrect / 100)}
                      cx="50%"
                      cy="50%"
                      innerRadius={110}
                      outerRadius={140}
                      fill={"med" === activeItem ? "#ea8e33" : "#39425d"}
                      animationBegin={500}
                      onClick={() => {
                        changeDonut("Med", medCorrect);
                        handleClick("med");
                      }}
                    />
                    <Pie
                      data={[{ name: "High", value: highCorrect }]}
                      nameKey="high"
                      dataKey="value"
                      startAngle={90}
                      endAngle={90 - 360 * (highCorrect / 100)}
                      cx="50%"
                      cy="50%"
                      innerRadius={150}
                      outerRadius={180}
                      fill={"high" === activeItem ? "#ea8e33" : "#39425d"}
                      animationBegin={600}
                      onClick={() => {
                        changeDonut("High", highCorrect);
                        handleClick("high");
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper>
                <Typography variant="h3" align="center">
                  Overall Correctness
                </Typography>
                <ResponsiveContainer width="99%" height={400}>
                  <PieChart width={400} height={400}>
                    <text
                      x="50%"
                      y="42%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={30}
                    >
                      Correct
                    </text>
                    <text
                      x="50%"
                      y="55%"
                      fontSize={44}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {corrects}%
                    </text>
                    <Pie
                      data={[{ name: "Low", value: lowCorrect }]}
                      dataKey="value"
                      startAngle={90}
                      endAngle={90 - 360 * (lowCorrect / 100)}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={130}
                      fill="#ea8e33"
                      animationBegin={400}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <Typography variant="h3" align="center">
                  Correctness based on Month
                </Typography>
                <ResponsiveContainer width="100%" height={500}>
                  {isLoaded ? (
                    <BarChart
                      width={500}
                      height={300}
                      data={barChartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Correct" stackId="a" fill="#ea8e33" />
                      <Bar dataKey="Incorrect" stackId="a" fill="#39425d" />
                    </BarChart>
                  ) : (
                    <CircularProgress />
                  )}
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
