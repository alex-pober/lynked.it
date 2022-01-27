import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import NavBar from "../NavBar"
import { Redirect, useHistory } from 'react-router-dom';
import DemoButton from '../auth/DemoUser';

const SplashPage = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

if (user) {
    // history.go(`/${user?.username}/admin`)
    return <Redirect to={`/${user?.username}/admin`} />;
    }

return (
    <>
    <NavBar />
        <h1>Splash Page</h1>
        <DemoButton />
    </>
    )
}

export default SplashPage;
