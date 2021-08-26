const initialState = true;
const UseEffectDo = (state = initialState, action) => {
  if (action.type === 'USE-EFF-DO') {
    return action.payload;
  }

  return state;
}

export default UseEffectDo;