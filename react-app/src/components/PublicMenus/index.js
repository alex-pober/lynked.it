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
    <div className='background-menu'>
        {/* <img className='public-background-pic' src={userValue?.bannerPicImg}></img> */}
        {/* <div className="user-info">
            <img className="mock-profile-pic"src={userValue?.profilePicImg}></img>
            <h2>{userValue?.name}</h2>
            <p>{userValue?.bio}</p>
        </div> */}
            {Object.values(setMenus).map(menu => (
                <div className="public-menu">
                <h3>{menu.title}</h3>
                {(menu?.link.indexOf(".pdf") != -1)
                    ? <object className="object-menu" data={`https://drive.google.com/viewerng/viewer?embedded=true&url=${menu?.link}`} width="425" height="600"/>
                    : <img className='menu-img' src={menu?.link}></img>
                }
                </div>
            ))}
    </div>
)
}

export default PublicMenus;
