const obj = {
  firstDate: '',
  lastDate: ''
};

const Filter = (state = obj, action) => {
  switch (action.type) {
    case 'FIRST-DATE':
      return {
        ...state,
        firstDate: action.payload
      };

    case 'LAST-DATE':
      return {
        ...state,
        lastDate: action.payload
      };

    default:
      break;
  }

  return state;
}

export default Filter;