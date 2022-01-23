// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const DELETE_USER = 'session/DELETE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const deleteUser = id => ({
  type: DELETE_USER,
  payload: id
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, name, bio, profilePicImg, bannerPicImg, phoneNumber, menu) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      name,
      bio,
      profilePicImg,
      bannerPicImg,
      phoneNumber,
      menu,
    }),
  });
  console.log(response)
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const EditProfile = (id, username, email, name, bio, profilePicImg, bannerPicImg, phoneNumber, menu) => async (dispatch) => {
  const response = await fetch('/api/auth/edit-profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      username,
      email,
      name,
      bio,
      profilePicImg,
      bannerPicImg,
      phoneNumber,
      menu,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data)
    dispatch(setUser(data))
    return 'Successfully updated.'
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['Username is already in use.']
  }
}

export const deleteAccount = id => async dispatch => {
  const response = await fetch(`/api/auth/${id}`, {
      method: 'DELETE',
  })
  if (response.ok) {
      dispatch(deleteUser(id))
      return 'Successfully deleted Account.'
  }
}

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case DELETE_USER:
          newState = { ...state }
          delete newState[action.payload]
          return newState
    default:
      return state;
  }
}
