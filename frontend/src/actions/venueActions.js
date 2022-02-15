import axios from "axios";
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
  VENUE_CREATE_REQUEST,
  VENUE_CREATE_SUCCESS,
  VENUE_CREATE_FAIL,
  VENUE_ADD_IMAGE_REQUEST,
  VENUE_ADD_IMAGE_SUCCESS,
  VENUE_ADD_IMAGE_FAIL,
  VENUE_MY_REVIEWS_REQUEST,
  VENUE_MY_REVIEWS_SUCCESS,
  VENUE_MY_REVIEWS_FAIL,
  VENUE_USER_REVIEWS_REQUEST,
  VENUE_USER_REVIEWS_SUCCESS,
  VENUE_USER_REVIEWS_FAIL,
  VENUE_REVIEW_DETAILS_REQUEST,
  VENUE_REVIEW_DETAILS_SUCCESS,
  VENUE_REVIEW_DETAILS_FAIL,
} from "../constants/venueConstants";

export const listVenues =
  (newPage, searchKeyword, showRanked) => async (dispatch, getState) => {
    try {
      if (newPage === 1) {
        dispatch({ type: VENUE_LIST_REQUEST });
      } else {
        dispatch({ type: VENUE_LIST_UPDATE_REQUEST });
      }
      const {
        venueList: { venues: venuesOld },
      } = getState();

      const { data } = await axios.get(
        `/api/venues?pageNumber=${newPage}&keyword=${searchKeyword}&ranked=${showRanked}`
      );

      let tempVenues;

      if (newPage === 1) {
        tempVenues = [...data.venues];
      } else {
        tempVenues = [...venuesOld, ...data.venues];
      }

      let feedFinished = false;

      if (data.page === data.pages) {
        feedFinished = true;
      }

      const newPayload = {
        venues: tempVenues,
        page: data.page,
        pages: data.pages,
        count: data.count,
        feedFinished: feedFinished,
      };
      dispatch({
        type: VENUE_LIST_SUCCESS,
        payload: newPayload,
      });
    } catch (error) {
      dispatch({
        type: VENUE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getVenueInfo = (venueId, update) => async (dispatch, getState) => {
  try {
    if (!update) {
      dispatch({
        type: VENUE_DETAILS_REQUEST,
      });
    }

    const { data } = await axios.get(`/api/venues/${venueId}`);

    dispatch({
      type: VENUE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VENUE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addVenueReview =
  (venueId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VENUE_ADD_REVIEW_REQUEST,
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

      await axios.put(`/api/venues/${venueId}/reviews`, review, config);

      dispatch({
        type: VENUE_ADD_REVIEW_SUCCESS,
      });
      dispatch(getVenueInfo(venueId, true));
    } catch (error) {
      dispatch({
        type: VENUE_ADD_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createVenue = (venue) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENUE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/venues/`, venue, config);

    dispatch({
      type: VENUE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VENUE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createVenueImage =
  (venueId, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VENUE_ADD_IMAGE_REQUEST,
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

      await axios.put(`/api/venues/${venueId}/images`, image, config);

      dispatch({
        type: VENUE_ADD_IMAGE_SUCCESS,
      });
      dispatch(getVenueInfo(venueId, true));
    } catch (error) {
      dispatch({
        type: VENUE_ADD_IMAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyVenueReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: VENUE_MY_REVIEWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/venues/myreviews`, config);

    dispatch({
      type: VENUE_MY_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VENUE_MY_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserVenueReviews = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: VENUE_USER_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/venues/userreviews/${userId}`);

    dispatch({
      type: VENUE_USER_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VENUE_USER_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVenueReviewInfo =
  (reviewId, update) => async (dispatch, getState) => {
    try {
      if (!update) {
        dispatch({
          type: VENUE_REVIEW_DETAILS_REQUEST,
        });
      }

      const { data } = await axios.get(`/api/shows/venues/${reviewId}`);

      dispatch({
        type: VENUE_REVIEW_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: VENUE_REVIEW_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
