import React, { useEffect } from "react";
import { getUserProfile, logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserProfile());
      }
    }
  }, [dispatch, userInfo, user, history]);

  return <div>Profile screen</div>;
};

export default ProfileScreen;
