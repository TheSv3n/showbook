import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col } from "react-bootstrap";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import Loader from "../components/Loader";
import Review from "../components/Review";
import NewReviewModal from "../components/NewReviewModal";
import NewImageModal from "../components/NewImageModal";
import { getCompanyInfo } from "../actions/companyActions";

const CompanyScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const companyId = match.params.id;

  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showNewImageModal, setShowNewImageModal] = useState(false);

  const companyInfo = useSelector((state) => state.companyInfo);
  const { company, loading } = companyInfo;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addCompanyReview = useSelector((state) => state.addCompanyReview);
  const { loading: loadingAddReview } = addCompanyReview;

  const addCompanyImage = useSelector((state) => state.addCompanyImage);
  const { loading: loadingAddImage } = addCompanyImage;

  const updateShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  const updateStartIndex = (newIndex) => {
    setStartIndex(newIndex);
  };

  const updateShowReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleNewImageLink = () => {
    if (userInfo) {
      updateShowNewImageModal();
    } else {
      history.push(`/login?redirect=company/${companyId}`);
    }
  };

  const handleNewReviewLink = () => {
    if (userInfo) {
      updateShowReviewModal();
    } else {
      history.push(`/login?redirect=company/${companyId}`);
    }
  };

  const updateShowNewImageModal = () => {
    setShowNewImageModal(!showNewImageModal);
  };

  useEffect(() => {
    if (!company || company._id !== companyId) {
      dispatch(getCompanyInfo(companyId, false));
    }
  }, [dispatch, company, companyId]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        company && (
          <>
            <ImageModal
              images={company.images}
              showModal={showImageModal}
              updateShowModal={updateShowImageModal}
              updateStartIndex={updateStartIndex}
              startIndex={startIndex}
            />
            <NewReviewModal
              showModal={showReviewModal}
              updateShowModal={updateShowReviewModal}
              id={company._id}
              type="company"
            />
            <NewImageModal
              id={companyId}
              showModal={showNewImageModal}
              updateShowModal={updateShowNewImageModal}
              type={"company"}
            />
            <Container>
              <Row>
                <h2 className="text-white">{company.name}</h2>
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image
                    src={company.coverImage}
                    alt={company.name}
                    fluid
                  ></Image>
                </Col>
                <Col md={3} className="text-white">
                  <Row>
                    <h5 className="text-secondary mt-1">About </h5>
                    <div>{company.description}</div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Rating </h5>
                    {company.reviews && company.reviews.length > 0 ? (
                      <>
                        <span className="mx-2">
                          <RatingWidget
                            value={company.rating}
                            text={""}
                            color={"orange"}
                          />
                        </span>
                        <div>from {company.reviews.length} reviews</div>
                      </>
                    ) : (
                      <div>No Reviews</div>
                    )}
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Headquarters </h5>
                    <div>{company.headquarters}</div>
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
                  images={company.images}
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
                    {company.reviews.length === 0 ? (
                      <div className="text-light">No Reviews</div>
                    ) : (
                      company.reviews.map((review) => {
                        return (
                          <Review
                            review={review}
                            key={review._id}
                            performances={company.performances}
                            type="company"
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

export default CompanyScreen;
