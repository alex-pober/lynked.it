import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearAllLinks } from '../../store/link';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout());
    dispatch(clearAllLinks());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
