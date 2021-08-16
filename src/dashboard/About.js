import React from "react";
import clsx from "clsx";
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
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
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Copyright from "./Copyright";
import Title from "./Title";
import PastGames from "./PastGamesGenerator.js";
import PastGamesGenerator from "./PastGamesGenerator.js";

const drawerWidth = 240;

function Group(props) {
  const { title, description, classes, members } = props;
  return (
    <div>
      <Typography gutterBottom component="h2" variant="h5">
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Grid container spacing={2} className={classes.container}>
        {members.map((member) => (
          <Grid key={member.name} item xs={12} md={6}>
            <Paper variant="outlined">
              <Grid container wrap="nowrap">
                <Grid item>
                  <CardMedia
                    className={classes.cover}
                    image={`https://github.com/${member.github}.png`}
                    title="Avatar"
                  />
                </Grid>
                <Grid item>
                  <div className={classes.details}>
                    <Typography component="h3" variant="h6">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.flag}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.location}
                    </Typography>
                    <Grid container>
                      {member.github && (
                        <IconButton
                          aria-label="github"
                          component="a"
                          href={`https://github.com/${member.github}`}
                          className={classes.icon}
                        >
                          <GitHubIcon fontSize="inherit" />
                        </IconButton>
                      )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

const modelDesigners = [
  {
    name: 'Nadim El-Jaroudi',
    github: 'nje2494',
    flag: 'Model Founder',
    location: 'Portland, Maine, US',
  },
  {
    name: 'Guy 1',
    github: 'python',
    flag: 'Model Designer',
    location: 'Somewhere, US',
  },
  {
    name: 'Guy 2',
    github: 'python',
    flag: 'Model Designer',
    location: 'Somewhere, US',
  }
];
const devTeam = [
  {
    name: 'Nadim El-Jaroudi',
    github: 'nje2494',
    flag: 'Team Lead',
    location: 'Portland, Maine, US',
  },
  {
    name: 'Mingzhe Wu',
    github: 'MingzheWu418',
    flag: 'Our Rock',
    location: 'Portland, Maine, US',
  },
  {
    name: 'Emmanuel Edu',
    github: 'Eziedu',
    flag: 'Big-Time Baller',
    location: 'Somewhere, US',
  },
  {
    name: 'Jasmine Dogu',
    github: 'jasminedogu',
    flag: 'Script Legend',
    location: 'Somewhere, US',
  },
  {
    name: 'Rudy Schneider',
    github: 'rudyschneider',
    flag: 'Dead Weight',
    location: 'Arlington, Virginia, US',
  }
];
const websiteTeam = [
  {
    name: 'Rudy Schneider',
    github: 'rudyschneider',
    flag: 'Team Lead',
    location: 'Arlington, Virginia, US',
  },
  {
    name: 'Asad Shamsiev',
    github: 'as-4030',
    flag: 'Graphs & Logistics',
    location: 'Somewhere, US',
  },
  {
    name: 'William Ngu',
    github: 'Will-Ngu',
    flag: 'Page Layout & API Designer',
    location: 'Somewhere, US',
  },
  {
    name: 'Yanjin Chen',
    github: 'YanjinChen2023',
    flag: 'Data Analysis',
    location: 'Somewhere, US',
  },
  {
    name: 'Sebastian Cayo',
    github: 'Sedba5',
    flag: 'Script and Database Management',
    location: 'Somewhere, US',
  },
];

const styles = (theme) => ({
  details: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  cover: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(2),
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    fontSize: 18,
    padding: theme.spacing(1),
  },
  container: {
    margin: theme.spacing(2, 0, 4),
  },
});

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

function About(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Group
                  title="About This Site"
                  description={`This website is the brainchild of UVA Development Hub leader Nadim El-Jaroudi.
                  Through years of on and off development, the model was developed as both a pet project and
                  a learning  experience for DevHub interns to get their feet wet in different areas of programming
                  by collaorating on a prediction model designed to beat the Vegas spread of Men's Division I NCAA 
                  Basketball games.`}
                  members={[]}
                  {...props}
                />
              </Paper>
              <Paper className={classes.paper}>
                <Group
                  title="Original Model Architects"
                  description={`The Model was originally created by 
                  the work of these three awesome dudes:`}
                  members={modelDesigners}
                  {...props}
                />
              </Paper>
              <Paper className={classes.paper}>
                <Group
                  title="Model Development Team"
                  description={`Work on the model was continued on and 
                  improved thorugh the work of the following members:`}
                  members={devTeam}
                  {...props}
                />
              </Paper>
              <Paper className={classes.paper}>
                <Group
                  title="Model Website Team"
                  description={`The following members worked to display the Model
                  in the website you see here:`}
                  members={websiteTeam}
                  {...props}
                />
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

export default withStyles(styles)(About);