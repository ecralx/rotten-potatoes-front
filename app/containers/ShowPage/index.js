import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectShowDetails, makeSelectDetailedShows } from 'containers/App/selectors';
import {
  loadShowDetails,
  loadShowSimilars,
  loadShowSeason,
  removeFavourite,
  addFavourite
} from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import ShowPage from './ShowPage';

const mapDispatchToProps = (dispatch) => ({
  fetchShow: (id) => {
    dispatch(loadShowDetails(id));
    dispatch(loadShowSimilars(id));
  },
  fetchSeason: (id, seasonNumber) => {
    dispatch(loadShowSeason(id, seasonNumber));
  },
  addToFavourites: (id) => {
    dispatch(addFavourite(id));
  },
  removeFromFavourites: (id) => {
    dispatch(removeFavourite(id));
  },
});

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  show: makeSelectShowDetails(ownProps.match.params.id),
  shows: makeSelectDetailedShows()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'show', reducer });
const withSaga = injectSaga({ key: 'show', saga });

export default compose(withReducer, withSaga, withConnect)(ShowPage);
export { mapDispatchToProps };
