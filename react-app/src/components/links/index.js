import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { addOneLink, getAllLinks } from '../../store/link';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import NavBar from "../NavBar"
import EditLinkForm from '../EditLinks/index';
import './linksCSS.css'

const Links = () => {
    const user = useSelector(state => state.session?.user);
    const allLinks = useSelector(state => state?.link)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllLinks(user?.id))
    }, [dispatch])
    const [errors, setErrors] = useState([]);
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    let linkValues = Object.values(allLinks)
    const history = useHistory();
    const validUrl = require('valid-url');

    //Error Validator
    const validate = () => {
        const errors = [];
        if (!validUrl.isUri(link)) {
            errors.push("Invalid link, check for typos")
        }
        return errors
    }

    const updateTitle = e => {
        setTitle(e.target.value)
    }
    const updateLink = e => {
        setLink(e.target.value)
    }

    const submit = async (e) => {
        e.preventDefault();

        const errors = validate();
        if (errors.length > 0) return setErrors(errors);

        const newLink = {
            user_id: user.id,
            title,
            link,
        }
        dispatch(addOneLink(newLink))
        setLink('')
        setTitle('')
        setErrors([])
    }


    return (
    <>
    <NavBar />
        <div className="links-and-iphone">
            <div className="links">
                <p className="instructions">Active Links:</p>
                <div className='line' />
                {linkValues?.map(link => (
                <>
                    <EditLinkForm maplink={link.link} maptitle={link.title} linkobj={link.id}/>
                    <div className='line' />
                </>
                ))}
            </div >
            <div>
            <div className="live-link">
                <a className="title-link">Your public shareable link:</a>
                <a className="link" target="_blank" rel="noopener noreferrer" href={`/${user.username}/`}><img src="https://i.imgur.com/59mE3Ep.png"></img>lynked.it/{user.username}</a>
                <a className="new-tab" target="_blank" rel="noopener noreferrer" href={`/${user.username}/`}>Open in new tab <BsBoxArrowUpRight style={{padding: '5px'}}/></a>
            </div>
                <br />
            <div className="iphone-mockup">
                {user?.bannerPicImg
                    ? <img className="iphone-mockup-background" onerror="this.style.display='none';alert('test');" src={user.bannerPicImg}></img>
                    : null
                }
                <img className="iphone-border" src="https://i.imgur.com/4ZENvQM.png" />
                <div className="iphone-mockup-links">
                    {user?.profilePicImg
                        ? <img className="mock-profile-pic" src={user.profilePicImg} onerror="this.style.display='none'"></img>
                        : null
                    }
                    <span className="mock-name">{user.name}</span>
                    <span className="mock-bio">{user.bio}</span>
                    {user.menu
                        ? <a target="_blank" rel="noopener noreferrer" href={`/${user.username}/menu`}>Menu</a>
                        : null
                    }
                    {linkValues?.map(link => (
                    <>
                        <a href={`${link.link}`}>{link.title}</a>
                    </>
                    ))}
                </div >
            </div>
            <form className="submit-form" onSubmit={submit}>
                <span>Create a link to any website</span>
                <br />
                <span>Pro Tip: Change your profile picture or background at anytime in Account Info tab</span>
                <div className="errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        name='title'
                        type='text'
                        placeholder="Title for Link"
                        value={title}
                        onChange={updateTitle}
                        required={true}
                    />
                </div>
                <div>
                    <input
                        name='link'
                        type='text'
                        placeholder="Link"
                        value={link}
                        onChange={updateLink}
                        required={true}
                    />
                </div>
                <button className="create-link" type='submit'>Create New Link</button>
            </form>
            </div>
        </div>
    </>
  );
}
export default Links;
