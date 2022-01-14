import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_UPDATE_REQUEST,
  COMPANY_LIST_RESET,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_ADD_REVIEW_REQUEST,
  COMPANY_ADD_REVIEW_SUCCESS,
  COMPANY_ADD_REVIEW_FAIL,
  COMPANY_ADD_IMAGE_REQUEST,
  COMPANY_ADD_IMAGE_SUCCESS,
  COMPANY_ADD_IMAGE_FAIL,
  COMPANY_ADD_IMAGE_RESET,
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_FAIL,
  COMPANY_CREATE_RESET,
} from "../constants/companyConstants";
import {
  VENUE_ADD_IMAGE_FAIL,
  VENUE_ADD_IMAGE_REQUEST,
  VENUE_ADD_IMAGE_SUCCESS,
} from "../constants/venueConstants";

export const companyListReducer = (state = { companies: [] }, action) => {
  switch (action.type) {
    case COMPANY_LIST_REQUEST:
      return { loading: true, companies: [] };
    case COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        companies: action.payload.companies,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
        feedFinished: action.payload.feedFinished,
      };
    case COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_LIST_UPDATE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const companyInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_DETAILS_SUCCESS:
      return {
        loading: false,
        company: action.payload,
      };
    case COMPANY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addCompanyReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_ADD_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case COMPANY_ADD_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        company: action.payload,
      };
    case COMPANY_ADD_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addCompanyImageReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_ADD_IMAGE_REQUEST:
      return {
        loading: true,
      };
    case COMPANY_ADD_IMAGE_SUCCESS:
      return {
        loading: false,
        success: true,
        company: action.payload,
      };
    case COMPANY_ADD_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPANY_ADD_IMAGE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const companyCreateReducer = (state = { company: [] }, action) => {
  switch (action.type) {
    case COMPANY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case COMPANY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        company: action.payload,
      };
    case COMPANY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPANY_CREATE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};
