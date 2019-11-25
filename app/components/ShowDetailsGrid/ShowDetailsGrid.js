  
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoadingIndicator from '../LoadingIndicator';
import ShowDetailsCard from '../ShowDetailsCard';

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
        xs={12} sm={12} md={9} lg={9} xl={9}
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
        xs={12} sm={12} md={3} lg={3} xl={3}
      >
        {(show && !show.loadingSimilar)
          ? (
            <span>b</span>
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