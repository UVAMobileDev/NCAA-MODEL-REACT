import React from "react";
import axios from "axios";
//$ git push -u origin <local-branch>
import { matchPath, Route, Switch } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import Link from "@material-ui/core/Link";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Image from "material-ui-image";
import CardActionArea from "@material-ui/core/CardActionArea";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./components/listItems";
import Copyright from "./components/Copyright";
import Avatar from "@material-ui/core/Avatar";
import PieChart from "./components/PieChart";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useParams } from "react-router-dom";

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
  column: {
    flexBasis: "33.33%",
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
  table: {
    minWidth: 650,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondHeading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(25),
    color: theme.palette.text.secondary,
  },
  logo: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  accordion: {
    "&:hover": {
      backgroundColor: "#F1F1EF",
      color: "#141E3C",
    },
  },
}));

export default function TeamInfo() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTeamLogo = (data) => {
    data.forEach((e) => {
      if (e.team_name == TeamName) {
        setTeamLogo(e.logoURL);
      }
    });
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [teamLogo, setTeamLogo] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);

  const [isLoaded, setIsLoaded] = React.useState("false");
  const [teamData, setTeamData] = React.useState({});
  const [games, setGames] = React.useState([]);
  let { TeamName } = useParams();
  const preventDefault = (event) => event.preventDefault();

  //piechart
  const [correct, setCorrect] = React.useState(0);
  const [closer, setcloser] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [rawData, setRawData] = React.useState([]);

  var teamapiurl =
    "http://35.153.97.187:8080/schedule/TeamSchedule/" + TeamName;
  var date = "";

  React.useEffect(() => {
    // axios
    // .get("http://35.153.97.187:8080/schedule/games")
    // .then((response) => response.data)
    // .then((data) => {
    //     setGames(data.data)
    // });
    axios
      .get(teamapiurl)
      .then((response) => response.data)
      .then((data) => {
        const newdata = data.data;

        let num = 0;
        let num2 = 0;
        newdata.forEach((e) => {
          num += e.iscloser;
        });
        newdata.forEach((e) => {
          num2 += e.iscorrect;
        });
        setcloser(num);
        setCorrect(num2);
        setLength(newdata.length);
        setRawData(data.data);
        setGames(data.data.reverse());
      });
    axios
      .get("http://35.153.97.187:8080/teams")
      .then((response) => response.data)
      .then((data) => {
        getTeamLogo(data.data);
      });
    axios
      .get("http://35.153.97.187:8080/teams/" + TeamName)
      .then((response) => response.data)
      .then((data) => {
        setTeamData(data.data[0]);
        setIsLoaded(true);
      });
  }, [isLoaded]);

  const handleButton1 = () => {
    let num = 0;
    rawData.forEach((e) => {
      num += e.iscloser;
    });
    setcloser(num);
    setIsOpen(!isOpen);
  };
  const handleButton2 = () => {
    let num = 0;
    rawData.forEach((e) => {
      num += e.iscorrect;
    });
    setCorrect(num);
    setIsOpen(!isOpen);
  };
  const accordions = games.map((match) => {
    return (
      <Accordion className={classes.accordion}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <img src={match.homelogo} width="80" height="100%" />
          <Typography
            align="left"
            className={classes.secondHeading}
            style={{
              color: match.home == match.pick ? "#00adb5" : "#000000",
            }}
          >
            {match.home != teamData.school ? (
              <Link href={"/Teams/" + match.home} color="inherit">
                {match.home}
              </Link>
            ) : (
              match.home
            )}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {match.homescore} vs {match.awayscore}
          </Typography>
          <Typography
            align="right"
            className={classes.secondHeading}
            style={{
              color: match.away == match.pick ? "#00adb5" : "#000000",
            }}
          >
            {match.away != teamData.school ? (
              <Link href={"/Teams/" + match.away} color="inherit">
                {match.away}
              </Link>
            ) : (
              match.away
            )}
          </Typography>
          {/* <Avatar
            alt="Away Team"
            variant="rounded"
            src={match.awaylogo}
            className={classes.medium}
          /> */}
          <img src={match.awaylogo} width="80" height="100%" />
        </AccordionSummary>
        <AccordionDetails align="center">
          <div className={classes.column}>
            <Typography>
              Date:{" "}
              {
                ((date = new Date(match.time)),
                date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear() +
                  " " +
                  date.getHours() +
                  ":" +
                  date.getMinutes() +
                  ":" +
                  date.getSeconds())
              }
            </Typography>
          </div>
          <div className={classes.column} align="center">
            <Typography>Spread: {match.spread}</Typography>
            <Typography>Actual Score: {match.finalresult}</Typography>
          </div>

          <div className={classes.column} align="center">
            <Typography>Value: {match.value}</Typography>
            <Typography>Level: {match.level}</Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  });

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
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
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

        <Card>
          <CardHeader title={teamData.school} />

          {/* <Image
                    src={teamLogo}
                    onClick={() => console.log('onClick')}
                    aspectRatio={(16/9)}
                    disableSpinner
                /> */}
          <CardMedia
          // className={classes.media}
          // height="140"
          // image={teamLogo}
          // title="Paella dish"
          >
            {/* <Image src={teamLogo} className={classes.logo} style={width='12%'}/> */}
            <Paper variant="outlined">
              <img src={teamLogo} />
            </Paper>
            {/* <CardMedia
                className={classes.media}
                image={teamLogo}
                title="Team Image"
                /> */}
          </CardMedia>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant='h4' align='center'>Rank</Typography>
                <Typography variant='h3' align='center'>{teamData.ranking}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h4' align='center'>Wins</Typography>
                <Typography variant='h3' align='center'>{teamData.wins}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h4' align='center'>Losses</Typography>
                <Typography variant='h3' align='center'>{teamData.losses}</Typography>
              </Grid>

              <Grid item xs={12} md={7} lg={7}>
                <Typography>
                  {!isOpen && (
                    <Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleButton2}
                      >
                        See correct
                      </Button>
                      <PieChart
                        correct={closer}
                        incorrect={length - closer}
                        name="close"
                      />
                    </Typography>
                  )}
                  {isOpen && (
                    <Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleButton1}
                      >
                        See closer
                      </Button>
                      <PieChart
                        correct={correct}
                        incorrect={length - correct}
                        name="correct"
                      />
                    </Typography>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {accordions}

          {/* ))} */}
        </Card>

        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
