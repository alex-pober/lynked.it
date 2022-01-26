import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { addOneLink, getAllLinks } from '../../store/link';
import EditLinkForm from '../EditLinks/index';
import './linksCSS.css'

const Links = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllLinks(user?.id))
    }, [dispatch])
    const [errors, setErrors] = useState([]);
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const user = useSelector(state => state.session?.user);
    const allLinks = useSelector(state => state?.link)
    let linkValues = Object.values(allLinks)
    const history = useHistory();

    const updateTitle = e => {
        setTitle(e.target.value)
    }
    const updateLink = e => {
        setLink(e.target.value)
    }

    const submit = async (e) => {
        e.preventDefault();
        const newLink = {
            user_id: user.id,
            title,
            link,
        }
        dispatch(addOneLink(newLink))
        setLink('')
        setTitle('')
    }


    return (
    <>
        <div className="links-and-iphone">
            <div className="links">
                {linkValues?.map(link => (
                <>
                    <a href={`${link.link}`}>{link.title}</a>
                    <EditLinkForm maplink={link.link} maptitle={link.title} linkobj={link.id}/>
                    {console.log(link.title)}
                </>
                ))}
            </div >
            <div className="iphone-mockup">
                <img src="https://i.imgur.com/rnRyfHH.png"/>
                <div className="iphone-mockup-links">
                    <img className="mock-profile-pic"src={user.profilePicImg}></img>
                    <span className="mock-name">{user.name}</span>
                    <span className="mock-bio">{user.bio}</span>
                    {linkValues?.map(link => (
                    <>
                        <a href={`${link?.link}`}>{link?.title}</a>
                    </>
                    ))}
                </div >
            </div>
            <form className="submit-form"onSubmit={submit}>
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
    </>
  );
}
export default Links;
