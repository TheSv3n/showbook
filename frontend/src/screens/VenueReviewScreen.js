import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVenueReviewInfo } from "../actions/venueActions";
import Loader from "../components/Loader";
import { Image, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingWidget from "../components/RatingWidget";
import NewReviewModal from "../components/NewReviewModal";
import Review from "../components/Review";
import { editVenueReview, deleteVenueReview } from "../actions/venueActions";
import {
  VENUE_DELETE_REVIEW_RESET,
  VENUE_UPDATE_REVIEW_RESET,
} from "../constants/venueConstants";
import DeleteModal from "../components/DeleteModal";

const VenueReviewScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const reviewId = match.params.id;

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditFields, setShowEditFields] = useState("");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const venueReviewInfo = useSelector((state) => state.venueReviewInfo);
  const { review, loading } = venueReviewInfo;

  const addVenueReviewComment = useSelector(
    (state) => state.addVenueReviewComment
  );
  const { loading: loadingAddComment } = addVenueReviewComment;

  const updateVenueReview = useSelector((state) => state.updateVenueReview);
  const { loading: loadingUpdateReview, success } = updateVenueReview;

  const venueReviewDelete = useSelector((state) => state.venueReviewDelete);
  const { loading: loadingDeleteReview, success: successDelete } =
    venueReviewDelete;

  const updateShowReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const updateShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleNewCommentLink = () => {
    if (userInfo) {
      updateShowReviewModal();
    } else {
      history.push(`/login?redirect=venuereview/${reviewId}`);
    }
  };

  const deleteHandler = () => {
    dispatch(deleteVenueReview(reviewId, review.venueId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editedComment !== "") {
      dispatch(
        editVenueReview(reviewId, {
          comment: editedComment,
          rating: editedRating,
        })
      );
    }
  };

  const editHandler = () => {
    setShowEditFields(!showEditFields);
    setEditedComment(review.comment);
    setEditedRating(review.rating);
  };

  useEffect(() => {
    if (!review || review._id !== reviewId) {
      dispatch(getVenueReviewInfo(reviewId, false));
    } else {
      setCommentText(review.comment);
      setRating(review.rating);
    }
    if (success) {
      setCommentText(review.comment);
      setShowEditFields(false);
      dispatch({ type: VENUE_UPDATE_REVIEW_RESET });
    }
    if (successDelete) {
      history.push(`/venue/${review.venueId}`);
      dispatch({ type: VENUE_DELETE_REVIEW_RESET });
    }
  }, [dispatch, reviewId, review, success, successDelete]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        review && (
          <>
            <NewReviewModal
              showModal={showReviewModal}
              updateShowModal={updateShowReviewModal}
              id={review._id}
              type={"venuereviewcomment"}
            />
            <DeleteModal
              showModal={showDeleteModal}
              updateShowModal={updateShowDeleteModal}
              type={"review"}
              submitDelete={deleteHandler}
            />

            <Container>
              <Row className="mb-4">
                <Col md={3}>
                  <Row>
                    <Image
                      src={review.venueCoverImage}
                      alt={review.venueName}
                      fluid
                    ></Image>
                  </Row>
                </Col>
                <Col md={9} className="text-white">
                  <Row>
                    <Link to={`/venue/${review.venueId}`}>
                      <h2 className="text-white">{review.venueName}</h2>
                    </Link>
                    <h4>
                      Review by{" "}
                      <Link to={`/user/${review.user}`} className="text-white">
                        {review.userName}
                      </Link>
                    </h4>
                  </Row>
                  <Row>
                    <h6 className="text-secondary mt-1">Rating </h6>
                    <span className="mx-2">
                      <RatingWidget
                        value={showEditFields ? editedRating : rating}
                        text={""}
                        color={"orange"}
                        newReview={showEditFields}
                        setRating={setEditedRating}
                      />
                      {userInfo && userInfo._id === review.user ? (
                        <>
                          <i
                            className="bi bi-pencil-square text-light review-icon mx-1"
                            onClick={editHandler}
                          ></i>
                          <i
                            className="bi bi-trash text-light review-icon mx-1"
                            onClick={updateShowDeleteModal}
                          ></i>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                    {showEditFields ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="comment">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter comment"
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        {loadingUpdateReview || loadingDeleteReview ? (
                          <Loader />
                        ) : (
                          <>
                            <Button
                              type="submit"
                              variant="primary"
                              className="my-2"
                            >
                              Submit
                            </Button>
                            <Button
                              variant="danger"
                              className="my-2 mx-2"
                              onClick={editHandler}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </Form>
                    ) : (
                      <div>{commentText}</div>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row className="text-white">
                <h5 className="text-secondary">
                  Comments{" "}
                  <span
                    className="text-white link"
                    onClick={handleNewCommentLink}
                  >
                    {loadingAddComment ? (
                      <Loader />
                    ) : userInfo ? (
                      "- Add comment"
                    ) : (
                      "- login to add comment"
                    )}
                  </span>
                </h5>
                <Container>
                  <ul className="list-group">
                    {review.reviewComments.length === 0 ? (
                      <div className="text-light">No Comments</div>
                    ) : (
                      review.reviewComments.map((comment) => {
                        return (
                          <Review
                            review={comment}
                            key={comment._id}
                            type="venuecomment"
                            reviewId={reviewId}
                          />
                        );
                      })
                    )}
                  </ul>
                </Container>
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default VenueReviewScreen;
