import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicImg, setprofilePicImg] = useState('');
  const [bannerPicImg, setbannerPicImg] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [menu, setmenu] = useState();
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const validUrl = require('valid-url');
  const dispatch = useDispatch();

  const validate = () => {
    const errors = [];

    if (!username) {
      errors.push("Username can't be empty")
    }
    if (!validUrl.isUri(profilePicImg) && !profilePicImg == "") {
      errors.push("Profile Picture URL is not valid")
    }
    if (!validUrl.isUri(bannerPicImg) && !bannerPicImg == "") {
      errors.push("Banner Picture URL is not valid")
    }

    return errors;
  }
  const onSignUp = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (errors.length > 0) return setErrors(errors);
    
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, name, bio, profilePicImg, bannerPicImg, phoneNumber, menu));
      if (data) {
        setErrors(data)
      }
    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateprofilePicImg = (e) => {
    setprofilePicImg(e.target.value);
  };

  const updatebannerPicImg = (e) => {
    setbannerPicImg(e.target.value);
  };

  const updatephoneNumber = (e) => {
    setphoneNumber(e.target.value);
  };

  const updatemenu = (e) => {
    setmenu(e.target.checked);
  };

  if (user) {
    return <Redirect to={`/${user?.username}/admin`} />;
    }


  return (
    <div className='main-login'>
    <div className='new-here'>
          <h1>Almost there</h1>
          <p>Just a few questions and you'll be making links in no time!</p>
          <a href="/login">Log in</a>
    </div>
    <form className="login-form" onSubmit={onSignUp}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          placeholder="Username"
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder="Email"
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder="Password"
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder="Repeat Password"
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder="Name"
          type='text'
          name='name'
          onChange={updateName}
          value={name}
          required={true}
        ></input>
      </div>
      <div>
        <textarea
          placeholder="Bio"
          type='text'
          name='bio'
          onChange={updateBio}
          value={bio}
        ></textarea>
      </div>
      <div>
        <input
          placeholder="Profile Picture URL"
          type='text'
          name='profilePicImg'
          onChange={updateprofilePicImg}
          value={profilePicImg}
        ></input>
      </div>
      <div>
        <input
          placeholder="Background Picture URL"
          type='text'
          name='bannerPicImg'
          onChange={updatebannerPicImg}
          value={bannerPicImg}
        ></input>
      </div>
      <div>
        <input
          placeholder="Phone Number"
          type='integer'
          name='phoneNumber'
          onChange={updatephoneNumber}
          value={phoneNumber}
          required={true}
        ></input>
      </div>
      <div className='checkbox'>
        <input
          type='checkbox'
          name='menu'
          onChange={updatemenu}
          value={menu}
          defaultChecked={false}
          ></input>
          <p>Check this option if you want menu category. Ideal for resturants.</p>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
