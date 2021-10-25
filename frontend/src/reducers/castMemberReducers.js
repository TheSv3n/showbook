import {
  CAST_MEMBER_LIST_REQUEST,
  CAST_MEMBER_LIST_SUCCESS,
  CAST_MEMBER_LIST_FAIL,
  CAST_MEMBER_LIST_UPDATE_REQUEST,
  CAST_MEMBER_DETAILS_REQUEST,
  CAST_MEMBER_DETAILS_SUCCESS,
  CAST_MEMBER_DETAILS_FAIL,
} from "../constants/castMemberConstants";

export const castMemberListReducer = (state = { castMembers: [] }, action) => {
  switch (action.type) {
    case CAST_MEMBER_LIST_REQUEST:
      return { loading: true, castMembers: [] };
    case CAST_MEMBER_LIST_SUCCESS:
      return {
        loading: false,
        castMembers: action.payload.castMembers,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
        feedFinished: action.payload.feedFinished,
      };
    case CAST_MEMBER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CAST_MEMBER_LIST_UPDATE_REQUEST:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const castMemberInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case CAST_MEMBER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CAST_MEMBER_DETAILS_SUCCESS:
      return {
        loading: false,
        castMember: action.payload,
      };
    case CAST_MEMBER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
