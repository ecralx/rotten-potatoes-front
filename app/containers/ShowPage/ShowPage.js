/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import ShowDetailsGrid from 'components/ShowDetailsGrid';
import './style.scss';

export default function ShowPage({
  fetchShow,
  fetchSeason,
  addToFavourites,
  removeFromFavourites,
  shows,
  match
}) {
  /**
   * Go fetch the shows
   */
  useEffect(() => {
    fetchShow(match.params.id);
  }, [match.params.id]);
  
  const show = (shows || [])
    .find(({ tmdb_id: id }) => Number(id) === Number(match.params.id))
  const loadSeason = (seasonNumber) => {
    if (match.params.id) {
      fetchSeason(match.params.id, seasonNumber);
    }
  };

  return (
    <article>
      <Helmet>
        <title>{ (show && show.name) || 'Loading' }</title>
        <meta name="description" content={`Know more about ${(show && show.name) || 'the show'}`} />
      </Helmet>
      <div className="home-page">
        <ShowDetailsGrid
          show={show || {}}
          fetchSeason={loadSeason}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
        />
      </div>
    </article>
  );
};

ShowPage.propTypes = {
  show: PropTypes.object,
  match: PropTypes.object,
  fetchShows: PropTypes.func,
};
