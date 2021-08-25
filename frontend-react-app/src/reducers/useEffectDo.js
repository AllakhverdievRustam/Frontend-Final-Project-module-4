const UseEffectDo = (state = true, action) => {
  if (action.type === 'USE-EFF-DO') {
    return action.payload;
  }

  return state;
}

export default UseEffectDo;