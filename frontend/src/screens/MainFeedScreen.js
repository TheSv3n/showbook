import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listShows } from "../actions/showActions";
import { Container, Row } from "react-bootstrap";
import Loader from "../components/Loader";
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
      <section className="p-5 text-center">
        {loading ? (
          <Loader />
        ) : (
          <Container>
            <h2 className="text-center text-white">Shows</h2>
            <Row className="g-4">
              {shows &&
                shows.map((show) => {
                  return <FeedShowCard key={show.id} show={show} />;
                })}
            </Row>
          </Container>
        )}
      </section>
    </>
  );
};

export default MainFeedScreen;
