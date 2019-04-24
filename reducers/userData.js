const userData = (state = { isAuth: false }, action) => {
  switch (action.type) {
    case 'SET_IS_AUTH':
      return { ...state, isAuth: action.isAuth };
    case 'SET_IDENTITY_ID':
      return { ...state, identityId: action.identityId };
    default:
      return state;
  }
}

export default userData;
