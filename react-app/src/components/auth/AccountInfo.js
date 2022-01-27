import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { deleteAccount, EditProfile } from '../../store/session';
import { logout } from '../../store/session';
import NavBar from "../NavBar"
import "./AccountInfo.css"

const AccountInfo = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicImg, setprofilePicImg] = useState('');
  const [bannerPicImg, setbannerPicImg] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [menu, setmenu] = useState();
  const userSession = useSelector(state => state.session.user);
  const user_id = useSelector(state => state.session?.user?.id);
  const dispatch = useDispatch();
  const history = useHistory()
  const { usernameParams } = useParams()

  useEffect(() => {
    setUsername(userSession.username)
    setEmail(userSession.email)
    setName(userSession.name)
    setBio(userSession.bio)
    setprofilePicImg(userSession.profilePicImg)
    setbannerPicImg(userSession.bannerPicImg)
    setphoneNumber(userSession.phoneNumber)
    setmenu(userSession.menu)
  }, [])

  const validate = () => {
    const errors = [];

    if (!username) {
      errors.push("Please provide an updated username.")
    }
    if (profilePicImg.length > 2000) {
      errors.push("Please provide a valid URL.")
    }
    if (!profilePicImg) errors.push('Please provide an image URL for your profile picture.');
    setErrors(errors)
    return errors;
  }

  const onEditProfile = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (errors.length > 0) return setErrors(errors);

    const updated = await dispatch(EditProfile(user_id, username, email, name, bio, profilePicImg, bannerPicImg, phoneNumber, menu));
    if (updated[0].includes('Username is already in use')) {
      setErrors(updated)
    }
  };

  const handleDelete = (id) => {
    dispatch(logout())
    dispatch(deleteAccount(id))
    history.push(`/`)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
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

  if (!(Object.values(userSession)[8] === usernameParams)) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <NavBar />
    <div className='main-account-info-div'>
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
      <div className='labels-account-info'>
        <form className='form-account-info' onSubmit={onEditProfile}>
          <div>
            <label>User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
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
              required={true}
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
              // value={menu}
              defaultChecked={userSession.menu}
              ></input>
          </div>
          <button className='create-link' type='submit'>Update Info</button>
        </form>
      <button onClick={() => handleDelete(user_id)}>Terminate Account</button>
      </div>
    </div>
    </>
  );
};

export default AccountInfo;
