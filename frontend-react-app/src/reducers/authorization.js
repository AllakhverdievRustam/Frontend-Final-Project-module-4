const obj = {
  login: '',
  password: ''
};

const Authorization = (state = obj, action) => {
  if (action.type === 'AUTH-LOGIN') {
    return {
      ...state,
      login: action.payload
    };
  } else if (action.type === 'AUTH-PASS') {
    return {
      ...state,
      password: action.payload
    };
  }

  return state;
}

export default Authorization;