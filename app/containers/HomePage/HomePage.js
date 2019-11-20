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

export default function HomePage({ fetchShows, discoveryShows }) {
  /**
   * Go fetch the shows
   */
  useEffect(() => {
    if (!discoveryShows) {
      fetchShows();
    }
  }, []);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Discover new tv shows" />
      </Helmet>
      <div className="home-page">
        <section className="centered">
          <h2>Welcome to Rotten Potatoes</h2>
          <p>
            A minimalistic website to never forget about your favourite <i>tv-shows</i>
          </p>
        </section>
        <section>
          <h2>Discovery</h2>
          <p>Discover new tv-shows</p>
          <ShowsDisplay
            {...(discoveryShows || {})}
            showMore={() => fetchShows((discoveryShows || {page : 0}).page + 1)}
          />
        </section>
      </div>
    </article>
  );
};

HomePage.propTypes = {
  discoveryShows: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchShows: PropTypes.func,
};
