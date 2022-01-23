import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
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
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
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
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Name</label>
        <input
          type='text'
          name='name'
          onChange={updateName}
          value={name}
        ></input>
      </div>
      <div>
        <label>Bio</label>
        <textarea
          type='text'
          name='bio'
          onChange={updateBio}
          value={bio}
        ></textarea>
      </div>
      <div>
        <label>Profile Picture URL</label>
        <input
          type='text'
          name='profilePicImg'
          onChange={updateprofilePicImg}
          value={profilePicImg}
        ></input>
      </div>
      <div>
        <label>Banner Picture URL</label>
        <input
          type='text'
          name='bannerPicImg'
          onChange={updatebannerPicImg}
          value={bannerPicImg}
        ></input>
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type='integer'
          name='phoneNumber'
          onChange={updatephoneNumber}
          value={phoneNumber}
        ></input>
      </div>
      <div>
        <label>Menu</label>
        <input
          type='checkbox'
          name='menu'
          onChange={updatemenu}
          value={menu}
          defaultChecked={false}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
