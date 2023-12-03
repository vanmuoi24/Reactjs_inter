import { USER_LOGIN, USER_LOGOUT } from "../actions/Useraction";

const INITIAL_STATE = {
  user: { email: "muoihoccode", auth: false },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        count: state.count + 1,
      };

    case USER_LOGOUT:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};

export default userReducer;
