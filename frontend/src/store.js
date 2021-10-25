import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  showListReducer,
  showInfoReducer,
  addShowReviewReducer,
} from "./reducers/showReducers";

import {
  venueListReducer,
  venueInfoReducer,
  addVenueReviewReducer,
} from "./reducers/venueReducers";

import {
  castMemberListReducer,
  castMemberInfoReducer,
} from "./reducers/castMemberReducers";

import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  showList: showListReducer,
  showInfo: showInfoReducer,
  addShowReview: addShowReviewReducer,
  venueList: venueListReducer,
  venueInfo: venueInfoReducer,
  addVenueReview: addVenueReviewReducer,
  castMemberList: castMemberListReducer,
  castMemberInfo: castMemberInfoReducer,
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
