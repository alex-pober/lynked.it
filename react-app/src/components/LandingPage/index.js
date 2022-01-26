import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import NavBar from "../NavBar"
import DemoButton from '../auth/DemoUser';

const SplashPage = () => {

return (
    <>
    <NavBar />
        <h1>Splash Page</h1>
        <DemoButton />
    </>
    )
}

export default SplashPage;
