import axios from "axios";
import {
  VENUE_LIST_REQUEST,
  VENUE_LIST_SUCCESS,
  VENUE_LIST_FAIL,
  VENUE_LIST_UPDATE_REQUEST,
  VENUE_DETAILS_REQUEST,
  VENUE_DETAILS_SUCCESS,
  VENUE_DETAILS_FAIL,
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
