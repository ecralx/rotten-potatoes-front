import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  listItem: {
    "&:hover": {cursor: 'pointer'},
  }
}));

export default function ShowsList({ shows }) {
  const classes = useStyles();
  const history = useHistory();

  const goToShow = (id) => {
    history.push(`/show/${id}`)
  };

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Similar Shows
        </ListSubheader>
      }
    >
      {shows.map(({ tmdb_id: id, poster_path: mediaPath, name, vote_average: voteAverage}) => (
        <React.Fragment key={id}>  
          <ListItem className={classes.listItem} alignItems="flex-start" onClick={() => goToShow(id)}>
            <ListItemAvatar>
              <Avatar alt={name} src={mediaPath ? `https://image.tmdb.org/t/p/w500/${mediaPath}` : 'https://via.placeholder.com/500?text=Please%20Wait'} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {voteAverage}/10
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

ShowsList.propTypes = {
  shows: PropTypes.array,
};
