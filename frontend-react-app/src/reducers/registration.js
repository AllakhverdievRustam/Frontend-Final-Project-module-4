const obj = {
  login: '',
  password: '',
  passwordRepeat: ''
};

const Registration = (state = obj, action) => {
  if (action.type === 'REG-LOGIN') {
    return {
      ...state,
      login: action.payload
    };
  } else if (action.type === 'REG-PASS') {
    return {
      ...state,
      password: action.payload
    };
  } else if (action.type === 'REG-PASS-REPEAT') {
    return {
      ...state,
      passwordRepeat: action.payload
    };
  }

  return state;
}

export default Registration;