import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col } from "react-bootstrap";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import Loader from "../components/Loader";
import Review from "../components/Review";
import { getCastMemberInfo } from "../actions/castMemberActions";
import NewReviewModal from "../components/NewReviewModal";

const CastMemberScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const castMemberId = match.params.id;

  const [performanceCount, setPerformanceCount] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const castMemberInfo = useSelector((state) => state.castMemberInfo);
  const { castMember, loading } = castMemberInfo;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addVenueReview = useSelector((state) => state.addVenueReview);
  const { loading: loadingAddReview } = addVenueReview;

  const updateShowReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleNewReviewLink = () => {
    if (userInfo) {
      updateShowReviewModal();
    } else {
      history.push(`/login?redirect=castmember/${castMemberId}`);
    }
  };

  useEffect(() => {
    if (!castMember || castMember._id !== castMemberId) {
      dispatch(getCastMemberInfo(castMemberId, false));
    }
  }, [dispatch, castMember, castMemberId]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        castMember && (
          <>
            <NewReviewModal
              showModal={showReviewModal}
              updateShowModal={updateShowReviewModal}
              id={castMember._id}
              type="castMember"
            />
            <Container>
              <Row>
                <h2 className="text-white">{castMember.name}</h2>
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image
                    src={castMember.coverImage}
                    alt={castMember.name}
                    fluid
                  ></Image>
                </Col>
                <Col md={3} className="text-white">
                  <Row>
                    <h5 className="text-secondary mt-1">About </h5>
                    <div>{castMember.description}</div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Rating </h5>
                    {castMember.reviews && castMember.reviews.length > 0 ? (
                      <>
                        <span className="mx-2">
                          <RatingWidget
                            value={castMember.rating}
                            text={""}
                            color={"orange"}
                          />
                        </span>
                        <div>from {castMember.reviews.length} reviews</div>
                      </>
                    ) : (
                      <div>No Reviews</div>
                    )}
                  </Row>
                </Col>
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
                    {castMember.reviews.length === 0 ? (
                      <div className="text-light">No Reviews</div>
                    ) : (
                      castMember.reviews.map((review) => {
                        return (
                          <Review
                            review={review}
                            key={review._id}
                            performances={castMember.performances}
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

export default CastMemberScreen;
