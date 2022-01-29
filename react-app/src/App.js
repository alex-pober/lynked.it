import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import AccountInfo from './components/auth/AccountInfo';
import Links from './components/links/index'
import Menu from './components/menu/index'
import EditLinkForm from './components/EditLinks/index'
import PublicLinks from './components/PublicLinks';
import SplashPage from './components/LandingPage'
import PublicMenus from './components/PublicMenus';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
      <Route path='/' exact={true} >
          <SplashPage />
      </Route>
      <Route path='/login' exact={true}>
        <LoginForm />
      </Route>
      <Route path='/sign-up' exact={true}>
        <SignUpForm />
      </Route>
      <ProtectedRoute path='/:usernameParams/account-info' exact={true}>
        <AccountInfo />
      </ProtectedRoute>
      <ProtectedRoute path='/:usernameParams/admin' exact={true}>
        <Links />
      </ProtectedRoute>
      <ProtectedRoute path='/:usernameParams/admin/menu' exact={true}>
        <Menu />
      </ProtectedRoute>
      <ProtectedRoute path='/links/:id/edit' exact={true}>
        <EditLinkForm />
      </ProtectedRoute>
      <ProtectedRoute path='/users' exact={true} >
        <UsersList/>
      </ProtectedRoute>
      <ProtectedRoute path='/users/:userId' exact={true} >
        <User />
      </ProtectedRoute>
      <Route path='/:usernameParams/' exact={true}>
        <PublicLinks />
      </Route>
      <Route path='/:usernameParams/menu' exact={true}>
        <PublicMenus />
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
