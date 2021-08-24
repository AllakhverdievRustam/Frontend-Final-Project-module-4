const CountAllReception = (state = 0, action) => {
  if (action.type === 'COUNT-ALL-REC') {
    return action.payload;
  }

  return state;
}

export default CountAllReception;