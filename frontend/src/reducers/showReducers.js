import {
  SHOW_CREATE_REQUEST,
  SHOW_CREATE_SUCCESS,
  SHOW_CREATE_FAIL,
  SHOW_CREATE_RESET,
  SHOW_LIST_REQUEST,
  SHOW_LIST_SUCCESS,
  SHOW_LIST_FAIL,
  SHOW_LIST_UPDATE_REQUEST,
  SHOW_DETAILS_REQUEST,
  SHOW_DETAILS_SUCCESS,
  SHOW_DETAILS_FAIL,
  SHOW_ADD_REVIEW_REQUEST,
  SHOW_ADD_REVIEW_SUCCESS,
  SHOW_ADD_REVIEW_FAIL,
  SHOW_VENUE_PERFORMANCES_REQUEST,
  SHOW_VENUE_PERFORMANCES_SUCCESS,
  SHOW_VENUE_PERFORMANCES_FAIL,
  SHOW_ADD_PERFORMANCE_REQUEST,
  SHOW_ADD_PERFORMANCE_SUCCESS,
  SHOW_ADD_PERFORMANCE_FAIL,
  SHOW_ADD_PERFORMANCE_RESET,
  SHOW_ADD_IMAGE_REQUEST,
  SHOW_ADD_IMAGE_SUCCESS,
  SHOW_ADD_IMAGE_FAIL,
  SHOW_ADD_IMAGE_RESET,
  SHOW_COMPANY_LIST_REQUEST,
  SHOW_COMPANY_LIST_SUCCESS,
  SHOW_COMPANY_LIST_FAIL,
  SHOW_ADD_ROLE_REQUEST,
  SHOW_ADD_ROLE_SUCCESS,
  SHOW_ADD_ROLE_FAIL,
  SHOW_ADD_ROLE_RESET,
  SHOW_USER_REVIEWS_REQUEST,
  SHOW_USER_REVIEWS_SUCCESS,
  SHOW_USER_REVIEWS_FAIL,
  SHOW_REVIEW_DETAILS_REQUEST,
  SHOW_REVIEW_DETAILS_SUCCESS,
  SHOW_REVIEW_DETAILS_FAIL,
  SHOW_ADD_REVIEW_COMMENT_REQUEST,
  SHOW_ADD_REVIEW_COMMENT_SUCCESS,
  SHOW_ADD_REVIEW_COMMENT_FAIL,
  SHOW_UPDATE_REVIEW_REQUEST,
  SHOW_UPDATE_REVIEW_SUCCESS,
  SHOW_UPDATE_REVIEW_FAIL,
  SHOW_UPDATE_REVIEW_COMMENT_REQUEST,
  SHOW_UPDATE_REVIEW_COMMENT_SUCCESS,
  SHOW_UPDATE_REVIEW_COMMENT_FAIL,
  SHOW_UPDATE_REVIEW_COMMENT_RESET,
  SHOW_DELETE_REVIEW_REQUEST,
  SHOW_DELETE_REVIEW_SUCCESS,
  SHOW_DELETE_REVIEW_FAIL,
  SHOW_DELETE_REVIEW_RESET,
  SHOW_DELETE_REVIEW_COMMENT_REQUEST,
  SHOW_DELETE_REVIEW_COMMENT_SUCCESS,
  SHOW_DELETE_REVIEW_COMMENT_FAIL,
  SHOW_DELETE_REVIEW_COMMENT_RESET,
  SHOW_MY_REVIEWS_REQUEST,
  SHOW_MY_REVIEWS_SUCCESS,
  SHOW_MY_REVIEWS_FAIL,
} from "../constants/showConstants";

export const showListReducer = (state = { shows: [] }, action) => {
  switch (action.type) {
    case SHOW_LIST_REQUEST:
      return { loading: true, shows: [] };
    case SHOW_LIST_SUCCESS:
      return {
        loading: false,
        shows: action.payload.shows,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
        feedFinished: action.payload.feedFinished,
      };
    case SHOW_LIST_FAIL:
      return { loading: false, error: action.payload };
    case SHOW_LIST_UPDATE_REQUEST:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const showInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SHOW_DETAILS_SUCCESS:
      return {
        loading: false,
        show: action.payload,
      };
    case SHOW_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const showCreateReducer = (state = { show: [] }, action) => {
  switch (action.type) {
    case SHOW_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SHOW_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        show: action.payload,
      };
    case SHOW_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOW_CREATE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const addShowReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ADD_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case SHOW_ADD_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        show: action.payload,
      };
    case SHOW_ADD_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const showVenuePerformancesReducer = (
  state = { performances: [] },
  action
) => {
  switch (action.type) {
    case SHOW_VENUE_PERFORMANCES_REQUEST:
      return { loading: true, performances: [] };
    case SHOW_VENUE_PERFORMANCES_SUCCESS:
      return {
        loading: false,
        performances: action.payload.performances,
      };
    case SHOW_VENUE_PERFORMANCES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addShowPerformanceReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ADD_PERFORMANCE_REQUEST:
      return {
        loading: true,
      };
    case SHOW_ADD_PERFORMANCE_SUCCESS:
      return {
        loading: false,
        success: true,
        performance: action.payload,
      };
    case SHOW_ADD_PERFORMANCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOW_ADD_PERFORMANCE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const addShowImageReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ADD_IMAGE_REQUEST:
      return {
        loading: true,
      };
    case SHOW_ADD_IMAGE_SUCCESS:
      return {
        loading: false,
        success: true,
        show: action.payload,
      };
    case SHOW_ADD_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOW_ADD_IMAGE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const companyShowListReducer = (state = { shows: [] }, action) => {
  switch (action.type) {
    case SHOW_COMPANY_LIST_REQUEST:
      return { loading: true, shows: [] };
    case SHOW_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        shows: action.payload.shows,
      };
    case SHOW_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addShowRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ADD_ROLE_REQUEST:
      return {
        loading: true,
      };
    case SHOW_ADD_ROLE_SUCCESS:
      return {
        loading: false,
        success: true,
        show: action.payload,
      };
    case SHOW_ADD_ROLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOW_ADD_ROLE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const showMyReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case SHOW_MY_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case SHOW_MY_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
      };
    case SHOW_MY_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const showReviewInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_REVIEW_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SHOW_REVIEW_DETAILS_SUCCESS:
      return {
        loading: false,
        review: action.payload,
      };
    case SHOW_REVIEW_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addShowReviewCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ADD_REVIEW_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case SHOW_ADD_REVIEW_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        comment: action.payload,
      };
    case SHOW_ADD_REVIEW_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateShowReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_UPDATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case SHOW_UPDATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        review: action.payload,
      };
    case SHOW_UPDATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateShowReviewCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_UPDATE_REVIEW_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case SHOW_UPDATE_REVIEW_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        comment: action.payload,
      };
    case SHOW_UPDATE_REVIEW_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOW_UPDATE_REVIEW_COMMENT_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const showReviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_DELETE_REVIEW_REQUEST:
      return { loading: true };
    case SHOW_DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case SHOW_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case SHOW_DELETE_REVIEW_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const showReviewDeleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_DELETE_REVIEW_COMMENT_REQUEST:
      return { loading: true };
    case SHOW_DELETE_REVIEW_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case SHOW_DELETE_REVIEW_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case SHOW_DELETE_REVIEW_COMMENT_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const showUserReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case SHOW_USER_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case SHOW_USER_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
      };
    case SHOW_USER_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
