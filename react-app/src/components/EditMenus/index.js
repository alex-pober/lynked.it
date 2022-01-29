import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOneMenu, getOneLinks, deleteOneMenu } from "../../store/menu";
import _ from 'lodash';
import './EditMenus.css'

const EditMenuForm = ({maplink, maptitle, menuObj}) => {
    const dispatch = useDispatch();
    const menuId = menuObj
    const user = useSelector(state => state.session?.user);
    const linkId = useSelector(state => state?.link?.link)
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const validUrl = require('valid-url');
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }})

    //Error Validator
    const validate = () => {
        const errors = [];
        if (!validUrl.isUri(link)) {
            errors.push("Invalid link, check for typos")
        }
        return errors
    }

    if (!linkId?.user_id == user?.id) {
        history.push(`/${user.username}/admin`)
    }

    useEffect(() => {
        setTitle(maptitle)
        setLink(maplink)
    }, [linkId])

    const updateTitle = e => {
        setTitle(e.target.value)
    }
    const updateLink = e => {
        setLink(e.target.value)
    }

    const onEdit = async e => {
        e.preventDefault()

        const errors = validate();
        if (errors.length > 0) return setErrors(errors);

        // setErrors([]);

        const editLink = {
            id: +menuId,
            user_id: userId,
            title,
            link,
        }

        dispatch(updateOneMenu(editLink))
        setErrors([])
        // let submitted = await dispatch(updateOneMenu(editLink))
        // .catch(async res => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // })
        // if (submitted) {
        // }
    }
    const handleDelete = (postId) => {
        dispatch(deleteOneMenu(postId))
      }

    return (
        <>
            <form className="edit-menu" onSubmit={onEdit}>
                <div>
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
                </div>
                <div className='menu-buttons'>
                    <button className="update" type='submit'>Update</button>
                    <button className="delete" onClick={() => handleDelete(menuId)}>Delete</button>
                </div>
            </form>
        </>
    )
}

export default EditMenuForm