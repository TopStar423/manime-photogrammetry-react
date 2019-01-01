const userData = (state = { isAuth: false }, action) => {
  switch (action.type) {
    case 'SET_IS_AUTH':
      return { ...state, isAuth: action.isAuth };
    default:
      return state;
  }
}

export default userData;
