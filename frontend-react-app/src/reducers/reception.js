const arr = [];

const Reception = (state = arr, action) => {
  if (action.type === 'GET-RECEPTIONS') {
    return action.payload;
  }

  return state;
}

export default Reception;