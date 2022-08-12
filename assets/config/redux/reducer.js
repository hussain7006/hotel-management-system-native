const INITIAL_STATE = {
  userNames: {},
  userLogin: false,
  userData: [],
  hotels: [],
  uid: null,
};
export default (state = INITIAL_STATE, action) => {
  if (action.type == 'SETUSERNAMES') {
    // console.log("reducer", action.user);
    state.userNames = action.user;
    state.userLogin = true;
    return state;
  } else if (action.type == 'LOGOUT') {
    state.userLogin = false;
    state.userNames = {};
    console.log("REDUCER.state.userLogin",state.userLogin);
    return state;
  } else if (action.type == 'CHECKUSER') {
    state.userLogin = true;
    console.log("REDUCER.state.userLogin",state.userLogin);
    return state;
  } else if (action.type == 'SETUSERUID') {
    state.uid = action.value;
    return state;
  } else if (action.type == 'SETUSERDATA') {
    // state.userLogin = true;
    // console.log(action.value);
    state.userData = [action.value];
    return state;
  } else if (action.type == 'SETHOTELS') {
    state.hotels = action.value;
    return state;
  }

  return state;
};
