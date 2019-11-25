/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import ShowDetailsGrid from 'components/ShowDetailsGrid';
import './style.scss';

export default function ShowPage({ fetchShow, show }) {
  /**
   * Go fetch the shows
   */
  const { id } = useParams();

  useEffect(() => {
    if (!(show && show.name)) {
      fetchShow(id);
    }
  }, []);

  return (
    <article>
      <Helmet>
        <title>{ (show && show.name) || 'Loading' }</title>
        <meta name="description" content={`Know more about ${(show && show.name) || 'the show'}`} />
      </Helmet>
      <div className="home-page">
        <ShowDetailsGrid show={show || {}} />
      </div>
    </article>
  );
};

ShowPage.propTypes = {
  show: PropTypes.object,
  fetchShows: PropTypes.func,
};
