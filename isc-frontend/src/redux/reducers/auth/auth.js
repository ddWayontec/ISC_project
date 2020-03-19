import { SET_AUTHENTICATED } from "../../actions/auth";

const initialState = {
  user: {
    authenticated: false
  }
};

const setAuth = (state, action) => {
  const { user } = action.payload;

  return {
    ...state,
    user: {
      ...state.user,
      ...user
    }
  };
};

const actionMap = {
  [SET_AUTHENTICATED]: setAuth
};

export const auth = (state = initialState, action) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : initialState;
