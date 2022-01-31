import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import NavBar from "../NavBar"
import { Redirect, useHistory } from 'react-router-dom';
import DemoButton from '../auth/DemoUser';
import "./LandingPage.css"

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
        <div className='splash-1'>
            <div className="text">
                <span className='splash-1-span'>All your links in <u>one link</u>.</span>
                <br></br>
                <p>Direct your audience exactly where you want, instantly.</p>
                <br></br>
                <DemoButton className="demo-button" />
            </div>
            <img src="https://i.imgur.com/QLBiFSE.png"></img>
        </div>
        <div className='line'></div>
        <div className='splash-1'>
            <img className='menu-splash' src="https://i.imgur.com/a04fpni.png"></img>
            <div className="text">
                <span className='splash-1-span'>Made with restaurants in mind</span>
                <br></br>
                <p>Link all your menu PDFs or Images, your diners will have access to all of them in one click.</p>
                <br></br>
            </div>
        </div>
        <div className='footer'>
              <p>Developed by: Alex Poberezhskiy</p>
                  <a href="https://github.com/alex-pober">GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/alexpober">
                Linked In</a>
        </div>
    </>
    )
}

export default SplashPage;
