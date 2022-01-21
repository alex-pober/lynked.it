const GET_LINK = 'links/GET_LINK'
const GET_ONE_LINK = 'links/GET_ONE_LINK'
const ADD_LINK = 'links/ADD_LINK'
const UPDATE_LINK = 'links/UPDATE_LINK'
const DELETE_LINK = 'links/DELETE_LINK'

const getLink = link => ({
    type: GET_LINK,
    payload: link
});

const getOneLink = link => ({
    type: GET_ONE_LINK,
    payload: link
});

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

export const getOneLinks = (id) => async dispatch => {
    const response = await fetch(`/api/links/${id}/edit`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getOneLink(data));
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

const initialState = {};

export default function (state = initialState, action) {
    let newState;
    switch (action.type) {

        case GET_LINK:
            newState={...state}
            return {link: action.payload}

        case GET_ONE_LINK:
            const newState = { ...state }
            return {link: action.payload}

        case ADD_LINK:
            newState = {
                ...state,
                [action.payload.id]: action.payload
            }
            return newState

        case UPDATE_LINK:
            state[action.payload] = action.payload.id;
            newState = { ...state };
            return newState

        case DELETE_LINK:
            newState = { ...state }
            delete newState[action.payload]
            return newState




        default:
            return state;
    }
}
