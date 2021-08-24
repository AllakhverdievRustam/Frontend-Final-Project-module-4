const obj = {
  modalDelete: false,
  modalEdit: false
};

const OpenModal = (state = obj, action) => {
  if (action.type === 'OPEN-DELETE') {
    return {
      ...state,
      modalDelete: action.payload
    };
  } else if (action.type === 'OPEN-EDIT') {
    return {
      ...state,
      modalEdit: action.payload
    };
  }

  return state;
}

export default OpenModal;