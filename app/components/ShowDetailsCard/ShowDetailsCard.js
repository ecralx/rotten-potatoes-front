import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const ShowDetailsCard = ({
  id,
  name,
  overview,
  mediaPath,
  voteAverage,
  isLiked,
  genres,
  addToFavourites,
  removeFromFavourites,
}) => {
  const classes = useStyles();

  
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
    <Card key={id} className={classes.card}>
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
        <Typography variant="body2" color="textSecondary" component="p">
          Genres: {(genres || []).map(({ name }) => name).join(', ')}.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={isLiked ? removeFavourite : addFavourite}>
          <FavoriteIcon color={isLiked ? 'primary' : 'inherit'} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ShowDetailsCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  overview: PropTypes.string,
  mediaPath: PropTypes.string,
  voteAverage: PropTypes.number,
  isLiked: PropTypes.bool,
};

export default ShowDetailsCard;