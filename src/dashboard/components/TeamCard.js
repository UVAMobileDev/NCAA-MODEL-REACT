import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import axios from "axios";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  card: {
    "&:hover": {
      backgroundColor: "#F1F1EF",
      color: "#141E3C",
    },
  },
}));

export default function TeamCard({ cardInfo }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [teamData, setTeamData] = React.useState({});
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getTeamInfo();
  };
  var teamapiurl = "http://35.153.97.187:8080/teams/" + cardInfo.team_name;
  const getTeamInfo = () => {
    axios
      .get(teamapiurl)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        setTeamData(data.data[0]);
      });
  };

  React.useEffect(() => {
    if (expanded) {
      getTeamInfo();
    }
  }, [expanded]);

  return (
    <Card elevation={3} className={classes.card}>
      {/* <CardActionArea > */}
      <CardActions disableSpacing onClick={handleExpandClick}>
        {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton> */}
        <img src={cardInfo.logoURL} />
        <CardHeader
          title={cardInfo.team_name}
          subheader={
            cardInfo.abbr.three_letter + "/" + cardInfo.abbr.four_letter
          }
          onClick={() => history.push(`Teams/${cardInfo.team_name}`)}
        />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Container maxWidth="lg" className={classes.container}>
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
            </Grid>
          </Container>
          <Button
            onClick={() => history.push(`Teams/${cardInfo.team_name}`)}
            size="medium"
            color="primary"
          >
            Learn More
          </Button>
          
          
        </CardContent>
      </Collapse>
      {/* </CardActionArea> */}
    </Card>
  );
}
