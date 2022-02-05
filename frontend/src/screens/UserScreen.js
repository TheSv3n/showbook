import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsById } from "../actions/userActions";

const UserScreen = ({ match }) => {
  const dispatch = useDispatch();
  const userId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetailsById(userId));
    }
  }, [dispatch, userId, userInfo, user]);

  return <div></div>;
};

export default UserScreen;
