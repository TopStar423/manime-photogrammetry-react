const activeElement = (state = { id: -1, type: 'display' }, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ELEMENT':
      return action.element;
    case 'SET_DISPLAY':
      return { ...action.element, type: 'display' };
    default:
      return state;
  }
}

export default activeElement;
