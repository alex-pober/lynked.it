import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const DemoButton = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const history = useHistory();
  const handleDemo = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io'
    const password = 'password'
    await dispatch(login(email, password));

  };

  if (user) {
    // history.go(`/${user?.username}/admin`)
    return <Redirect to={`/${user?.username}/admin`} />;
    }

  return <button onClick={handleDemo}>Demo User</button>;
}


export default DemoButton;
