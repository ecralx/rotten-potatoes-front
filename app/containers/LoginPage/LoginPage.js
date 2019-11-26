/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.scss';

const validEmail = (email) => (
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
)

const validPassword = (password) => (
  password.length >= 6
)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    '&>*' : {
      width: '100%',
      textAlign: 'center',
      margin: '5px 0'
    }
  },
  error: {
    display: 'block',
    width: '100%',
    color: 'red'
  }
}));

export default function LoginPage({ loginUser, registerUser, error }) {
  const classes = useStyles();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  const login = () => {
    if(validEmail(loginEmail) && validPassword(loginPassword)) {
      loginUser(loginEmail, loginPassword);
    }
  }
  
  const register = () => {
    if(validEmail(registerEmail) && validPassword(registerPassword)) {
      registerUser(registerEmail, registerPassword);
    }
  }
  
  return (
    <article>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login or register" />
      </Helmet>
      <div className="home-page">
        <section className="centered">
          <h2>Welcome to Rotten Potatoes</h2>
          <p>
            A minimalistic website to never forget about your favourite <i>tv-shows</i>
          </p>
        </section>
        <section className={classes.root}>
          <Grid container spacing={1}>
            {error && error.message && (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="body2" className={classes.error}>
                    { error.message }
                  </Typography>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h4" gutterBottom>
                  Login
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField type="email" id="standard-basic" label="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                  <TextField type="password" id="standard-password-input" label="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                  <Button variant="contained" color="primary" onClick={login}>
                    Login
                  </Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h4" gutterBottom>
                  Register
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField type="email" id="standard-basic2" label="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                  <TextField type="password" id="standard-password-input2" label="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
                  <Button variant="contained" color="primary" onClick={register}>
                    Register
                  </Button>
                </form>
                {registerEmail && !validEmail(registerEmail) && (
                  <Typography variant="body2" className={classes.error}>
                    The email address isn't valid. 
                  </Typography>
                )}
                {registerPassword && !validPassword(registerPassword) && (
                  <Typography variant="body2" className={classes.error}>
                    The password must be at least 6 characters long. 
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </section>
      </div>
    </article>
  );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func,
  registerUser: PropTypes.func,
};
