import { UserAbout } from "../../types";

export enum UserActionTypes {
  SET_USER = "SET_USER",
}

interface SetUserAction {
  type: UserActionTypes.SET_USER;
  payload: UserAbout;
}

export type UserAction = SetUserAction;

export const setUser = (data: UserAbout): SetUserAction => ({
  type: UserActionTypes.SET_USER,
  payload: data,
});
