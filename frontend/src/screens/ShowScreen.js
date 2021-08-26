import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowInfo } from "../actions/showActions";

const ShowScreen = ({ match }) => {
  const dispatch = useDispatch();
  const showId = match.params.id;

  const showInfo = useSelector((state) => state.showInfo);
  const { show, loading } = showInfo;

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    } else {
      //
    }
  }, [dispatch, showId, show]);
  return <div>{show && show.title}</div>;
};

export default ShowScreen;
