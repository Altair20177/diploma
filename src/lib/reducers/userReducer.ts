import { UserAbout } from "./../../types";
import { UserAction, UserActionTypes } from "../actions/userActions";

let initialState: UserAbout | null = null;

export const userReducer = (
  state = initialState,
  action: UserAction
): UserAbout | null => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};
