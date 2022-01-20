import axios from "axios";
import {
  SHOW_CREATE_REQUEST,
  SHOW_CREATE_SUCCESS,
  SHOW_CREATE_FAIL,
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
  SHOW_ADD_IMAGE_REQUEST,
  SHOW_ADD_IMAGE_SUCCESS,
  SHOW_ADD_IMAGE_FAIL,
  SHOW_COMPANY_LIST_REQUEST,
  SHOW_COMPANY_LIST_SUCCESS,
  SHOW_COMPANY_LIST_FAIL,
  SHOW_ADD_ROLE_REQUEST,
  SHOW_ADD_ROLE_SUCCESS,
  SHOW_ADD_ROLE_FAIL,
  SHOW_USER_REVIEWS_REQUEST,
  SHOW_USER_REVIEWS_SUCCESS,
  SHOW_USER_REVIEWS_FAIL,
} from "../constants/showConstants";

export const listShows =
  (newPage, searchKeyword, showRanked) => async (dispatch, getState) => {
    try {
      if (newPage === 1) {
        dispatch({ type: SHOW_LIST_REQUEST });
      } else {
        dispatch({ type: SHOW_LIST_UPDATE_REQUEST });
      }
      const {
        showList: { shows: showsOld },
      } = getState();

      const { data } = await axios.get(
        `/api/shows?pageNumber=${newPage}&keyword=${searchKeyword}&ranked=${showRanked}`
      );

      let tempShows;

      if (newPage === 1) {
        tempShows = [...data.shows];
      } else {
        tempShows = [...showsOld, ...data.shows];
      }

      let feedFinished = false;

      if (data.page === data.pages) {
        feedFinished = true;
      }

      const newPayload = {
        shows: tempShows,
        page: data.page,
        pages: data.pages,
        count: data.count,
        feedFinished: feedFinished,
      };
      dispatch({
        type: SHOW_LIST_SUCCESS,
        payload: newPayload,
      });
    } catch (error) {
      dispatch({
        type: SHOW_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getShowInfo = (showId, update) => async (dispatch, getState) => {
  try {
    if (!update) {
      dispatch({
        type: SHOW_DETAILS_REQUEST,
      });
    }

    const { data } = await axios.get(`/api/shows/${showId}`);

    dispatch({
      type: SHOW_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createShow = (show) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOW_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/shows/`, show, config);

    dispatch({
      type: SHOW_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addShowReview = (showId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOW_ADD_REVIEW_REQUEST,
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

    await axios.put(`/api/shows/${showId}/reviews`, review, config);

    dispatch({
      type: SHOW_ADD_REVIEW_SUCCESS,
    });
    dispatch(getShowInfo(showId, true));
  } catch (error) {
    dispatch({
      type: SHOW_ADD_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listVenuePerformances =
  (venueId) => async (dispatch, getState) => {
    try {
      dispatch({ type: SHOW_VENUE_PERFORMANCES_REQUEST });

      const { data } = await axios.get(
        `/api/shows/venue/${venueId}/performances`
      );

      dispatch({
        type: SHOW_VENUE_PERFORMANCES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SHOW_VENUE_PERFORMANCES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addPerformance =
  (showId, performance) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOW_ADD_PERFORMANCE_REQUEST,
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

      await axios.put(`/api/shows/${showId}/performances`, performance, config);

      dispatch({
        type: SHOW_ADD_PERFORMANCE_SUCCESS,
      });
      dispatch(getShowInfo(showId, true));
    } catch (error) {
      dispatch({
        type: SHOW_ADD_PERFORMANCE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createShowImage =
  (showId, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOW_ADD_IMAGE_REQUEST,
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

      await axios.put(`/api/shows/${showId}/images`, image, config);

      dispatch({
        type: SHOW_ADD_IMAGE_SUCCESS,
      });
      dispatch(getShowInfo(showId, true));
    } catch (error) {
      dispatch({
        type: SHOW_ADD_IMAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listCompanyShows = (companyId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOW_COMPANY_LIST_REQUEST });

    const { data } = await axios.get(`/api/shows/company/${companyId}`);

    dispatch({
      type: SHOW_COMPANY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createShowRole = (showId, role) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOW_ADD_ROLE_REQUEST,
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

    await axios.put(`/api/shows/${showId}/roles`, role, config);

    dispatch({
      type: SHOW_ADD_ROLE_SUCCESS,
    });
    dispatch(getShowInfo(showId, true));
  } catch (error) {
    dispatch({
      type: SHOW_ADD_ROLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOW_USER_REVIEWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/shows/myreviews`, config);

    dispatch({
      type: SHOW_USER_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_USER_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
