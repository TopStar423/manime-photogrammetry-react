const activeElement = (state = { id: -1, type: 'display' }, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ELEMENT':
      return action.element;
    case 'SET_DISPLAY':
      return { ...state, type: 'display' };
    case 'SET_KEY_VALUE':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
}

export default activeElement;
