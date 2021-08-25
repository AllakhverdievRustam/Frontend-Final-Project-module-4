const obj = {
  modalDelete: false,
  modalEdit: false
};

const OpenModal = (state = obj, action) => {
  switch (action.type) {
    case 'OPEN-DELETE':
      return {
        ...state,
        modalDelete: action.payload
      };

    case 'OPEN-EDIT':
      return {
        ...state,
        modalEdit: action.payload
      };

    default:
      break;
  }

  return state;
}

export default OpenModal;