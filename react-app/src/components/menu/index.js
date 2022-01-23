import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, Redirect } from "react-router-dom";
import { addOneMenu, getAllMenu } from '../../store/menu';
import EditCommentForm from '../EditLinks/index';
// import './linksCSS.css'

const Menu = () => {
    const [errors, setErrors] = useState([]);
    const [link, setLink] = useState();
    const [title, setTitle] = useState();
    const user = useSelector(state => state.session?.user);
    const allLinks = useSelector(state => state?.link?.links)
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMenu(user?.id))
    }, [dispatch])

    const updateTitle = e => {
        setTitle(e.target.value)
    }
    const updateLink = e => {
        setLink(e.target.value)
    }

    const submit = async (e) => {
        e.preventDefault();
        const newMenu = {
            user_id: user.id,
            title,
            link,
        }
        dispatch(addOneMenu(newMenu))
    }

    return (
        <>
        {/* <div className="links">
            {allLinks?.map(link => (
            <>
                <a href={`${link.link}`}>{link.title}</a>
                {console.log(link.title)}
            </>
            ))}
        </div > */}
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
export default Menu;
