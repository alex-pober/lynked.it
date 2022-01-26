import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOneLink, getOneLinks, deleteOneLink } from "../../store/link";
import './EditLinks.css'

const EditLinkForm = ({maplink, maptitle, linkobj}) => {
    const dispatch = useDispatch();
    const postId = linkobj
    // useEffect(() => {
    //     dispatch(getOneLinks(postId))
    // }, [dispatch])
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
        setErrors([]);

        const editLink = {
            id: +linkobj,
            user_id: userId,
            title,
            link,
        }

        let submitted = await dispatch(updateOneLink(editLink))
        // .catch(async res => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // })
        if (submitted) {
            console.log(editLink)
            // history.go(`/${user.username}/admin`)
        }
    }
    const handleDelete = (postId) => {
        dispatch(deleteOneLink(postId))
        // history.go(`/${user.username}/admin`)
      }

    return (
        <>
            <form className='edit-your-comment' onSubmit={onEdit}>
                <div>
                    <div>
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
                    <button className="hidden-submit" type='submit'>Update</button>
                    <button onClick={() => handleDelete(postId)}>Delete</button>
                </div>
            </form>
        </>
    )
}

export default EditLinkForm
