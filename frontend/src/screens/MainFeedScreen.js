import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listShows } from "../actions/showActions";
import { listVenues } from "../actions/venueActions";
import { listCastMembers } from "../actions/castMemberActions";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import FeedShowCard from "../components/FeedShowCard";
import FeedVenueCard from "../components/FeedVenueCard";
import FeedCastMemberCard from "../components/FeedCastMemberCard";

const MainFeedScreen = ({ match }) => {
  const searchString = match.params.search;
  const dispatch = useDispatch();

  const [showTopRated, setShowTopRated] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const castMemberList = useSelector((state) => state.castMemberList);
  const {
    loading: castMemberLoading,
    castMembers,
    page: castMemberPage,
    feedFinished: castMemberFeedFinished,
    count: castMemberCount,
  } = castMemberList;

  useEffect(() => {
    dispatch(listShows(1, searchKeyword, showTopRated));
    dispatch(listVenues(1, searchKeyword, showTopRated));
    dispatch(listCastMembers(1, searchKeyword, showTopRated));
  }, [dispatch, searchKeyword, showTopRated, searchString]);
  return (
    <>
      <section className="p-5 text-center">
        {loading ? (
          <Loader />
        ) : (
          <Container>
            <h2 className="text-center text-white">
              Shows{" "}
              <Link to="/addshow">
                <span className="link text-secondary">
                  {userInfo ? <i className="bi bi-plus-circle-fill"></i> : ""}
                </span>
              </Link>
            </h2>
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
            <h2 className="text-center text-white ">
              Venues{" "}
              <Link to="/addvenue">
                <span className="link text-secondary ">
                  {userInfo ? <i className="bi bi-plus-circle-fill"></i> : ""}
                </span>
              </Link>
            </h2>
            <Row className="g-4">
              {venues &&
                venues.map((venue) => {
                  return <FeedVenueCard key={venue._id} venue={venue} />;
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
            <h2 className="text-center text-white">
              Cast Members{" "}
              <Link to="/addcastmember">
                <span className="link text-secondary">
                  {userInfo ? <i className="bi bi-plus-circle-fill"></i> : ""}
                </span>
              </Link>
            </h2>
            <Row className="g-4">
              {castMembers &&
                castMembers.map((castMember) => {
                  return (
                    <FeedCastMemberCard
                      key={castMember._id}
                      castMember={castMember}
                    />
                  );
                })}
            </Row>
          </Container>
        )}
      </section>
    </>
  );
};

export default MainFeedScreen;
