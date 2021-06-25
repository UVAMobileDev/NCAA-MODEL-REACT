import React from "react";
import axios from 'axios';

import {Route, Switch} from "react-router-dom";
import {Button, Card, CardContent, CardHeader, CardActions, Typography, IconButton, makeStyles } from '@material-ui/core';
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Image from 'material-ui-image';

import Divider from "@material-ui/core/Divider";
import CardMedia from '@material-ui/core/CardMedia';
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Copyright from "./Copyright";
import Title from "./Title";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
    useParams
  } from "react-router-dom";



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
  table: {
    minWidth: 650,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    data.forEach(e =>{
        if (e.team_name == TeamName){
            setTeamLogo(e.logoURL);
        }
    }
    )
  }


  const [teamLogo, setTeamLogo] = React.useState('');

  const [isLoaded,setIsLoaded] = React.useState('false');
  const [teamData,setTeamData] = React.useState({});
  const [games, setGames] = React.useState([])
  let { TeamName } = useParams();

  var teamapiurl = "http://localhost:8080/schedule/Games/"+TeamName;

    React.useEffect(() => {
        // axios
        // .get("http://3.84.121.75:8080/schedule/games")
        // .then((response) => response.data)
        // .then((data) => {
        //     setGames(data.data)
        // });
        axios
        .get(teamapiurl)
        .then((response) => response.data)
        .then((data) => {
            setGames(data.data)
        });
        axios
        .get('http://localhost:8080/teams')
        .then((response) => response.data)
        .then((data) => {
            getTeamLogo(data.data)
        });
        ;
        axios
        .get('http://localhost:8080/teams/'+TeamName)
        .then((response) => response.data)
        .then((data) => {
            setTeamData(data.data[0])
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
        <Grid item xs={10}>

            <Card>
                <CardHeader
                    title={teamData.school}
                    />

                {/* <Image
                    src={teamLogo}
                    onClick={() => console.log('onClick')}
                    aspectRatio={(16/9)}
                    disableSpinner
                /> */}
                <CardMedia
                    className={classes.media}
                    image={teamLogo}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography paragraph>Rank: {teamData.ranking}</Typography>
                    <Typography paragraph>Wins: {teamData.wins}</Typography>
                    <Typography paragraph>Losses: {teamData.losses}</Typography>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardContent>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell> Home Team </TableCell>
                            <TableCell> Away Team </TableCell>
                            <TableCell align="right">Pick</TableCell>
                            <TableCell align="right">Home</TableCell>
                            <TableCell align="right">Away</TableCell>
                            <TableCell align="right">Spread</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {games.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.home}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.away}
                            </TableCell>
                            <TableCell align="right">{row.pick}</TableCell>
                            <TableCell align="right">{row.homescore}</TableCell>
                            <TableCell align="right">{row.awayscore}</TableCell>
                            <TableCell align="right">{row.spread}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Grid> 
            <Container maxWidth="lg" className={classes.container}>
            <Box pt={4}>
                <Copyright />
            </Box>
            </Container>
        
      </main>
    </div>
  );
}