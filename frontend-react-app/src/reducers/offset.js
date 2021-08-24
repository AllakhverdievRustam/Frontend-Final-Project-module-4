const Offset = (state = 0, action) => {
  if (action.type === 'OFFSET') {
    return action.payload;
  }

  return state;
}

export default Offset;