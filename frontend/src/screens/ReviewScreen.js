import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowReviewInfo } from "../actions/showActions";
import Loader from "../components/Loader";
import { Image, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingWidget from "../components/RatingWidget";

const ReviewScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const reviewId = match.params.id;

  const showReviewInfo = useSelector((state) => state.showReviewInfo);
  const { review, loading } = showReviewInfo;

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
            <Container>
              <Row>
                <h2 className="text-white">{review.showTitle}</h2>
                <h5 className="text-secondary">
                  By{" "}
                  <Link
                    className="link text-secondary"
                    to={`/company/${review.showCompany}`}
                  >
                    {review.showCompany}
                  </Link>
                </h5>
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image
                    src={review.showCoverImage}
                    alt={review.showTitle}
                    fluid
                  ></Image>
                </Col>
                <Col md={3} className="text-white">
                  <Row>
                    <h5 className="text-secondary mt-1">Rating </h5>

                    <RatingWidget
                      value={review.rating}
                      text={""}
                      color={"orange"}
                    />
                  </Row>
                </Col>
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default ReviewScreen;
