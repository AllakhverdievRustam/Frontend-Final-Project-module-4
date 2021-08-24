const obj = {
  lable: '',
  direction: ''
};

const Sort = (state = obj, action) => {
  if (action.type === 'CHANGE-LABLE') {
    return {
      ...state,
      lable: action.payload
    };
  } else if (action.type === 'CHANGE-DIRECTION') {
    return {
      ...state,
      direction: action.payload
    };
  }

  return state;
}

export default Sort;