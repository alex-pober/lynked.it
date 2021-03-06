import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOneLink, getOneLinks, deleteOneLink } from "../../store/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditLinks.css'

const EditLinkForm = ({maplink, maptitle, linkobj}) => {
    const dispatch = useDispatch();
    const postId = linkobj
    const user = useSelector(state => state.session?.user);
    const linkId = useSelector(state => state?.link?.link)
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }})
    const validUrl = require('valid-url');
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

        const editLink = {
            id: +linkobj,
            user_id: userId,
            title,
            link,
        }

        dispatch(updateOneLink(editLink))
        setErrors([])
        notify()
    }
    const handleDelete = (postId) => {
        dispatch(deleteOneLink(postId))
        history.go(`/${user.username}/admin`)
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
            <form  onSubmit={onEdit}>
                <div className='edit-link-form'>
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
                <div className='buttons'>
                    <button className="update" type='submit'>Update</button>
                    <button className="delete" onClick={() => handleDelete(postId)}>Delete</button>
                </div>
            </form>
        </>
    )
}

export default EditLinkForm
