
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"

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
      <img src="https://i.imgur.com/rRbbNJv.png"></img>
      <div>
      {!user?.id && (
      <>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>

        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </>
       )}
      {user?.id && (
      <NavLink to={`/${user.username}/admin/`} exact={true}>
        Manage Links
      </NavLink>
      )}

      {user?.menu == true && (
      <NavLink to={`/${user.username}/admin/menu`} exact={true}>
        Manage Menus
      </NavLink>
      )}

      {user?.id && (
      <NavLink to={`/${user.username}/account-info`} exact={true}>
        Account Info
      </NavLink>
      )}
      </div>
      {user?.id && (
        <LogoutButton />
      )}
    </nav>
  );
}

export default NavBar;
