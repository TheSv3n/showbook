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
  COMPANY_ADD_REVIEW_REQUEST,
  COMPANY_ADD_REVIEW_SUCCESS,
  COMPANY_ADD_REVIEW_FAIL,
  COMPANY_ADD_IMAGE_REQUEST,
  COMPANY_ADD_IMAGE_SUCCESS,
  COMPANY_ADD_IMAGE_FAIL,
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
  COMPANY_ADD_REVIEW_COMMENT_REQUEST,
  COMPANY_ADD_REVIEW_COMMENT_SUCCESS,
  COMPANY_ADD_REVIEW_COMMENT_FAIL,
  COMPANY_UPDATE_REVIEW_COMMENT_REQUEST,
  COMPANY_UPDATE_REVIEW_COMMENT_SUCCESS,
  COMPANY_UPDATE_REVIEW_COMMENT_FAIL,
  COMPANY_DELETE_REVIEW_COMMENT_REQUEST,
  COMPANY_DELETE_REVIEW_COMMENT_SUCCESS,
  COMPANY_DELETE_REVIEW_COMMENT_FAIL,
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

export const addCompanyReview =
  (companyId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_ADD_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/companies/${companyId}/reviews`, review, config);

      dispatch({
        type: COMPANY_ADD_REVIEW_SUCCESS,
      });
      dispatch(getCompanyInfo(companyId, true));
    } catch (error) {
      dispatch({
        type: COMPANY_ADD_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createCompanyImage =
  (companyId, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_ADD_IMAGE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/companies/${companyId}/images`, image, config);

      dispatch({
        type: COMPANY_ADD_IMAGE_SUCCESS,
      });
      dispatch(getCompanyInfo(companyId, true));
    } catch (error) {
      dispatch({
        type: COMPANY_ADD_IMAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyCompanyReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_MY_REVIEWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/companies/myreviews`, config);

    dispatch({
      type: COMPANY_MY_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_MY_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserCompanyReviews =
  (userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_USER_REVIEWS_REQUEST });

      const { data } = await axios.get(`/api/companies/userreviews/${userId}`);

      dispatch({
        type: COMPANY_USER_REVIEWS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMPANY_USER_REVIEWS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCompanyReviewInfo =
  (reviewId, update) => async (dispatch, getState) => {
    try {
      if (!update) {
        dispatch({
          type: COMPANY_REVIEW_DETAILS_REQUEST,
        });
      }

      const { data } = await axios.get(`/api/companies/reviews/${reviewId}`);

      dispatch({
        type: COMPANY_REVIEW_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMPANY_REVIEW_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editCompanyReview =
  (reviewId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_UPDATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/companies/reviews/${reviewId}`,
        review,
        config
      );

      dispatch({
        type: COMPANY_UPDATE_REVIEW_SUCCESS,
        payload: data,
      });
      dispatch(getCompanyReviewInfo(reviewId, true));
    } catch (error) {
      dispatch({
        type: COMPANY_UPDATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCompanyReview =
  (reviewId, companyId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_DELETE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/companies/reviews/${reviewId}`, config);

      dispatch({
        type: COMPANY_DELETE_REVIEW_SUCCESS,
      });
      dispatch(getCompanyInfo(companyId, true));
    } catch (error) {
      dispatch({
        type: COMPANY_DELETE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addCompanyReviewComment =
  (reviewId, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_ADD_REVIEW_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/companies/reviews/${reviewId}/comments`,
        comment,
        config
      );

      dispatch({
        type: COMPANY_ADD_REVIEW_COMMENT_SUCCESS,
      });
      dispatch(getCompanyReviewInfo(reviewId, true));
    } catch (error) {
      dispatch({
        type: COMPANY_ADD_REVIEW_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editCompanyReviewComment =
  (reviewId, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_UPDATE_REVIEW_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/companies/reviews/${reviewId}/comments`,
        comment,
        config
      );

      dispatch({
        type: COMPANY_UPDATE_REVIEW_COMMENT_SUCCESS,
        payload: data,
      });
      dispatch(getCompanyReviewInfo(reviewId, true));
    } catch (error) {
      dispatch({
        type: COMPANY_UPDATE_REVIEW_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCompanyReviewCommment =
  (reviewId, commentId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_DELETE_REVIEW_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `/api/companies/reviews/${reviewId}/comments?commentId=${commentId}`,
        config
      );

      dispatch({
        type: COMPANY_DELETE_REVIEW_COMMENT_SUCCESS,
      });
      dispatch(getCompanyReviewInfo(reviewId, true));
    } catch (error) {
      dispatch({
        type: COMPANY_DELETE_REVIEW_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
