import { userReducer } from "./lib/reducers/userReducer";
import { combineReducers } from "redux";
import { walletReducer } from "./lib/reducers/walletReducer";

export const rootReducer = combineReducers({
  walletPage: walletReducer,
  userAbout: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
