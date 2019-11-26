import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectSearchShows } from 'containers/App/selectors';
import { loadSearchShows, addFavourite, removeFavourite } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import SearchPage from './SearchPage';

const mapDispatchToProps = (dispatch) => ({
  fetchShows: (query, page = 1) => {
    dispatch(loadSearchShows(query, page));
  },
  addToFavourites: (id) => {
    dispatch(addFavourite(id));
  },
  removeFromFavourites: (id) => {
    dispatch(removeFavourite(id));
  },
});

const mapStateToProps = createStructuredSelector({
  searchShows: makeSelectSearchShows(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(SearchPage);
export { mapDispatchToProps };
