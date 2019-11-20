  
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ShowCard from '../ShowCard';

const useStyles = makeStyles({
    root: {
        paddingTop: '24px'
    }
});

export default function ShowsGrid({ shows }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={4}>
    {shows.map( (show) => (
        <Grid key={show.tmdb_id} item
            xs={12} sm={6} md={6} lg={6} xl={6}
        >
            <ShowCard
              id={show.tmdb_id}
              name={show.name}
              overview={(show.overview || ''). length > 200 ? show.overview.substring(0, 200) + '...' : show.overview}
              mediaPath={show.poster_path ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : ''}
              voteAverage={show.vote_average}
            />
        </Grid>
    ))}
    </Grid>
  );
}

ShowsGrid.propTypes = {
    shows: PropTypes.array,
};