import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { addOneLink, getAllLinks } from '../../store/link';
import './linksCSS.css'

const Links = () => {
    const [errors, setErrors] = useState([]);
    const [link, setLink] = useState();
    const [title, setTitle] = useState();
    const user = useSelector(state => state.session?.user);
    const allLinks = useSelector(state => state?.link?.links)
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId }  = useParams();
    console.log(allLinks)
    useEffect(() => {
        dispatch(getAllLinks(user?.id))
    }, [dispatch])

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
        dispatch(getAllLinks(user?.id))
    }

  return (
    <>
        <div className="links">
            {allLinks?.map(link =>
                <a href={`${link.link}`}>{link.title}</a>
            )}
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
