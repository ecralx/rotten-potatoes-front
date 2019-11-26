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

export default function SearchPage({ fetchShows, searchShows, match }) {
  /**
   * Go fetch the shows
   */
  useEffect(() => {
    if (!searchShows) {
      fetchShows(match.params.query);
    }
  }, [match.params.query]);

  return (
    <article>
      <Helmet>
        <title>Searching for {match.params.query}</title>
        <meta name="description" content={`Searching for ${match.params.query}`} />
      </Helmet>
      <div className="home-page">
        <section>
          <h2>Searching for: "{match.params.query}" {searchShows && Number(searchShows.totalResults) >= 0 ? `(${searchShows.totalResults} results)` : ''}</h2>
          <ShowsDisplay
            {...(searchShows || {})}
            showMore={() => fetchShows(match.params.query, (searchShows || {page : 0}).page + 1)}
          />
        </section>
      </div>
    </article>
  );
};

SearchPage.propTypes = {
  searchShows: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchShows: PropTypes.func,
  match: PropTypes.object,
};
