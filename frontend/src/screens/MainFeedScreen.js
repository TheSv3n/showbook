import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listShows } from "../actions/showActions";

const MainFeedScreen = ({ match }) => {
  const searchString = match.params.search;
  const dispatch = useDispatch();

  const [showTopRated, setShowTopRated] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    dispatch(listShows(1, searchKeyword, showTopRated));
  }, [dispatch, searchKeyword, showTopRated, searchString]);
  return <div>Main Feed</div>;
};

export default MainFeedScreen;
