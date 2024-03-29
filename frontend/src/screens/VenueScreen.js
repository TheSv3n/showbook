import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import Loader from "../components/Loader";
import Review from "../components/Review";
import { getVenueInfo, editVenue } from "../actions/venueActions";
import { listVenuePerformances } from "../actions/showActions";
import NewReviewModal from "../components/NewReviewModal";
import PerformanceModal from "../components/PerformanceModal";
import NewImageModal from "../components/NewImageModal";
import { VENUE_UPDATE_RESET } from "../constants/venueConstants";

const VenueScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const venueId = params.id;

  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showNewImageModal, setShowNewImageModal] = useState(false);
  const [nameText, setNameText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [addressText, setAddressText] = useState("");
  const [showEditNameField, setShowEditNameField] = useState(false);
  const [showEditDescriptionField, setShowEditDescriptionField] =
    useState(false);
  const [showEditAddressField, setShowEditAddressField] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedAddress, setEditedAddress] = useState("");

  const venueInfo = useSelector((state) => state.venueInfo);
  const { venue, loading } = venueInfo;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addVenueReview = useSelector((state) => state.addVenueReview);
  const { loading: loadingAddReview } = addVenueReview;

  const addVenueImage = useSelector((state) => state.addVenueImage);
  const { loading: loadingAddImage } = addVenueImage;

  const showVenuePerformances = useSelector(
    (state) => state.showVenuePerformances
  );
  const { performances } = showVenuePerformances;

  const updateVenue = useSelector((state) => state.updateVenue);
  const { loading: loadingUpdate, success } = updateVenue;

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
      navigate(`/login?redirect=venue/${venueId}`);
    }
  };

  const updateShowNewImageModal = () => {
    setShowNewImageModal(!showNewImageModal);
  };

  const handleNewImageLink = () => {
    if (userInfo) {
      updateShowNewImageModal();
    } else {
      navigate(`/login?redirect=venue/${venueId}`);
    }
  };

  const editHandler = (type) => {
    switch (type) {
      case "name":
        setShowEditNameField(!showEditNameField);
        setEditedName(venue.name);
        break;
      case "description":
        setShowEditDescriptionField(!showEditDescriptionField);
        setEditedDescription(venue.description);
        break;
      case "address":
        setShowEditAddressField(!showEditAddressField);
        setEditedAddress(venue.address);
        break;
      case "cancel":
        setShowEditNameField(false);
        setShowEditDescriptionField(false);
        setShowEditAddressField(false);
        break;
      default:
    }
  };

  const submitHandler = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "name":
        dispatch(
          editVenue(venueId, {
            name: editedName,
          })
        );
        break;
      case "description":
        dispatch(
          editVenue(venueId, {
            description: editedDescription,
          })
        );
        break;
      case "address":
        dispatch(
          editVenue(venueId, {
            address: editedAddress,
          })
        );
        break;
      default:
    }
  };

  useEffect(() => {
    if (!venue || venue._id !== venueId) {
      dispatch(getVenueInfo(venueId, false));
      dispatch(listVenuePerformances(venueId));
    } else {
      setNameText(venue.name);
      setDescriptionText(venue.description);
      setAddressText(venue.address);
    }
    if (success) {
      setNameText(venue.name);
      setDescriptionText(venue.description);
      setAddressText(venue.address);
      setShowEditNameField(false);
      setShowEditDescriptionField(false);
      setShowEditAddressField(false);
      dispatch({ type: VENUE_UPDATE_RESET });
    }
  }, [dispatch, venue, venueId, success]);

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
            <NewImageModal
              id={venueId}
              showModal={showNewImageModal}
              updateShowModal={updateShowNewImageModal}
              type={"venue"}
            />
            <Container>
              <Row>
                <h2 className="text-white">
                  {showEditNameField ? (
                    <>
                      <Form onSubmit={(e) => submitHandler(e, "name")}>
                        <Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="name">
                              <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
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
                    <span>{nameText}</span>
                  )}{" "}
                  {userInfo && !showEditNameField ? (
                    <>
                      <i
                        className="bi bi-pencil-square text-light review-icon mx-1"
                        onClick={() => editHandler("name")}
                      ></i>
                    </>
                  ) : (
                    ""
                  )}{" "}
                </h2>
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image src={venue.coverImage} alt={venue.name} fluid></Image>
                </Col>
                <Col md={3} className="text-white">
                  <Row>
                    <h5 className="text-secondary mt-1">
                      About{" "}
                      {userInfo && !showEditDescriptionField ? (
                        <>
                          <i
                            className="bi bi-pencil-square text-light review-icon mx-1"
                            onClick={() => editHandler("description")}
                          ></i>
                        </>
                      ) : (
                        ""
                      )}{" "}
                    </h5>
                    {showEditDescriptionField ? (
                      <Form onSubmit={(e) => submitHandler(e, "description")}>
                        <Form.Group controlId="description">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter description"
                            value={editedDescription}
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
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
                      <div>{descriptionText}</div>
                    )}
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">
                      Address
                      {userInfo && !showEditAddressField ? (
                        <>
                          <i
                            className="bi bi-pencil-square text-light review-icon mx-1"
                            onClick={() => editHandler("address")}
                          ></i>
                        </>
                      ) : (
                        ""
                      )}{" "}
                    </h5>
                    {showEditAddressField ? (
                      <Form onSubmit={(e) => submitHandler(e, "address")}>
                        <Form.Group controlId="address">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter address"
                            value={editedAddress}
                            onChange={(e) => setEditedAddress(e.target.value)}
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
                      <div>{addressText}</div>
                    )}
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
                        {performances.length > 0 ? (
                          <>
                            <span>{`${performances.length} performances`}</span>
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
                            type="venuereview"
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
