import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  showListReducer,
  showInfoReducer,
  updateShowReducer,
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
  showCastMemberRolesReducer,
  addShowViewerReducer,
  showMyWatchlistReducer,
  showViewerDeleteReducer,
} from "./reducers/showReducers";

import {
  venueListReducer,
  venueInfoReducer,
  updateVenueReducer,
  addVenueReviewReducer,
  addVenueImageReducer,
  venueCreateReducer,
  venueMyReviewsReducer,
  venueUserReviewsReducer,
  venueReviewInfoReducer,
  updateVenueReviewReducer,
  venueReviewDeleteReducer,
  addVenueReviewCommentReducer,
  updateVenueReviewCommentReducer,
  venueReviewDeleteCommentReducer,
} from "./reducers/venueReducers";

import {
  castMemberListReducer,
  castMemberInfoReducer,
  castMemberCreateReducer,
} from "./reducers/castMemberReducers";

import {
  companyListReducer,
  companyInfoReducer,
  updateCompanyReducer,
  addCompanyReviewReducer,
  addCompanyImageReducer,
  companyCreateReducer,
  companyMyReviewsReducer,
  companyUserReviewsReducer,
  companyReviewInfoReducer,
  updateCompanyReviewReducer,
  companyReviewDeleteReducer,
  addCompanyReviewCommentReducer,
  updateCompanyReviewCommentReducer,
  companyReviewDeleteCommentReducer,
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
  updateShow: updateShowReducer,
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
  showCastMemberRoles: showCastMemberRolesReducer,
  addShowViewer: addShowViewerReducer,
  showMyWatchlist: showMyWatchlistReducer,
  showViewerDelete: showViewerDeleteReducer,
  venueList: venueListReducer,
  venueInfo: venueInfoReducer,
  updateVenue: updateVenueReducer,
  addVenueReview: addVenueReviewReducer,
  addVenueImage: addVenueImageReducer,
  venueCreate: venueCreateReducer,
  venueMyReviews: venueMyReviewsReducer,
  venueUserReviews: venueUserReviewsReducer,
  venueReviewInfo: venueReviewInfoReducer,
  updateVenueReview: updateVenueReviewReducer,
  venueReviewDelete: venueReviewDeleteReducer,
  addVenueReviewComment: addVenueReviewCommentReducer,
  updateVenueReviewComment: updateVenueReviewCommentReducer,
  venueReviewDeleteComment: venueReviewDeleteCommentReducer,
  castMemberList: castMemberListReducer,
  castMemberInfo: castMemberInfoReducer,
  castMemberCreate: castMemberCreateReducer,
  companyList: companyListReducer,
  companyInfo: companyInfoReducer,
  updateCompany: updateCompanyReducer,
  addCompanyReview: addCompanyReviewReducer,
  addCompanyImage: addCompanyImageReducer,
  companyShowList: companyShowListReducer,
  companyCreate: companyCreateReducer,
  companyMyReviews: companyMyReviewsReducer,
  companyUserReviews: companyUserReviewsReducer,
  companyReviewInfo: companyReviewInfoReducer,
  updateCompanyReview: updateCompanyReviewReducer,
  companyReviewDelete: companyReviewDeleteReducer,
  addCompanyReviewComment: addCompanyReviewCommentReducer,
  updateCompanyReviewComment: updateCompanyReviewCommentReducer,
  companyReviewDeleteComment: companyReviewDeleteCommentReducer,
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
