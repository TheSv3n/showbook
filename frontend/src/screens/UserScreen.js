import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsById } from "../actions/userActions";
import { Image, Container, Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { listUserShowReviews } from "../actions/showActions";
import { listUserVenueReviews } from "../actions/venueActions";
import { listUserCompanyReviews } from "../actions/companyActions";
import ReviewTableRow from "../components/ReviewTableRow";

const UserScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const showUserReviews = useSelector((state) => state.showUserReviews);
  const {
    loading: loadingShowReviews,
    error: errorShowReviews,
    reviews: showReviews,
  } = showUserReviews;

  const venueUserReviews = useSelector((state) => state.venueUserReviews);
  const {
    loading: loadingVenueReviews,
    error: errorVenueReviews,
    reviews: venueReviews,
  } = venueUserReviews;

  const companyUserReviews = useSelector((state) => state.companyUserReviews);
  const {
    loading: loadingCompanyReviews,
    error: errorCompanyReviews,
    reviews: companyReviews,
  } = companyUserReviews;

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetailsById(userId));
      dispatch(listUserShowReviews(userId));
      dispatch(listUserVenueReviews(userId));
      dispatch(listUserCompanyReviews(userId));
    }
  }, [dispatch, userId, userInfo, user]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        user && (
          <>
            <Container>
              <Row className="mb-4">
                <Col md={2}>
                  <Image src={user.image} alt={user.name} fluid></Image>
                </Col>
                <Col md={6} className="text-white">
                  <Row>
                    <h2 className="text-white">{user.userName}</h2>
                  </Row>
                  {user.privateProfile ? (
                    ""
                  ) : (
                    <Row>
                      <h3 className="text-white">{user.name}</h3>
                    </Row>
                  )}
                  <Row>
                    <h5 className="text-secondary mt-1">About </h5>
                    <div>{user.about}</div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <h5 className="text-secondary">
                  <span>
                    {user.privateProfile
                      ? user.userName
                      : user.name.split(" ", 1)}
                  </span>
                  's Reviews
                </h5>
                <h6 className="text-white">Shows</h6>
                {loadingShowReviews ? (
                  <Loader />
                ) : errorShowReviews ? (
                  <div>{errorShowReviews}</div>
                ) : (
                  <Table
                    striped
                    hover
                    responsive
                    className="table-sm text-light"
                  >
                    <thead>
                      <tr>
                        <th>Poster</th>
                        <th>Show</th>
                        <th>Company</th>
                        <th>Rating</th>
                        <th>Seen At</th>
                        <th>Date Seen</th>
                        <th>Date Reviewed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showReviews.map((review) => (
                        <ReviewTableRow
                          key={review._id}
                          review={review}
                          type={"show"}
                        />
                      ))}
                    </tbody>
                  </Table>
                )}
                <h6 className="text-white">Venues</h6>
                {loadingVenueReviews ? (
                  <Loader />
                ) : errorVenueReviews ? (
                  <div>{errorVenueReviews}</div>
                ) : (
                  <Table
                    striped
                    hover
                    responsive
                    className="table-sm text-light"
                  >
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Venue</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {venueReviews.map((review) => (
                        <ReviewTableRow
                          key={review._id}
                          review={review}
                          type={"venue"}
                        />
                      ))}
                    </tbody>
                  </Table>
                )}
                <h6 className="text-white">Companies</h6>
                {loadingCompanyReviews ? (
                  <Loader />
                ) : errorCompanyReviews ? (
                  <div>{errorCompanyReviews}</div>
                ) : (
                  <Table
                    striped
                    hover
                    responsive
                    className="table-sm text-light"
                  >
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Company</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyReviews.map((review) => (
                        <ReviewTableRow
                          key={review._id}
                          review={review}
                          type={"company"}
                        />
                      ))}
                    </tbody>
                  </Table>
                )}
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default UserScreen;
