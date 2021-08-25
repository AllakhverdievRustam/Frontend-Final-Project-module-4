const obj = {
  edit: {},
  delete: {}
};

const ElementRecToModal = (state = obj, action) => {
  switch (action.type) {
    case 'ELEMENT-TO-EDIT':
      return {
        ...state,
        edit: action.payload
      };

    case 'ELEMENT-TO-DELETE':
      return {
        ...state,
        delete: action.payload
      };

    default:
      break;
  }

  return state;
}

export default ElementRecToModal;