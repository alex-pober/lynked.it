import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { deleteAccount, EditProfile } from '../../store/session';
import { logout } from '../../store/session';
import { clearAllLinks } from '../../store/link';
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
  const validUrl = require('valid-url');
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

  const onEditProfile = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (errors.length > 0) return setErrors(errors);

    const data = await dispatch(EditProfile(user_id, username, email, name, bio, profilePicImg, bannerPicImg, phoneNumber, menu));

    if (data) {
      setErrors(data);
    }
    // setErrors([]);
    console.log(userSession.username)
    // history.push(`/${userSession.username}/admin/`)
  };

  const handleDelete = (id) => {
    dispatch(logout())
    dispatch(deleteAccount(id))
    dispatch(clearAllLinks());
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
            {userSession.username == "DemoAccount"
              ?
              <input
                readOnly={true}
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                required={true}
              ></input>
              : <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                required={true}
              ></input>
            }
          </div>
          <div>
            <label>Email</label>
            {userSession.username == "DemoAccount"
              ?
              <input
                readOnly={true}
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                required={true}
              ></input>
              : <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                required={true}
              ></input>
            }
            {/* <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required={true}
            ></input> */}
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
          <div className="menu-description">
            <label>Menu</label>
            <input
              type='checkbox'
              name='menu'
              onChange={updatemenu}
              // value={menu}
              defaultChecked={userSession.menu}
              ></input>
              <span>This option lets your link Images or PDFs of menus. A great tool for resturants!</span>
            </div>
          <button className='create-link' type='submit'>Update Info</button>
        </form>
      {userSession.username == "DemoAccount"
        ?  <p className="terminate-account">Cannot Terminate Demo Account</p>
        :  <button className="terminate-account" onClick={() => handleDelete(user_id)}>Terminate Account</button>
      }
      {/* <button className="terminate-account" onClick={() => handleDelete(user_id)}>Terminate Account</button> */}
      </div>
    </div>
    </>
  );
};

export default AccountInfo;
