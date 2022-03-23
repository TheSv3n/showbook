import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import {
  getUserProfile,
  logout,
  updateUserProfile,
} from "../actions/userActions";
import { listMyShowReviews, getMyWatchlist } from "../actions/showActions";
import { listMyVenueReviews } from "../actions/venueActions";
import { listMyCompanyReviews } from "../actions/companyActions";
import ReviewTableRow from "../components/ReviewTableRow";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const showMyReviews = useSelector((state) => state.showMyReviews);
  const {
    loading: loadingShowReviews,
    error: errorShowReviews,
    reviews: showReviews,
  } = showMyReviews;

  const showMyWatchlist = useSelector((state) => state.showMyWatchlist);
  const {
    loading: loadingShowWatchlist,
    error: errorShowWatchlist,
    views,
  } = showMyWatchlist;

  const venueMyReviews = useSelector((state) => state.venueMyReviews);
  const {
    loading: loadingVenueReviews,
    error: errorVenueReviews,
    reviews: venueReviews,
  } = venueMyReviews;

  const companyMyReviews = useSelector((state) => state.companyMyReviews);
  const {
    loading: loadingCompanyReviews,
    error: errorCompanyReviews,
    reviews: companyReviews,
  } = companyMyReviews;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserProfile());
        dispatch(listMyShowReviews());
        dispatch(listMyVenueReviews());
        dispatch(listMyCompanyReviews());
        dispatch(getMyWatchlist());
      } else {
        setName(user.name);
        setEmail(user.email);
        setDateOfBirth(user.dateOfBirth);
      }
    }
  }, [dispatch, userInfo, user, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, dateOfBirth, password })
      );
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className="text-light">
      <Container>
        <Row>
          <Col md={2}>
            <h2>My Profile</h2>
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
            {success && <div>Profile Updated</div>}
            {loading && <Loader />}
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date of Birth"
                  value={dateOfBirth && dateOfBirth.substring(0, 10)}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div className="my-3">
                <Button onClick={submitHandler} variant="primary">
                  Update
                </Button>{" "}
                <Button onClick={logoutHandler} variant="danger">
                  Logout
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={10}>
            <h2>My Reviews</h2>
            <h3>Shows</h3>
            <h4>Seen</h4>
            {loadingShowReviews ? (
              <Loader />
            ) : errorShowReviews ? (
              <div>{errorShowReviews}</div>
            ) : (
              <Table striped hover responsive className="table-sm text-light">
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
            <h4>Watchlist</h4>
            {loadingShowWatchlist ? (
              <Loader />
            ) : errorShowWatchlist ? (
              <div>{errorShowWatchlist}</div>
            ) : (
              <Table striped hover responsive className="table-sm text-light">
                <thead>
                  <tr>
                    <th>Poster</th>
                    <th>Show</th>
                    <th>Company</th>
                    <th>Booked At</th>
                    <th>Date Booked</th>
                  </tr>
                </thead>
                <tbody>
                  {views.map((view) => (
                    <ReviewTableRow
                      key={view._id}
                      review={view}
                      type={"view"}
                    />
                  ))}
                </tbody>
              </Table>
            )}
            <h3>Venues</h3>
            {loadingVenueReviews ? (
              <Loader />
            ) : errorVenueReviews ? (
              <div>{errorVenueReviews}</div>
            ) : (
              <Table striped hover responsive className="table-sm text-light">
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
            <h3>Companies</h3>
            {loadingCompanyReviews ? (
              <Loader />
            ) : errorCompanyReviews ? (
              <div>{errorCompanyReviews}</div>
            ) : (
              <Table striped hover responsive className="table-sm text-light">
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProfileScreen;
