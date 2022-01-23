const GET_MENU = 'menus/GET_MENU'
const ADD_MENU = 'menus/ADD_MENU'
const UPDATE_MENU = 'menus/UPDATE_MENU'
const DELETE_MENU = 'menus/DELETE_MENU'

const getMenu = menu => ({
    type: GET_MENU,
    payload: menu
})

const addMenu = menu => ({
    type: ADD_MENU,
    payload: menu
})

const updateMenu = menu => ({
    type: UPDATE_MENU,
    payload: menu
})

const deleteMenu = menu => ({
    type: DELETE_MENU,
    payload: menu
})

export const getAllMenu = (id) => async dispatch => {
    const response = await fetch(`/api/menu/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getMenu(data));
        return data
    }
}

export const addOneMenu = menu => async dispatch => {
    const response = await fetch('/api/menu/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addMenu(data))
        return data
    }
}


export const updateOneMenu = menu => async dispatch => {
    const response = await fetch(`/api/menu/${menu.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateMenu(data))
        return data
    }
}

export const deleteOneMenu = id => async dispatch => {
    const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteMenu(id))
        return 'Successfully deleted.'
    }
}

const initialState = {};

export default function (state = initialState, action) {
    let newState;
    switch (action.type) {

        case GET_MENU:
            newState = { ...action.payload }
            return newState

        case ADD_MENU:
            newState = {...newState, [action.payload.id]: action.payload }
            return newState

        case UPDATE_MENU:
            newState = {...newState, [action.payload.id]: action.payload }
            return newState

        case DELETE_MENU:
            newState = { ...state }
            delete newState[action.payload]
            return newState

        default:
            return state;
    }
}
