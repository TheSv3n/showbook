import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsById } from "../actions/userActions";
import { Image, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import { listUserShowReviews } from "../actions/showActions";
import ShowReviewTableRow from "../components/ShowReviewTableRow";

const UserScreen = ({ match }) => {
  const dispatch = useDispatch();
  const userId = match.params.id;

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

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetailsById(userId));
      dispatch(listUserShowReviews(userId));
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
                        <ShowReviewTableRow key={review._id} review={review} />
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
