/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import ShowsDisplay from 'components/ShowsDisplay';
import './style.scss';

export default function HomePage({ fetchShows, addToFavourites, removeFromFavourites, favouriteShows }) {
  /**
   * Go fetch the shows
   */
  useEffect(() => {
    if (!favouriteShows) {
      fetchShows();
    }
  }, []);

  return (
    <article>
      <Helmet>
        <title>My Favourites</title>
        <meta name="description" content="My favourite tv-shows" />
      </Helmet>
      <div className="home-page">
        <section>
          <h2>My Favourite Shows</h2>
          <ShowsDisplay
            {...(favouriteShows || {})}
            showMore={() => fetchShows((favouriteShows || {page : 0}).page + 1)}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
          />
        </section>
      </div>
    </article>
  );
};

HomePage.propTypes = {
  favouriteShows: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchShows: PropTypes.func,
};
