import {
  CAST_MEMBER_LIST_REQUEST,
  CAST_MEMBER_LIST_SUCCESS,
  CAST_MEMBER_LIST_FAIL,
  CAST_MEMBER_LIST_UPDATE_REQUEST,
} from "../constants/castMemberConstants";

import axios from "axios";

export const listCastMembers =
  (newPage, searchKeyword, showRanked) => async (dispatch, getState) => {
    try {
      if (newPage === 1) {
        dispatch({ type: CAST_MEMBER_LIST_REQUEST });
      } else {
        dispatch({ type: CAST_MEMBER_LIST_UPDATE_REQUEST });
      }
      const {
        castMemberList: { castMembers: castMembersOld },
      } = getState();

      const { data } = await axios.get(
        `/api/castmembers?pageNumber=${newPage}&keyword=${searchKeyword}&ranked=${showRanked}`
      );

      let tempCastMembers;

      if (newPage === 1) {
        tempCastMembers = [...data.castMembers];
      } else {
        tempCastMembers = [...castMembersOld, ...data.castMembers];
      }

      let feedFinished = false;

      if (data.page === data.pages) {
        feedFinished = true;
      }

      const newPayload = {
        castMembers: tempCastMembers,
        page: data.page,
        pages: data.pages,
        count: data.count,
        feedFinished: feedFinished,
      };
      dispatch({
        type: CAST_MEMBER_LIST_SUCCESS,
        payload: newPayload,
      });
    } catch (error) {
      dispatch({
        type: CAST_MEMBER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
