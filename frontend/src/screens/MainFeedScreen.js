import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listShows } from "../actions/showActions";
import { listVenues } from "../actions/venueActions";
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

  const venueList = useSelector((state) => state.venueList);
  const {
    loading: venueLoading,
    venues,
    page: venuePage,
    feedFinished: venueFeedFinished,
    count: venueCount,
  } = venueList;

  useEffect(() => {
    dispatch(listShows(1, searchKeyword, showTopRated));
    dispatch(listVenues(1, searchKeyword, showTopRated));
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
      <section className="p-5 text-center">
        {loading ? (
          <Loader />
        ) : (
          <Container>
            <h2 className="text-center text-white">Venues</h2>
            <Row className="g-4">
              {venues &&
                venues.map((venue) => {
                  return <div>{venue.name}</div>;
                })}
            </Row>
          </Container>
        )}
      </section>
    </>
  );
};

export default MainFeedScreen;
