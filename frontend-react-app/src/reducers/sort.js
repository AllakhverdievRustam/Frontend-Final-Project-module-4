const obj = {
  lable: '',
  direction: ''
};

const Sort = (state = obj, action) => {
  switch (action.type) {
    case 'CHANGE-LABLE':
      return {
        ...state,
        lable: action.payload
      };

    case 'CHANGE-DIRECTION':
      return {
        ...state,
        direction: action.payload
      };

    default:
      break;
  }

  return state;
}

export default Sort;