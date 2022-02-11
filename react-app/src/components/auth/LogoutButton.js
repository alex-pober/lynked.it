import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearAllLinks } from '../../store/link';
import { clearAllMenus } from '../../store/menu';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout());
    dispatch(clearAllLinks());
    dispatch(clearAllMenus())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
