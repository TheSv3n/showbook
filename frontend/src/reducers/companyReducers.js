import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_UPDATE_REQUEST,
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
    default:
      return state;
  }
};
