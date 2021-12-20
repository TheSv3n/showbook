import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowInfo } from "../actions/showActions";
import { Image, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Loader";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import NewReviewModal from "../components/NewReviewModal";
import Review from "../components/Review";
import PerformanceModal from "../components/PerformanceModal";
import NewPerformanceModal from "../components/NewPerformanceModal";
import NewImageModal from "../components/NewImageModal";
import { VENUE_LIST_RESET } from "../constants/venueConstants";

const ShowScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const showId = match.params.id;

  const [companyName, setCompanyName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [performanceModalReview, setPerformanceModalReview] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showNewPerformanceModal, setShowNewPerformanceModal] = useState(false);
  const [showNewImageModal, setShowNewImageModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addShowReview = useSelector((state) => state.addShowReview);
  const { loading: loadingAddReview } = addShowReview;

  const addShowImage = useSelector((state) => state.addShowImage);
  const { loading: loadingAddImage } = addShowImage;

  const getCompanyName = async (companyId) => {
    const { data: name } = await axios.get(`/api/companies/${companyId}/name`);
    setCompanyName(name);
  };

  const getDirectorName = async (directorId) => {
    const { data: name } = await axios.get(
      `/api/castmembers/${directorId}/name`
    );
    setDirectorName(name);
  };

  const showInfo = useSelector((state) => state.showInfo);
  const { show, loading } = showInfo;

  const updateShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  const updateShowNewImageModal = () => {
    setShowNewImageModal(!showNewImageModal);
  };

  const updateShowReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const updateStartIndex = (newIndex) => {
    setStartIndex(newIndex);
  };

  const handleNewReviewLink = () => {
    if (userInfo) {
      updateShowReviewModal();
    } else {
      history.push(`/login?redirect=show/${showId}`);
    }
  };

  const handleNewImageLink = () => {
    if (userInfo) {
      updateShowNewImageModal();
    } else {
      history.push(`/login?redirect=show/${showId}`);
    }
  };

  const updateShowPerformanceModal = () => {
    setShowPerformanceModal(!showPerformanceModal);
  };

  const updateShowNewPerformanceModal = () => {
    dispatch({ type: VENUE_LIST_RESET });
    setShowNewPerformanceModal(!showNewPerformanceModal);
  };

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    } else {
      getCompanyName(show.company);
      getDirectorName(show.director);
    }
  }, [dispatch, showId, show]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        show && (
          <>
            <ImageModal
              images={show.images}
              showModal={showImageModal}
              updateShowModal={updateShowImageModal}
              updateStartIndex={updateStartIndex}
              startIndex={startIndex}
            />
            <NewReviewModal
              showModal={showReviewModal}
              updateShowModal={updateShowReviewModal}
              performances={show.performances}
              id={show._id}
              type={"show"}
            />
            <PerformanceModal
              showModal={showPerformanceModal}
              updateShowModal={updateShowPerformanceModal}
              performances={show.performances}
              venuePerformance={false}
              fromReview={performanceModalReview}
            />
            <NewPerformanceModal
              showId={showId}
              showModal={showNewPerformanceModal}
              updateShowModal={updateShowNewPerformanceModal}
            />
            <NewImageModal
              id={showId}
              showModal={showNewImageModal}
              updateShowModal={updateShowNewImageModal}
              performances={show.performances}
              type={"show"}
            />
            <Container>
              <Row>
                <h2 className="text-white">{show.title}</h2>
                <h5 className="text-secondary">By {companyName}</h5>
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image src={show.coverImage} alt={show.title} fluid></Image>
                </Col>
                <Col md={3} className="text-white">
                  <Row>
                    <h5 className="text-secondary">Directed by </h5>
                    <div>{directorName}</div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">About </h5>
                    <div>{show.synopsis}</div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Rating </h5>
                    {show.reviews && show.reviews.length > 0 ? (
                      <>
                        <span className="mx-2">
                          <RatingWidget
                            value={show.rating}
                            text={""}
                            color={"orange"}
                          />
                        </span>
                        <div>from {show.reviews.length} reviews</div>
                      </>
                    ) : (
                      <div>No Reviews</div>
                    )}
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">
                      Performances{" "}
                      <span className="link text-secondary ">
                        {userInfo ? (
                          <i
                            className="bi bi-plus-circle-fill"
                            onClick={updateShowNewPerformanceModal}
                          ></i>
                        ) : (
                          ""
                        )}
                      </span>
                    </h5>
                    <div>
                      <>
                        {show.performances.length > 0 ? (
                          <>
                            <span>
                              {`${show.performances.length} performances`}
                            </span>
                            <span
                              className="link text-secondary"
                              onClick={updateShowPerformanceModal}
                            >
                              {" "}
                              - view
                            </span>
                          </>
                        ) : (
                          "No performances scheduled"
                        )}
                      </>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <h5 className="text-secondary">
                  Images{" "}
                  <span
                    className="text-light link"
                    onClick={handleNewImageLink}
                  >
                    {loadingAddImage ? (
                      <Loader />
                    ) : userInfo ? (
                      "- Add image"
                    ) : (
                      "- login to add image"
                    )}
                  </span>
                </h5>
                <ImageCarousel
                  images={show.images}
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
                    {show.reviews.length === 0 ? (
                      <div className="text-light">No Reviews</div>
                    ) : (
                      show.reviews.map((review) => {
                        return (
                          <Review
                            review={review}
                            key={review._id}
                            performances={show.performances}
                            type="show"
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

export default ShowScreen;
