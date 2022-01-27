import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, Redirect } from "react-router-dom";
import { addOneMenu, getAllMenu } from '../../store/menu';
import NavBar from "../NavBar"
import EditMenuForm from '../EditMenus/index';
import _ from 'lodash';
import './menu.css'

const Menu = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMenu(user?.id))
    }, [dispatch])
    const [errors, setErrors] = useState([]);
    const [link, setLink] = useState();
    const [title, setTitle] = useState();
    const user = useSelector(state => state?.session?.user);
    const allMenus = useSelector(state => state?.menu)
    let menuValues = Object.values(allMenus)
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

        const newMenu = {
            user_id: user.id,
            title,
            link,
        }
        dispatch(addOneMenu(newMenu))
        setLink('')
        setTitle('')
        setErrors([])
    }

    return (
    <>
    <NavBar />
        <form className="submit-form" onSubmit={submit}>
            <div className="errors">
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input
                    name='title'
                    type='text'
                    placeholder="Title for Menu"
                    value={title}
                    onChange={updateTitle}
                    required={true}
                />
            </div>
            <div>
                <input
                    name='link'
                    type='text'
                    placeholder="Link 'https://www....'"
                    value={link}
                    onChange={updateLink}
                    required={true}
                />
            </div>
            <button className="create-link" type='submit'>Create New Menu</button>
        </form>
        <div className="all-menus">
            {menuValues.map(menu => (
            <div className="each-menu">
                <h1>{menu?.title}</h1>
                <embed className='pdf' src={menu?.link+"#toolbar=0&navpanes=0&scrollbars=0&statusbar=0&view=fit"}></embed>
                <EditMenuForm menuObj={menu.id} maplink={menu?.link} maptitle={menu?.title}/>
            </div>
            ))}
        </div >
    </>
  );
}
export default Menu;
