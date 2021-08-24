const obj = {
  edit: {},
  delete: {}
};

const ElementRecToModal = (state = obj, action) => {
  if (action.type === 'ELEMENT-TO-EDIT') {
    return {
      ...state,
      edit: action.payload
    };
  } else if (action.type === 'ELEMENT-TO-DELETE') {
    return {
      ...state,
      delete: action.payload
    };
  }

  return state;
}

export default ElementRecToModal;