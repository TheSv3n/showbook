import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col } from "react-bootstrap";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import Loader from "../components/Loader";
import Review from "../components/Review";
import { getVenueInfo } from "../actions/venueActions";
import { listVenuePerformances } from "../actions/showActions";
import NewReviewModal from "../components/NewReviewModal";
import PerformanceModal from "../components/PerformanceModal";

const VenueScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const venueId = match.params.id;

  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const venueInfo = useSelector((state) => state.venueInfo);
  const { venue, loading } = venueInfo;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addVenueReview = useSelector((state) => state.addVenueReview);
  const { loading: loadingAddReview } = addVenueReview;

  const showVenuePerformances = useSelector(
    (state) => state.showVenuePerformances
  );
  const { performances } = showVenuePerformances;

  const updateShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  const updateStartIndex = (newIndex) => {
    setStartIndex(newIndex);
  };

  const updateShowReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const updateShowPerformanceModal = () => {
    setShowPerformanceModal(!showPerformanceModal);
  };

  const handleNewReviewLink = () => {
    if (userInfo) {
      updateShowReviewModal();
    } else {
      history.push(`/login?redirect=venue/${venueId}`);
    }
  };

  useEffect(() => {
    if (!venue || venue._id !== venueId) {
      dispatch(getVenueInfo(venueId, false));
      dispatch(listVenuePerformances(venueId));
    }
  }, [dispatch, venue, venueId]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        venue && (
          <>
            <ImageModal
              images={venue.images}
              showModal={showImageModal}
              updateShowModal={updateShowImageModal}
              updateStartIndex={updateStartIndex}
              startIndex={startIndex}
            />
            <NewReviewModal
              showModal={showReviewModal}
              updateShowModal={updateShowReviewModal}
              id={venue._id}
              type="venue"
            />
            <PerformanceModal
              showModal={showPerformanceModal}
              updateShowModal={updateShowPerformanceModal}
              performances={performances}
              venuePerformance={true}
            />
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
                      <>
                        {performances.length > 0
                          ? `${performances.length} performances`
                          : "No performances scheduled"}
                      </>
                      <span
                        className="link text-secondary"
                        onClick={updateShowPerformanceModal}
                      >
                        {" "}
                        - view
                      </span>
                    </div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Address </h5>
                    <div>{venue.address}</div>
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
                <Container>
                  <ul className="list-group">
                    {venue.reviews.length === 0 ? (
                      <div className="text-light">No Reviews</div>
                    ) : (
                      venue.reviews.map((review) => {
                        return (
                          <Review
                            review={review}
                            key={review._id}
                            performances={venue.performances}
                            type="venue"
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

export default VenueScreen;
