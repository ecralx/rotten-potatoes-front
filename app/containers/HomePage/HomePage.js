/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
//import ShowsList from 'components/ShowsList';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * Go fetch the shows
   */
  componentDidMount() {
    const { fetchShows, discoveryShows } = this.props;
    
    if (!discoveryShows) {
      fetchShows();
    }
  }

  render() {
    const {
      discoveryShows,
    } = this.props;
    const showsListProps = { ...discoveryShows };

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
            {/*<ShowsList {...showsListProps} />*/}
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  discoveryShows: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchShows: PropTypes.func,
};
