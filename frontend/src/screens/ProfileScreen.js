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
import { listUserReviews } from "../actions/showActions";
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

  const showUserReviews = useSelector((state) => state.showUserReviews);
  const {
    loading: loadingReviews,
    error: errorReviews,
    reviews,
  } = showUserReviews;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserProfile());
        dispatch(listUserReviews());
      } else {
        setName(user.name);
        setEmail(user.email);
        setDateOfBirth(user.dateOfBirth);
      }
    }
  }, [dispatch, userInfo, user, history]);

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
          <Col md={3}>
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
          <Col md={9}>
            <h2>My Reviews</h2>
            {loadingReviews ? (
              <Loader />
            ) : errorReviews ? (
              <div>{errorReviews}</div>
            ) : (
              <Table
                striped
                bordered
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
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <ReviewTableRow key={review._id} review={review} />
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
