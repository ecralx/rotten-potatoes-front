import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectShowDetails } from 'containers/App/selectors';
import { loadShowDetails } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import ShowPage from './ShowPage';

const mapDispatchToProps = (dispatch) => ({
  fetchShow: (id) => {
    dispatch(loadShowDetails(id));
  }
});

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  show: makeSelectShowDetails(ownProps.match.params.id),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'show', reducer });
const withSaga = injectSaga({ key: 'show', saga });

export default compose(withReducer, withSaga, withConnect)(ShowPage);
export { mapDispatchToProps };
