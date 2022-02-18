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
  COMPANY_MY_REVIEWS_REQUEST,
  COMPANY_MY_REVIEWS_SUCCESS,
  COMPANY_MY_REVIEWS_FAIL,
  COMPANY_USER_REVIEWS_REQUEST,
  COMPANY_USER_REVIEWS_SUCCESS,
  COMPANY_USER_REVIEWS_FAIL,
  COMPANY_REVIEW_DETAILS_REQUEST,
  COMPANY_REVIEW_DETAILS_SUCCESS,
  COMPANY_REVIEW_DETAILS_FAIL,
  COMPANY_UPDATE_REVIEW_REQUEST,
  COMPANY_UPDATE_REVIEW_SUCCESS,
  COMPANY_UPDATE_REVIEW_FAIL,
  COMPANY_DELETE_REVIEW_REQUEST,
  COMPANY_DELETE_REVIEW_SUCCESS,
  COMPANY_DELETE_REVIEW_FAIL,
  COMPANY_DELETE_REVIEW_RESET,
  COMPANY_UPDATE_REVIEW_RESET,
  COMPANY_ADD_REVIEW_COMMENT_REQUEST,
  COMPANY_ADD_REVIEW_COMMENT_SUCCESS,
  COMPANY_ADD_REVIEW_COMMENT_FAIL,
} from "../constants/companyConstants";

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

export const companyMyReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case COMPANY_MY_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case COMPANY_MY_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
      };
    case COMPANY_MY_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyUserReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case COMPANY_USER_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case COMPANY_USER_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
      };
    case COMPANY_USER_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyReviewInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_REVIEW_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_REVIEW_DETAILS_SUCCESS:
      return {
        loading: false,
        review: action.payload,
      };
    case COMPANY_REVIEW_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateCompanyReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_UPDATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case COMPANY_UPDATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        review: action.payload,
      };
    case COMPANY_UPDATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPANY_UPDATE_REVIEW_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const companyReviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_DELETE_REVIEW_REQUEST:
      return { loading: true };
    case COMPANY_DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_DELETE_REVIEW_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const addCompanyReviewCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_ADD_REVIEW_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case COMPANY_ADD_REVIEW_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        comment: action.payload,
      };
    case COMPANY_ADD_REVIEW_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
