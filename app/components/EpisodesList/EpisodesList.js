import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  episodeNumber: {
    display: 'inline',
    border: '1px solid black',
    borderRadius: '50%',
    padding: '5px',
    margin: 'auto 5px'
  },
  inline: {
    display: 'inline',
    marginRight: '5px',
  },
}));

export default function AlignItemsList({ episodes }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {episodes.map(({ episode_number: episodeNumber, air_date: airDate, name, overview }) => (
        <React.Fragment key={`episode-${episodeNumber}`}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={`#${episodeNumber} - ${name}`}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {airDate}
                  </Typography>
                  {overview}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}