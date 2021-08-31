import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listShows } from "../actions/showActions";
import FeedShowCard from "../components/FeedShowCard";

const MainFeedScreen = ({ match }) => {
  const searchString = match.params.search;
  const dispatch = useDispatch();

  const [showTopRated, setShowTopRated] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const showList = useSelector((state) => state.showList);
  const { loading, shows, page, feedFinished, count } = showList;

  useEffect(() => {
    dispatch(listShows(1, searchKeyword, showTopRated));
  }, [dispatch, searchKeyword, showTopRated, searchString]);
  return (
    <>
      <section class="bg-dark p-5 text-center ">
        <div class="container">
          <h2 class="text-center text-white">Shows</h2>
          <div class="row g-4">
            {shows &&
              shows.map((show) => {
                return <FeedShowCard key={show.id} show={show} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainFeedScreen;
