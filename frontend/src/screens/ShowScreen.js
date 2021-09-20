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

const ShowScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const showId = match.params.id;

  const [companyName, setCompanyName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addReview = useSelector((state) => state.addReview);
  const { loading: loadingAddReview } = addReview;

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
              showId={show._id}
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
                    <h5 className="text-secondary mt-1">Performances </h5>
                    <div>
                      {show.performances && show.performances.length > 0
                        ? `${show.performances.length} performances`
                        : "No performances Scheduled"}
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <h5 className="text-secondary">Images</h5>
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
                    className="text-light new-review-link"
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
                  {show.reviews.map((review) => {
                    return (
                      <Review
                        review={review}
                        key={review._id}
                        performances={show.performances}
                      />
                    );
                  })}
                </ul>
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default ShowScreen;
