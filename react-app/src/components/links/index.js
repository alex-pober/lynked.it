import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { addOneLink, getAllLinks } from '../../store/link';
import EditCommentForm from '../EditLinks/index';
import './linksCSS.css'

const Links = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllLinks(user?.id))
    }, [dispatch])
    const [errors, setErrors] = useState([]);
    const [link, setLink] = useState();
    const [title, setTitle] = useState();
    const user = useSelector(state => state.session?.user);
    const allLinks = useSelector(state => state?.link)
    let linkValues = Object.values(allLinks)
    console.log(linkValues)
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
        // dispatch(getAllLinks(user?.id))
        // history.go(`/${user.username}/admin`)
    }

    return (
        <>
        <div className="links">
            {linkValues?.map(link => (
            <>
                <a href={`${link.link}`}>{link.title}</a>
                <EditCommentForm maplink={link.link} maptitle={link.title} linkobj={link.id}/>
                {console.log(link.title)}
            </>
            ))}
        </div >
        <form className="links" onSubmit={submit}>
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
                    
                />
            </div>
            <div>
                <input
                    name='link'
                    type='text'
                    placeholder="Link"
                    value={link}
                    onChange={updateLink}
                />
            </div>
            <button type='submit'>Create New Link</button>
        </form>
    </>
  );
}
export default Links;
