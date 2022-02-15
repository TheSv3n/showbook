import {
  VENUE_LIST_REQUEST,
  VENUE_LIST_SUCCESS,
  VENUE_LIST_FAIL,
  VENUE_LIST_UPDATE_REQUEST,
  VENUE_DETAILS_REQUEST,
  VENUE_DETAILS_SUCCESS,
  VENUE_DETAILS_FAIL,
  VENUE_ADD_REVIEW_REQUEST,
  VENUE_ADD_REVIEW_SUCCESS,
  VENUE_ADD_REVIEW_FAIL,
  VENUE_LIST_RESET,
  VENUE_CREATE_REQUEST,
  VENUE_CREATE_SUCCESS,
  VENUE_CREATE_FAIL,
  VENUE_CREATE_RESET,
  VENUE_ADD_IMAGE_REQUEST,
  VENUE_ADD_IMAGE_SUCCESS,
  VENUE_ADD_IMAGE_FAIL,
  VENUE_ADD_IMAGE_RESET,
  VENUE_MY_REVIEWS_REQUEST,
  VENUE_MY_REVIEWS_SUCCESS,
  VENUE_MY_REVIEWS_FAIL,
  VENUE_USER_REVIEWS_REQUEST,
  VENUE_USER_REVIEWS_SUCCESS,
  VENUE_USER_REVIEWS_FAIL,
  VENUE_REVIEW_DETAILS_REQUEST,
  VENUE_REVIEW_DETAILS_SUCCESS,
  VENUE_REVIEW_DETAILS_FAIL,
} from "../constants/venueConstants";

export const venueListReducer = (state = { venues: [] }, action) => {
  switch (action.type) {
    case VENUE_LIST_REQUEST:
      return { loading: true, venues: [] };
    case VENUE_LIST_SUCCESS:
      return {
        loading: false,
        venues: action.payload.venues,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
        feedFinished: action.payload.feedFinished,
      };
    case VENUE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case VENUE_LIST_UPDATE_REQUEST:
      return { ...state, loading: true };
    case VENUE_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const venueInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case VENUE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VENUE_DETAILS_SUCCESS:
      return {
        loading: false,
        venue: action.payload,
      };
    case VENUE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addVenueReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case VENUE_ADD_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case VENUE_ADD_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        venue: action.payload,
      };
    case VENUE_ADD_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const venueCreateReducer = (state = { venue: [] }, action) => {
  switch (action.type) {
    case VENUE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case VENUE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        venue: action.payload,
      };
    case VENUE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case VENUE_CREATE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const addVenueImageReducer = (state = {}, action) => {
  switch (action.type) {
    case VENUE_ADD_IMAGE_REQUEST:
      return {
        loading: true,
      };
    case VENUE_ADD_IMAGE_SUCCESS:
      return {
        loading: false,
        success: true,
        show: action.payload,
      };
    case VENUE_ADD_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case VENUE_ADD_IMAGE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const venueMyReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case VENUE_MY_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case VENUE_MY_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
      };
    case VENUE_MY_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const venueUserReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case VENUE_USER_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case VENUE_USER_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
      };
    case VENUE_USER_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const venueReviewInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case VENUE_REVIEW_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VENUE_REVIEW_DETAILS_SUCCESS:
      return {
        loading: false,
        review: action.payload,
      };
    case VENUE_REVIEW_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
