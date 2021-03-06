import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ShowCard({
    id,
    name,
    overview,
    mediaPath,
    voteAverage,
    isLiked,
    addToFavourites,
    removeFromFavourites,
}) {
  let history = useHistory();
  const classes = useStyles();
  const goToShow = () => {
    history.push(`show/${id}`);
  }
  
  const addFavourite = () => {
    if(id){
      addToFavourites(id);
    }
  }

  const removeFavourite = () => {
    if(id){
      removeFromFavourites(id);
    }
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={goToShow}>
        <CardMedia
          className={classes.media}
          image={mediaPath}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h3">
            {voteAverage}/10
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={isLiked ? removeFavourite : addFavourite}>
          <FavoriteIcon color={isLiked ? 'primary' : 'inherit'}/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

ShowCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  overview: PropTypes.string,
  mediaPath: PropTypes.string,
  voteAverage: PropTypes.number,
  removeFromFavourites: PropTypes.func,
  addToFavourites: PropTypes.func,
  isLiked: PropTypes.bool,
};
