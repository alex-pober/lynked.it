import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOneLink, getOneLinks } from "../../store/link";
import './EditLinks.css'

const EditCommentForm = () => {
    const dispatch = useDispatch();
    const postId = useParams().id
    useEffect(() => {
        dispatch(getOneLinks(postId))
    }, [dispatch])

    const linkId = useSelector(state => state?.link?.link)
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    // const [editPopUp, setEditPopUp] = useState(editState)
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }})

        useEffect(() => {
            setTitle(linkId?.title)
            setLink(linkId?.link)
        }, [])

        console.log(linkId?.title)

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
            id: +linkId.id,
            user_id: userId,
            title,
            link,
        }

        let submitted = await dispatch(updateOneLink(editLink))
        .catch(async res => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
        if (submitted) {
            // setEditPopUp(!editPopUp)
            // sendDataToParent(!editPopUp)
        }
    }

    return (
        <>
        {/* {editPopUp && ( */}
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
                    <button className="hidden-submit" type='submit'>Update</button>
                </div>
            </form>
        {/* )} */}
        </>
    )
}

export default EditCommentForm
