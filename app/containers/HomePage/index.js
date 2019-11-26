import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectDiscoveryShows } from 'containers/App/selectors';
import { loadDiscoveryShows, resetDiscoveryShows, removeFavourite, addFavourite } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  fetchShows: (page = 1, genres = '') => {
    dispatch(loadDiscoveryShows(page, genres));
  },
  resetShows: () => {
    dispatch(resetDiscoveryShows());
  },
  addToFavourites: (id) => {
    dispatch(addFavourite(id));
  },
  removeFromFavourites: (id) => {
    dispatch(removeFavourite(id));
  },
});

const mapStateToProps = createStructuredSelector({
  discoveryShows: makeSelectDiscoveryShows(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
