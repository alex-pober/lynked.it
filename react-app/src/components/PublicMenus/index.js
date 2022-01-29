import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { getUserId } from '../../store/session'
import { getAllMenu } from '../../store/menu';
import './PublicMenus.css'


const PublicMenus = () => {
    const id = useParams()?.usernameParams
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserId(id))
    }, [+id])
    const user = useSelector(state => state?.session)
    let userId = Object.values(user)[0]?.id
    let userValue = Object.values(user)[0]
    useEffect(() => {
       dispatch(getAllMenu(+userId))
    }, [+userId])
   const setMenus = useSelector(state => state?.menu)


return (
    <div>
        <img className='public-background-pic' src={userValue?.bannerPicImg}></img>
        {/* <div className="user-info">
            <img className="mock-profile-pic"src={userValue?.profilePicImg}></img>
            <h2>{userValue?.name}</h2>
            <p>{userValue?.bio}</p>
        </div> */}
        <div className="public-menu">
            {Object.values(setMenus).map(menu => (
            <>
                <h2>{menu.title}</h2>
                {/* <object
                width="900"
                height="900"
                // data={`https://docs.google.com/gview?embedded=true&url=${menu.link}`}>
                data={`${menu.link}'#toolbar=0&scrollbars=0'`}>
                </object> */}
                <embed src={menu?.link+"#toolbar=0&navpanes=0&scrollbars=0&statusbar=0"}></embed>
            </>
            ))}
        </div >
    </div>
)
}

export default PublicMenus;
