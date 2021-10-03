import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  showListReducer,
  showInfoReducer,
  addReviewReducer,
} from "./reducers/showReducers";

import { venueListReducer, venueInfoReducer } from "./reducers/venueReducers";

import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  showList: showListReducer,
  showInfo: showInfoReducer,
  addReview: addReviewReducer,
  venueList: venueListReducer,
  venueInfo: venueInfoReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
