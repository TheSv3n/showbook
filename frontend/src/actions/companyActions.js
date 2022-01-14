import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_UPDATE_REQUEST,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_FAIL,
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

export const getCompanyInfo =
  (companyId, update) => async (dispatch, getState) => {
    try {
      if (!update) {
        dispatch({
          type: COMPANY_DETAILS_REQUEST,
        });
      }

      const { data } = await axios.get(`/api/companies/${companyId}`);

      dispatch({
        type: COMPANY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMPANY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createCompany = (company) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/companies/`, company, config);

    dispatch({
      type: COMPANY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
