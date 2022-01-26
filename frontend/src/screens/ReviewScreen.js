import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowReviewInfo } from "../actions/showActions";
import Loader from "../components/Loader";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingWidget from "../components/RatingWidget";
import NewReviewModal from "../components/NewReviewModal";

const ReviewScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const reviewId = match.params.id;
  const [showReviewModal, setShowReviewModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showReviewInfo = useSelector((state) => state.showReviewInfo);
  const { review, loading } = showReviewInfo;

  const addShowReviewComment = useSelector(
    (state) => state.addShowReviewComment
  );
  const { loading: loadingAddComment } = addShowReviewComment;

  const updateShowReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleNewCommentLink = () => {
    if (userInfo) {
      updateShowReviewModal();
    } else {
      history.push(`/login?redirect=review/${reviewId}`);
    }
  };

  useEffect(() => {
    if (!review || review._id !== reviewId) {
      dispatch(getShowReviewInfo(reviewId, false));
    }
  }, [dispatch, reviewId, review]);

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
              id={review.reviewId}
              type={"comment"}
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
                        value={review.rating}
                        text={""}
                        color={"orange"}
                      />
                    </span>
                    <div>{review.comment}</div>
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
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default ReviewScreen;
