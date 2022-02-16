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
  showMyReviewsReducer,
  showReviewInfoReducer,
  addShowReviewCommentReducer,
  updateShowReviewReducer,
  updateShowReviewCommentReducer,
  showReviewDeleteReducer,
  showReviewDeleteCommentReducer,
  showUserReviewsReducer,
} from "./reducers/showReducers";

import {
  venueListReducer,
  venueInfoReducer,
  addVenueReviewReducer,
  addVenueImageReducer,
  venueCreateReducer,
  venueMyReviewsReducer,
  venueUserReviewsReducer,
  venueReviewInfoReducer,
  updateVenueReviewReducer,
  venueReviewDeleteReducer,
  addVenueReviewCommentReducer,
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
  companyMyReviewsReducer,
  companyUserReviewsReducer,
} from "./reducers/companyReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  showList: showListReducer,
  showInfo: showInfoReducer,
  showCreate: showCreateReducer,
  addShowReview: addShowReviewReducer,
  addShowReviewComment: addShowReviewCommentReducer,
  showVenuePerformances: showVenuePerformancesReducer,
  addShowPerformance: addShowPerformanceReducer,
  addShowImage: addShowImageReducer,
  addShowRole: addShowRoleReducer,
  showMyReviews: showMyReviewsReducer,
  showReviewInfo: showReviewInfoReducer,
  updateShowReview: updateShowReviewReducer,
  updateShowReviewComment: updateShowReviewCommentReducer,
  showReviewDelete: showReviewDeleteReducer,
  showReviewDeleteComment: showReviewDeleteCommentReducer,
  showUserReviews: showUserReviewsReducer,
  venueList: venueListReducer,
  venueInfo: venueInfoReducer,
  addVenueReview: addVenueReviewReducer,
  addVenueImage: addVenueImageReducer,
  venueCreate: venueCreateReducer,
  venueMyReviews: venueMyReviewsReducer,
  venueUserReviews: venueUserReviewsReducer,
  venueReviewInfo: venueReviewInfoReducer,
  updateVenueReview: updateVenueReviewReducer,
  venueReviewDelete: venueReviewDeleteReducer,
  addVenueReviewComment: addVenueReviewCommentReducer,
  castMemberList: castMemberListReducer,
  castMemberInfo: castMemberInfoReducer,
  castMemberCreate: castMemberCreateReducer,
  companyList: companyListReducer,
  companyInfo: companyInfoReducer,
  addCompanyReview: addCompanyReviewReducer,
  addCompanyImage: addCompanyImageReducer,
  companyShowList: companyShowListReducer,
  companyCreate: companyCreateReducer,
  companyMyReviews: companyMyReviewsReducer,
  companyUserReviews: companyUserReviewsReducer,
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
