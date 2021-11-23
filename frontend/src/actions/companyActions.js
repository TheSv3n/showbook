import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_UPDATE_REQUEST,
} from "../constants/companyConstants";
import axios from "axios";

export const listCompanies =
  (newPage, searchKeyword, showRanked) => async (dispatch, getState) => {
    try {
      if (newPage === 1) {
        dispatch({ type: COMPANY_LIST_REQUEST });
      } else {
        dispatch({ type: COMPANY_LIST_UPDATE_REQUEST });
      }
      const {
        companyList: { companies: companiesOld },
      } = getState();

      const { data } = await axios.get(
        `/api/companies?pageNumber=${newPage}&keyword=${searchKeyword}&ranked=${showRanked}`
      );

      let tempCompanies;

      if (newPage === 1) {
        tempCompanies = [...data.companies];
      } else {
        tempCompanies = [...companiesOld, ...data.companies];
      }

      let feedFinished = false;

      if (data.page === data.pages) {
        feedFinished = true;
      }

      const newPayload = {
        companies: tempCompanies,
        page: data.page,
        pages: data.pages,
        count: data.count,
        feedFinished: feedFinished,
      };
      dispatch({
        type: COMPANY_LIST_SUCCESS,
        payload: newPayload,
      });
    } catch (error) {
      dispatch({
        type: COMPANY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
