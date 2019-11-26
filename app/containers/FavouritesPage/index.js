import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectFavouriteShows } from 'containers/App/selectors';
import { loadFavouriteShows, removeFavourite, addFavourite } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import FavouritesPage from './FavouritesPage';

const mapDispatchToProps = (dispatch) => ({
  fetchShows: (page = 1) => {
    dispatch(loadFavouriteShows(page));
  },
  addToFavourites: (id) => {
    dispatch(addFavourite(id));
  },
  removeFromFavourites: (id) => {
    dispatch(removeFavourite(id));
  },
});

const mapStateToProps = createStructuredSelector({
  favouriteShows: makeSelectFavouriteShows(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(FavouritesPage);
export { mapDispatchToProps };
