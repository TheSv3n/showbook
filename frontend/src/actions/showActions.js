import axios from "axios";
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
