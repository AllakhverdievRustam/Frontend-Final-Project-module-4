const obj = {
  firstDate: '',
  lastDate: ''
};

const Filter = (state = obj, action) => {
  if (action.type === 'FIRST-DATE') {
    return {
      ...state,
      firstDate: action.payload
    };
  } else if (action.type === 'LAST-DATE') {
    return {
      ...state,
      lastDate: action.payload
    };
  }

  return state;
}

export default Filter;