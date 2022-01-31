import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    // history.go(`/${user?.username}/admin`)
    return <Redirect to={`/${user?.username}/admin`} />;
    }

  return (
    <div className='main-login'>
    <form className="login-form" onSubmit={onLogin}>
      <h1>Log in to your account</h1>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button type='submit'>Login</button>
    </form>
    <div className='new-here'>
          <h1> New Here?</h1>
          <p>Sign up and have all your links set up in minutes!</p>
          <a href="/sign-up">Sign up</a>
    </div>
    </div>
  );
};

export default LoginForm;
