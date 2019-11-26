import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectUserError } from 'containers/App/selectors';
import { loginUser, registerUser } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  registerUser: (email, password) => dispatch(registerUser(email, password)),
});

const mapStateToProps = createStructuredSelector({
  error: makeSelectUserError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withReducer, withSaga, withConnect)(LoginPage);
export { mapDispatchToProps };
