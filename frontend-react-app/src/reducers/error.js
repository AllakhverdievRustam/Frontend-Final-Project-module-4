const str = '';

const Error = (state = str, action) => {
  if (action.type === 'ERROR') {
    return action.payload;
  }

  return state;
}

export default Error;