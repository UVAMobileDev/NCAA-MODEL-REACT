import React from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
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
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Chip from "@mui/material/Chip";
import { mainListItems, secondaryListItems } from "./components/listItems";

import TeamCard from "./components/TeamCard";

import { red } from "@material-ui/core/colors";

import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import { TextField } from "@material-ui/core";

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
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },

  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.black, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },

  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },

  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

export default function TeamList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [teamInfo, setTeamInfo] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [teamList, setTeamList] = React.useState([]);
  const [allTeamName, setAllTeamName] = React.useState([]);

  // const [state, setState] = React.useState({
  //   name: '',
  // });

  //For Team Selector
  const [apiurl, setApiUrl] = React.useState(
    "http://35.153.97.187:8080/teams/Virginia"
  );

  const [state, setState] = React.useState("Virginia");

  const [age, setAge] = React.useState("Virginia");

  const handleChange = (event) => {
    // console.log("What is change word: "+event.target.value)
    setAge(event.target.value);
    setApiUrl("http://35.153.97.187:8080/teams/" + event.target.value);
  };
  const [filter, setFilter] = React.useState("");

  var filterstrings = [];
  var regex = new RegExp(filterstrings.join("|"), "i");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const [allTeam, setAllTeam] = React.useState([]);

  const handleTeamChange = (event) => {
    const team = event.target.name;
    setState({
      ...state,
      [team]: event.target.value,
    });
    // setTeam(event.target.name);

    setApiUrl("http://35.153.97.187:8080/teams/" + team);
  };
  React.useEffect(() => {
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        setTeamInfo(data.data[0]);
      });

    var teamapiurl = "http://35.153.97.187:8080/teams/";
    axios
      .get(teamapiurl)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        // setTeamList(data.data);
        // console.log(data.data);
        var temp = [];
        data.data.forEach((element) => temp.push(element.team_name));
        setAllTeamName(temp);
        setAllTeam(data.data);
      });
  }, [apiurl]);

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

        <Container maxWidth="lg" className={classes.container}>
          <Toolbar>
            <div className={classes.searchContainer}>
              <SearchIcon className={classes.searchIcon} />
              <TextField
                onChange={handleSearchChange}
                className={classes.searchInput}
                label="Team Name"
                variant="standard"
              />
            </div>
          </Toolbar>
          {isLoaded ? (
            <Grid container className={classes.root} spacing={2}>
              {allTeam.map(
                (team) => (
                  (filterstrings = [
                    team.team_name,
                    team.abbr.three_letter,
                    team.abbr.four_letter,
                  ]),
                  (regex = new RegExp(filter, "i")),
                  (console.log(filter),
                  regex.test(filterstrings.join("|"))) && (
                    <Grid item xs={12} key={team.team_name}>
                      <TeamCard key={team.team_name} cardInfo={team}>
                        {" "}
                      </TeamCard>
                    </Grid>
                  )
                )
              )}
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </Container>
      </main>
    </div>
  );
}
