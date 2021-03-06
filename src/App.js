import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/userAction';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import settings from './pages/settings';
import validateUser from './pages/validateUser';
import resendConfirmation from './pages/resendConfirmation';
import checkEmail from './pages/checkEmail';
import forgetPassword from './pages/forgetPassword';
import resetPassword from './pages/resetPassword';

//components
import Navbar from './components/Navbar';
import Feedback from './components/Feedback';
import PostEditor from './components/PostEditor';
import IconMenu from './components/IconMenu';
import MiniLogin from './components/MiniLogin';
import UsersPanel from './components/UsersPanel';
import PostDialog from './components/PostDialog';
//others
import {SET_AUTHENTICATED} from './redux/types';
import {theme} from './util/style';

const token = localStorage.token;

if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <div className='App'>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <IconMenu />
            <div className='container'>
              <Switch>
                <Route path='/user/:username' component={user} />
                <Route exact path='/' component={home} />
                <Route exact path='/settings' component={settings} />
                <Route exact path='/login' component={login} />
                <Route exact path='/signup' component={signup} />

                <Route
                  exact
                  path='/resendConfirmation'
                  component={resendConfirmation}
                />
                <Route exact path='/checkEmail' component={checkEmail} />
                <Route
                  exact
                  path='/forgetPassword'
                  component={forgetPassword}
                />
                <Route path='/validateUser/:token' component={validateUser} />
                <Route path='/resetPassword/:token' component={resetPassword} />
              </Switch>
            </div>
          </Router>

          <Feedback />
          <PostEditor />
          <MiniLogin />
          <UsersPanel />
          <PostDialog />
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
