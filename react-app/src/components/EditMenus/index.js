import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOneMenu, getOneLinks, deleteOneMenu } from "../../store/menu";
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import './EditMenus.css'

const EditMenuForm = ({maplink, maptitle, menuObj}) => {
    const dispatch = useDispatch();
    const menuId = menuObj
    const user = useSelector(state => state.session?.user);
    // const linkId = useSelector(state => state?.link?.link)
    // console.log(linkId)
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const validUrl = require('valid-url');
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }})
    const notify = () => toast.success('Updated!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    //Error Validator
    const validate = () => {
        const errors = [];
        if (!validUrl.isUri(link)) {
            errors.push("Invalid link, check for typos")
        }
        return errors
    }

    // if (!linkId?.user_id == user?.id) {
    //     history.push(`/${user.username}/admin`)
    // }

    useEffect(() => {
        setTitle(maptitle)
        setLink(maplink)
    }, [])

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
        notify()
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
        <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
        />
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
