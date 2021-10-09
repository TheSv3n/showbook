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
