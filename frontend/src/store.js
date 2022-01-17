import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  showListReducer,
  showInfoReducer,
  addShowReviewReducer,
  showVenuePerformancesReducer,
  showCreateReducer,
  addShowPerformanceReducer,
  addShowImageReducer,
  companyShowListReducer,
  addShowRoleReducer,
} from "./reducers/showReducers";

import {
  venueListReducer,
  venueInfoReducer,
  addVenueReviewReducer,
  addVenueImageReducer,
  venueCreateReducer,
} from "./reducers/venueReducers";

import {
  castMemberListReducer,
  castMemberInfoReducer,
  castMemberCreateReducer,
} from "./reducers/castMemberReducers";

import {
  companyListReducer,
  companyInfoReducer,
  addCompanyReviewReducer,
  addCompanyImageReducer,
  companyCreateReducer,
} from "./reducers/companyReducers";

import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  showList: showListReducer,
  showInfo: showInfoReducer,
  showCreate: showCreateReducer,
  addShowReview: addShowReviewReducer,
  showVenuePerformances: showVenuePerformancesReducer,
  addShowPerformance: addShowPerformanceReducer,
  addShowImage: addShowImageReducer,
  addShowRole: addShowRoleReducer,
  venueList: venueListReducer,
  venueInfo: venueInfoReducer,
  addVenueReview: addVenueReviewReducer,
  addVenueImage: addVenueImageReducer,
  venueCreate: venueCreateReducer,
  castMemberList: castMemberListReducer,
  castMemberInfo: castMemberInfoReducer,
  castMemberCreate: castMemberCreateReducer,
  companyList: companyListReducer,
  companyInfo: companyInfoReducer,
  addCompanyReview: addCompanyReviewReducer,
  addCompanyImage: addCompanyImageReducer,
  companyShowList: companyShowListReducer,
  companyCreate: companyCreateReducer,
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
