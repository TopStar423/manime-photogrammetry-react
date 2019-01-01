const activeElement = (state = { id: -1 }, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ELEMENT':
      return action.element;
    default:
      return state;
  }
}

export default activeElement;
