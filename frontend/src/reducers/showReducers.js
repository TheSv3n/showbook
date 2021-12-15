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
