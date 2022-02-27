import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { getAllLinks } from '../../store/link';
import { getUserId } from '../../store/session'
import './PublicLinks.css'


const PublicLinks = () => {
    const id = useParams()?.usernameParams
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserId(id))
    }, [+id])
    const user = useSelector(state => state?.session)
    let userId = Object.values(user)[0]?.id
    let userValue = Object.values(user)[0]
    useEffect(() => {
       dispatch(getAllLinks(+userId))
    }, [+userId])
   const setLinks = useSelector(state => state?.link)


return (
    <>
    <div>
        {userValue?.bannerPicImg
            ? <img className='public-background-pic' src={userValue?.bannerPicImg}></img>
            : null
        }
        {/* <img className='public-background-pic' src={userValue?.bannerPicImg}></img> */}
        <div className="user-info">
            {userValue?.profilePicImg
                ? <img className="public-profile-pic"src={userValue?.profilePicImg}></img>
                : null
            }
            {/* <img className="mock-profile-pic"src={userValue?.profilePicImg}></img> */}
            <h2 className="public-name">{userValue?.name}</h2>
            <p className="public-bio">{userValue?.bio}</p>
        </div>
        <div className="public-links">
        {userValue?.menu
            ? <a href={`/${userValue.username}/menu`}>Menu</a>
            : null
        }
            {Object.values(setLinks).map(link => (
            <>
                <a href={`${link?.link}`}>{link?.title}</a>
            </>
            ))}
        </div >
    </div>
    </>
)
}

export default PublicLinks;
