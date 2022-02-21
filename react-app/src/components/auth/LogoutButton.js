import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearAllLinks } from '../../store/link';
import { clearAllMenus } from '../../store/menu';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout());
    dispatch(clearAllLinks());
    dispatch(clearAllMenus())
  };

  return <button onClick={onLogout} className="logout-button">Logout&nbsp;<FiLogOut/></button>;
};

export default LogoutButton;
