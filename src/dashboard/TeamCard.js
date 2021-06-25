import { Card, CardContent, CardHeader, CardActions, Typography, IconButton, makeStyles } from '@material-ui/core';

import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  

export default function TeamCard( {cardInfo} ) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [teamData, setTeamData] = React.useState({});
    const history = useHistory();
    

    const handleExpandClick = () => {
        setExpanded(!expanded);
        getTeamInfo();
    };
    var teamapiurl = "http://3.84.121.75:8080/teams/" + cardInfo.team_name;
    const getTeamInfo = () => {
        axios
        .get(teamapiurl)
        .then((response) => response.data)
        .then((data) => {
            console.log("data");
            console.log(data);
            setIsLoaded(true);
            setTeamData(data.data[0])
        
      });


    }

    React.useEffect(() => {
        if (expanded){
            getTeamInfo();

        }

    
      }, [expanded]);
    
    return  (
        <Card elevation={3}>
            {/* <CardActionArea > */}
                <CardActions disableSpacing>
                    {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton> */}
                    <CardHeader
                    title={cardInfo.team_name}
                    subheader={cardInfo.abbr.three_letter+"/"+cardInfo.abbr.four_letter}
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
                        <Typography paragraph>Rank: {teamData.ranking}</Typography>
                        <Typography paragraph>Wins: {teamData.wins}</Typography>
                        <Typography paragraph>Losses: {teamData.losses}</Typography>
                        <Button onClick={() => history.push(`Teams/${cardInfo.team_name}`)}
                            size="small" color="primary">
                            Learn More
                        </Button>
                    </CardContent>
                </Collapse>
            {/* </CardActionArea> */}
        </Card>

    )
}