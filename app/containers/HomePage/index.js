import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectDiscoveryShows,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadDiscoveryShows } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  fetchShows: () => {
    dispatch(loadDiscoveryShows());
  }
});

const mapStateToProps = createStructuredSelector({
  discoveryShows: makeSelectDiscoveryShows(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
