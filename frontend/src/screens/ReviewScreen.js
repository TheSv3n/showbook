import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowReviewInfo } from "../actions/showActions";
import Loader from "../components/Loader";
import { Image, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingWidget from "../components/RatingWidget";
import NewReviewModal from "../components/NewReviewModal";
import Review from "../components/Review";
import { editShowReview, deleteShowReview } from "../actions/showActions";
import {
  SHOW_DELETE_REVIEW_RESET,
  SHOW_UPDATE_REVIEW_RESET,
} from "../constants/showConstants";
import DeleteModal from "../components/DeleteModal";

const ReviewScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const reviewId = match.params.id;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditFields, setShowEditFields] = useState("");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState();

  const path = match.path.split("/")[1];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showReviewInfo = useSelector((state) => state.showReviewInfo);
  const { review, loading } = showReviewInfo;

  const addShowReviewComment = useSelector(
    (state) => state.addShowReviewComment
  );
  const { loading: loadingAddComment } = addShowReviewComment;

  const updateShowReview = useSelector((state) => state.updateShowReview);
  const { loading: loadingUpdateReview, success } = updateShowReview;

  const showReviewDelete = useSelector((state) => state.showReviewDelete);
  const { loading: loadingDeleteReview, success: successDelete } =
    showReviewDelete;

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
      history.push(`/login?redirect=review/${reviewId}`);
    }
  };

  const editHandler = () => {
    setShowEditFields(!showEditFields);
    setEditedComment(review.comment);
    setEditedRating(review.rating);
  };

  const deleteHandler = () => {
    dispatch(deleteShowReview(reviewId, review.showId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editedComment !== "") {
      dispatch(
        editShowReview(reviewId, {
          comment: editedComment,
          rating: editedRating,
        })
      );
    }
  };

  useEffect(() => {
    if (!review || review._id !== reviewId) {
      dispatch(getShowReviewInfo(reviewId, false));
    } else {
      setCommentText(review.comment);
      setRating(review.rating);
    }
    if (success) {
      setCommentText(review.comment);
      setShowEditFields(false);
      dispatch({ type: SHOW_UPDATE_REVIEW_RESET });
    }
    if (successDelete) {
      history.push(`/show/${review.showId}`);
      dispatch({ type: SHOW_DELETE_REVIEW_RESET });
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
              type={"showreviewcomment"}
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
                      src={review.showCoverImage}
                      alt={review.showTitle}
                      fluid
                    ></Image>
                  </Row>
                </Col>
                <Col md={9} className="text-white">
                  <Row>
                    <Link to={`/show/${review.showId}`}>
                      <h2 className="text-white">{review.showTitle}</h2>
                    </Link>
                    <h3 className="text-secondary">
                      By{" "}
                      <Link
                        className="link text-secondary"
                        to={`/company/${review.showCompanyId}`}
                      >
                        {review.showCompanyName}
                      </Link>
                    </h3>
                    <h4>
                      Review by{" "}
                      <Link to={`/user/${review.user}`} className="text-white">
                        {review.userName}
                      </Link>
                    </h4>
                    <h5>
                      Seen at{" "}
                      <Link
                        to={`/venue/${review.performanceVenueId}`}
                        className="text-white"
                      >
                        {review.performanceVenueName}
                      </Link>{" "}
                      on {review.performanceDate.substring(0, 10)}
                    </h5>
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
                      <div className="text-light">No Reviews</div>
                    ) : (
                      review.reviewComments.map((comment) => {
                        return (
                          <Review
                            review={comment}
                            key={comment._id}
                            type="showcomment"
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

export default ReviewScreen;
