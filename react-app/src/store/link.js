import ProtectedRoute from "../components/auth/ProtectedRoute"
import _ from 'lodash';

const GET_LINK = 'links/GET_LINK'
const ADD_LINK = 'links/ADD_LINK'
const UPDATE_LINK = 'links/UPDATE_LINK'
const DELETE_LINK = 'links/DELETE_LINK'
const CLEAR_LINK = 'links/CLEAR_LINK'

const getLink = link => ({
    type: GET_LINK,
    payload: link
})

const addLink = link => ({
    type: ADD_LINK,
    payload: link
})

const updateLink = link => ({
    type: UPDATE_LINK,
    payload: link
})

const deleteLink = link => ({
    type: DELETE_LINK,
    payload: link
})

const clearLink = link => ({
    type: CLEAR_LINK,
    payload: link
})

export const addOneLink = link => async dispatch => {
    const response = await fetch('/api/links/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(link)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addLink(data))
        return data
    }
}

export const getAllLinks = (id) => async dispatch => {
    const response = await fetch(`/api/links/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getLink(data));
        return data
    }
}

export const updateOneLink = link => async dispatch => {
    const response = await fetch(`/api/links/${link.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(link)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateLink(data))
        return data
    }
}

export const deleteOneLink = id => async dispatch => {
    const res = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteLink(id))
        return 'Successfully deleted.'
    }
}

export const clearAllLinks= () => async dispatch => {
        dispatch(clearLink())
}


const initialState = {};

export default function (state = initialState, action) {
    let newState;
    switch (action.type) {

        case GET_LINK:
            // newState = { ...action.payload }
            // return newState
            const newLink = _.mapKeys(action.payload.links, 'id')
            return {...state, ...newLink}

        // case GET_ONE_LINK:
        //     return {link: action.payload}

        case ADD_LINK:
            // newState = {...newState, [action.payload.id]: action.payload }
            // return newState
            return {...state, [action.payload.id]: action.payload }

        case UPDATE_LINK:
            return {...state, [action.payload.link.id]: action.payload.link}

        case DELETE_LINK:
            // newState = { ...state }
            // delete newState[action.payload]
            // return newState
            return _.omit(state, action.payload)

        case CLEAR_LINK:
            newState = {}
            return newState

        default:
            return state;
    }
}
