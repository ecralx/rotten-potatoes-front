  
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoadingIndicator from '../LoadingIndicator';
import ShowDetailsCard from '../ShowDetailsCard';
import ShowsList from '../ShowsList/ShowsList';

const useStyles = makeStyles({
  root: {
    padding: '20px 0',
  },
});

const ShowDetailsGrid = ({ show }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={4}>
      <Grid item
        xs={12} sm={12} md={8} lg={8} xl={8}
      >
      {(show && !show.loading) ? (
        <ShowDetailsCard
          id={show.tmdb_id}
          name={show.name}
          overview={show.overview}
          mediaPath={show.poster_path ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : 'https://via.placeholder.com/500?text=Please%20Wait'}
          voteAverage={show.vote_average}
        />
      ) : (
        <LoadingIndicator />
      )}
      </Grid>
      <Grid key={2} item
        xs={12} sm={12} md={4} lg={4} xl={4}
      >
        {(show && !show.loadingSimilar)
          ? (
            <ShowsList shows={show.similars ? show.similars.slice(0, 5) : []} />
          ) : (
            <LoadingIndicator />
        )}
      </Grid>
    </Grid>
  );
};

ShowDetailsGrid.propTypes = {
  show: PropTypes.object,
};

export default ShowDetailsGrid;