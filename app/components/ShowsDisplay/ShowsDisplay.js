import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ShowsGrid from '../ShowsGrid';
import LoadingIndicator from '../LoadingIndicator';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  actions: {
    margin: '10px 0',
    textAlign: 'center',
  }
}));

const ShowsDisplay = ({
  loading,
  error,
  totalResults,
  page,
  results,
  showMore,
  addToFavourites,
  removeFromFavourites
}) => {
  if (error !== false) {
    return (<p>{ error }</p>);
  }
  const classes = useStyles();

  return (
    <section className={classes.root}>
      {!!results && results.length > 0 && (
        <ShowsGrid shows={ results } addToFavourites={addToFavourites} removeFromFavourites={removeFromFavourites}/>
      )}
      {!!loading && (
        <LoadingIndicator />
      )}
      {!loading && !!results && results.length > 0 && (results.length < totalResults) && (
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={showMore}
          >
            Display more
          </Button>
        </div>
      )}
    </section>
  );
};

ShowsDisplay.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  repos: PropTypes.any,
  removeFromFavourites: PropTypes.func,
  addToFavourites: PropTypes.func,
};

export default ShowsDisplay;
