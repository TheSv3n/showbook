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
} from "../constants/showConstants";

export const showListReducer = (state = { shows: [] }, action) => {
  switch (action.type) {
    case SHOW_LIST_REQUEST:
      return { loading: true, recipes: [] };
    case SHOW_LIST_SUCCESS:
      return {
        loading: false,
        shows: action.payload.recipes,
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
