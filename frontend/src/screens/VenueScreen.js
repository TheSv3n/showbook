import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col } from "react-bootstrap";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import Loader from "../components/Loader";
import Review from "../components/Review";
import getVenueInfo from "../actions/venueActions";

const VenueScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const venueId = match.params.id;

  const [performanceCount, setPerformanceCount] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const venueInfo = useSelector((state) => state.venueInfo);
  const { venue, loading } = venueInfo;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  const updateStartIndex = (newIndex) => {
    setStartIndex(newIndex);
  };

  const handleNewReviewLink = () => {
    //TODO
  };

  useEffect(() => {
    if (!venue || venue._id !== venueId) {
      dispatch(getVenueInfo(venueId, false));
    }
  }, [dispatch]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        venue && (
          <>
            <Container>
              <Row>
                <h2 className="text-white">{venue.name}</h2>
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image src={venue.coverImage} alt={venue.name} fluid></Image>
                </Col>
                <Col md={3} className="text-white">
                  <Row>
                    <h5 className="text-secondary mt-1">About </h5>
                    <div>{venue.description}</div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Rating </h5>
                    {venue.reviews && venue.reviews.length > 0 ? (
                      <>
                        <span className="mx-2">
                          <RatingWidget
                            value={venue.rating}
                            text={""}
                            color={"orange"}
                          />
                        </span>
                        <div>from {venue.reviews.length} reviews</div>
                      </>
                    ) : (
                      <div>No Reviews</div>
                    )}
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Performances </h5>
                    <div>
                      {performanceCount > 0
                        ? `${performanceCount} performances`
                        : "No performances Scheduled"}
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <h5 className="text-secondary">Images</h5>
                <ImageCarousel
                  images={venue.images}
                  show={4}
                  updateStartIndex={updateStartIndex}
                  updateShowModal={updateShowImageModal}
                  startIndex={0}
                />
              </Row>
              {/*
              <Row>
                <h5 className="text-secondary">
                  Reviews{" "}
                  <span
                    className="text-light link"
                    onClick={handleNewReviewLink}
                  >
                    {loadingAddReview ? (
                      <Loader />
                    ) : userInfo ? (
                      "- Add review"
                    ) : (
                      "- login to add review"
                    )}
                  </span>
                </h5>
                <ul className="list-group">
                  {venue.reviews.map((review) => {
                    return <Review review={review} key={review._id} />;
                  })}
                </ul>
                </Row>*/}
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default VenueScreen;
