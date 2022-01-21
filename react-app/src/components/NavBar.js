
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => {
    if (state.session.user) {
      return state.session.user
    }
  })
  // const username = useSelector(state => state.session?.user)
  // console.log(username.username)
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          {user?.id && (
          <NavLink to={`/${user.username}/account-info`} exact={true}>
            AccountInfo
          </NavLink>
          )}
        </li>
        <li>
          {user?.id && (
            <LogoutButton />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
