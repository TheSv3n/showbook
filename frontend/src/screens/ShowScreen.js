import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowInfo, editShow } from "../actions/showActions";
import { Image, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import NewViewerModal from "../components/NewViewerModal";
import { VENUE_LIST_RESET } from "../constants/venueConstants";
import {
  SHOW_UPDATE_RESET,
  SHOW_DELETE_VIEWER_RESET,
} from "../constants/showConstants";
import CastMemberCard from "../components/CastMemberCard";
import RemoveViewerModal from "../components/RemoveViewerModal";

const ShowScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const showId = params.id;

  const [companyName, setCompanyName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [performanceModalReview, setPerformanceModalReview] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showNewPerformanceModal, setShowNewPerformanceModal] = useState(false);
  const [showNewImageModal, setShowNewImageModal] = useState(false);
  const [showNewViewerModal, setShowNewViewerModal] = useState(false);
  const [showRemoveViewerModal, setShowRemoveViewerModal] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [showEditTitleField, setShowEditTitleField] = useState(false);
  const [showEditSynopsisField, setShowEditSynopsisField] = useState(false);
  const [synopsisText, setSynopsisText] = useState("");
  const [editedSynopsis, setEditedSynopsis] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [viewersCount, setViewersCount] = useState(0);
  const [bookedCount, setBookedCount] = useState(0);
  const [userViewed, setUserViewed] = useState(false);
  const [userViewId, setUserViewId] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addShowReview = useSelector((state) => state.addShowReview);
  const { loading: loadingAddReview } = addShowReview;

  const addShowImage = useSelector((state) => state.addShowImage);
  const { loading: loadingAddImage } = addShowImage;

  const updateShow = useSelector((state) => state.updateShow);
  const { loading: loadingUpdate, success } = updateShow;

  const addShowViewer = useSelector((state) => state.addShowViewer);
  const { loading: loadingAddViewer } = addShowViewer;

  const showViewerDelete = useSelector((state) => state.showViewerDelete);
  const { loading: loadingDeleteViewer, success: successDeleteViewer } =
    showViewerDelete;

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

  const updateShowNewViewerModal = () => {
    setShowNewViewerModal(!showNewViewerModal);
  };

  const updateShowRemoveViewerModal = () => {
    setShowRemoveViewerModal(!showRemoveViewerModal);
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
      navigate(`/login?redirect=show/${showId}`);
    }
  };

  const handleNewImageLink = () => {
    if (userInfo) {
      updateShowNewImageModal();
    } else {
      navigate(`/login?redirect=show/${showId}`);
    }
  };

  const updateShowPerformanceModal = () => {
    setShowPerformanceModal(!showPerformanceModal);
  };

  const updateShowNewPerformanceModal = () => {
    dispatch({ type: VENUE_LIST_RESET });
    setShowNewPerformanceModal(!showNewPerformanceModal);
  };

  const editHandler = (type) => {
    switch (type) {
      case "title":
        setShowEditTitleField(!showEditTitleField);
        setEditedTitle(show.title);
        break;
      case "synopsis":
        setShowEditSynopsisField(!showEditSynopsisField);
        setEditedSynopsis(show.synopsis);
        break;
      case "cancel":
        setShowEditTitleField(false);
        setShowEditSynopsisField(false);
        break;
      default:
    }
  };

  const submitHandler = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "title":
        dispatch(
          editShow(showId, {
            title: editedTitle,
          })
        );
        break;
      case "synopsis":
        dispatch(
          editShow(showId, {
            synopsis: editedSynopsis,
          })
        );
        break;
      default:
    }
  };

  const sortViewers = () => {
    let tempBookedCount = 0;
    let tempViewersCount = 0;
    for (let i = 0; i < show.viewers.length; i++) {
      if (show.viewers[i].seen) {
        tempBookedCount++;
      } else {
        tempViewersCount++;
      }
      if (userInfo && show.viewers[i].user === userInfo._id) {
        setUserViewed(true);
        setUserViewId(show.viewers[i]._id);
      }
    }
    setBookedCount(tempBookedCount);
    setViewersCount(tempViewersCount);
  };

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    } else {
      setSynopsisText(show.synopsis);
      setTitleText(show.title);
      if (show.company) {
        getCompanyName(show.company);
      }

      if (show.director) {
        getDirectorName(show.director);
      }
      if (show.viewers.length > 0 || successDeleteViewer) {
        sortViewers();
      }
    }
    if (success) {
      setTitleText(show.title);
      setSynopsisText(show.synopsis);
      setShowEditTitleField(false);
      setShowEditSynopsisField(false);
      dispatch({ type: SHOW_UPDATE_RESET });
    }
    if (successDeleteViewer) {
      updateShowRemoveViewerModal();
      dispatch({ type: SHOW_DELETE_VIEWER_RESET });
      setUserViewed(false);
    }
  }, [dispatch, showId, show, success]);

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
            <NewViewerModal
              showId={showId}
              showModal={showNewViewerModal}
              performances={show.performances}
              updateShowModal={updateShowNewViewerModal}
            />
            <RemoveViewerModal
              showModal={showRemoveViewerModal}
              updateShowModal={updateShowRemoveViewerModal}
              viewerId={userViewId}
              showId={showId}
            />

            <Container>
              <Row>
                <h2 className="text-white">
                  {showEditTitleField ? (
                    <>
                      <Form onSubmit={(e) => submitHandler(e, "title")}>
                        <Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="name">
                              <Form.Control
                                type="name"
                                placeholder="Enter title"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
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
                              onClick={() => editHandler("cancel")}
                            >
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </>
                  ) : (
                    <span>{titleText}</span>
                  )}{" "}
                  {userInfo && !showEditTitleField ? (
                    <>
                      <i
                        className="bi bi-pencil-square text-light review-icon mx-1"
                        onClick={() => editHandler("title")}
                      ></i>
                    </>
                  ) : (
                    ""
                  )}
                </h2>
                {show.company && (
                  <h5 className="text-secondary">
                    By{" "}
                    <Link
                      className="link text-secondary"
                      to={`/company/${show.company}`}
                    >
                      {companyName}
                    </Link>
                  </h5>
                )}
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image src={show.coverImage} alt={show.title} fluid></Image>
                </Col>
                <Col md={3} className="text-white">
                  {show.director && (
                    <Row>
                      <h5 className="text-secondary">Directed by </h5>
                      <Link
                        className="text-white"
                        to={`/castmember/${show.director}`}
                      >
                        <div>{directorName}</div>
                      </Link>
                    </Row>
                  )}

                  <Row>
                    <h5 className="text-secondary mt-1">
                      About{" "}
                      {userInfo && !showEditSynopsisField ? (
                        <>
                          <i
                            className="bi bi-pencil-square text-light review-icon mx-1"
                            onClick={() => editHandler("synopsis")}
                          ></i>
                        </>
                      ) : (
                        ""
                      )}
                    </h5>
                    {showEditSynopsisField ? (
                      <Form onSubmit={(e) => submitHandler(e, "synopsis")}>
                        <Form.Group controlId="synopsis">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter synopsis"
                            value={editedSynopsis}
                            onChange={(e) => setEditedSynopsis(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        {loadingUpdate ? (
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
                              onClick={() => editHandler("cancel")}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </Form>
                    ) : (
                      <div>{synopsisText}</div>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row className="text-white mb-2">
                <Col sm={4}>
                  <h5 className="text-secondary mt-1">Rating </h5>
                  {show.reviews && show.reviews.length > 0 ? (
                    <div className="align-items-center">
                      <span className="mr-2">
                        <RatingWidget
                          value={show.rating}
                          text={""}
                          color={"orange"}
                        />
                      </span>
                      from {show.reviews.length} reviews
                    </div>
                  ) : (
                    <div>No Reviews</div>
                  )}
                </Col>
                <Col sm={4}>
                  <h5 className="text-secondary mt-1">Viewers </h5>
                  {loadingAddViewer ? (
                    <Loader />
                  ) : show.viewers && show.viewers.length > 0 ? (
                    <>
                      <div>
                        {viewersCount} people are interested in this show
                      </div>
                      <div>{bookedCount} people have booked to see show</div>
                    </>
                  ) : (
                    <div>No Viewers</div>
                  )}
                  {userInfo && !userViewed ? (
                    <Button
                      className="btn-warning mt-1"
                      onClick={updateShowNewViewerModal}
                    >
                      {" "}
                      Add to Watchlist
                    </Button>
                  ) : userInfo && userViewed ? (
                    <Button
                      className="btn-danger mt-1"
                      onClick={updateShowRemoveViewerModal}
                    >
                      {" "}
                      Remove from Watchlist
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
                <Col sm={4}>
                  <h5 className="text-secondary mt-1">Performances</h5>
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
                      <div>
                        {userInfo && (
                          <Button
                            className="btn-warning mt-1"
                            onClick={updateShowNewPerformanceModal}
                          >
                            {" "}
                            Add performance
                          </Button>
                        )}
                      </div>
                    </>
                  </div>
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
                  Cast{" "}
                  <Link to={`/show/${showId}/cast`}>
                    <span className="text-light link">- View All</span>
                  </Link>
                </h5>
                {show.roles.slice(0, 4).map((role) => {
                  return <CastMemberCard role={role} key={role._id} />;
                })}
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
                            type="showreview"
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
