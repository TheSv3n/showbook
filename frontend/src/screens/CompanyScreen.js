import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import Loader from "../components/Loader";
import Review from "../components/Review";
import NewReviewModal from "../components/NewReviewModal";
import NewImageModal from "../components/NewImageModal";
import ShowModal from "../components/ShowModal";
import { getCompanyInfo, editCompany } from "../actions/companyActions";
import { listCompanyShows } from "../actions/showActions";
import { COMPANY_UPDATE_RESET } from "../constants/companyConstants";

const CompanyScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const companyId = params.id;

  const [showImageModal, setShowImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showNewImageModal, setShowNewImageModal] = useState(false);
  const [showShowsModal, setShowShowsModal] = useState(false);
  const [nameText, setNameText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [headquartersText, setHeadquartersText] = useState("");
  const [showEditNameField, setShowEditNameField] = useState(false);
  const [showEditDescriptionField, setShowEditDescriptionField] =
    useState(false);
  const [showEditHeadquartersField, setShowEditHeadquartersField] =
    useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedHeadquarters, setEditedHeadquarters] = useState("");

  const companyInfo = useSelector((state) => state.companyInfo);
  const { company, loading } = companyInfo;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addCompanyReview = useSelector((state) => state.addCompanyReview);
  const { loading: loadingAddReview } = addCompanyReview;

  const addCompanyImage = useSelector((state) => state.addCompanyImage);
  const { loading: loadingAddImage } = addCompanyImage;

  const companyShowList = useSelector((state) => state.companyShowList);
  const { shows } = companyShowList;

  const updateCompany = useSelector((state) => state.updateCompany);
  const { loading: loadingUpdate, success } = updateCompany;

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
      navigate(`/login?redirect=company/${companyId}`);
    }
  };

  const updateShowShowsModal = () => {
    setShowShowsModal(!showShowsModal);
  };

  const handleNewReviewLink = () => {
    if (userInfo) {
      updateShowReviewModal();
    } else {
      navigate(`/login?redirect=company/${companyId}`);
    }
  };

  const updateShowNewImageModal = () => {
    setShowNewImageModal(!showNewImageModal);
  };

  const editHandler = (type) => {
    switch (type) {
      case "name":
        setShowEditNameField(!showEditNameField);
        setEditedName(company.name);
        break;
      case "description":
        setShowEditDescriptionField(!showEditDescriptionField);
        setEditedDescription(company.description);
        break;
      case "headquarters":
        setShowEditHeadquartersField(!showEditHeadquartersField);
        setEditedHeadquarters(company.headquarters);
        break;
      case "cancel":
        setShowEditNameField(false);
        setShowEditDescriptionField(false);
        setShowEditHeadquartersField(false);
        break;
      default:
    }
  };

  const submitHandler = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "name":
        dispatch(
          editCompany(companyId, {
            name: editedName,
          })
        );
        break;
      case "description":
        dispatch(
          editCompany(companyId, {
            description: editedDescription,
          })
        );
        break;
      case "headquarters":
        dispatch(
          editCompany(companyId, {
            headquarters: editedHeadquarters,
          })
        );
        break;
      default:
    }
  };

  useEffect(() => {
    if (!company || company._id !== companyId) {
      dispatch(getCompanyInfo(companyId, false));
      dispatch(listCompanyShows(companyId));
    } else {
      setNameText(company.name);
      setDescriptionText(company.description);
      setHeadquartersText(company.headquarters);
    }
    if (success) {
      setNameText(company.name);
      setDescriptionText(company.description);
      setHeadquartersText(company.headquarters);
      setShowEditNameField(false);
      setShowEditDescriptionField(false);
      setShowEditHeadquartersField(false);
      dispatch({ type: COMPANY_UPDATE_RESET });
    }
  }, [dispatch, company, companyId, success]);

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
            <ShowModal
              showModal={showShowsModal}
              updateShowModal={updateShowShowsModal}
              shows={shows}
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
                  <Image
                    src={company.coverImage}
                    alt={company.name}
                    fluid
                  ></Image>
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
                      Headquarters{" "}
                      {userInfo && !showEditHeadquartersField ? (
                        <>
                          <i
                            className="bi bi-pencil-square text-light review-icon mx-1"
                            onClick={() => editHandler("headquarters")}
                          ></i>
                        </>
                      ) : (
                        ""
                      )}{" "}
                    </h5>
                    {showEditHeadquartersField ? (
                      <Form onSubmit={(e) => submitHandler(e, "headquarters")}>
                        <Form.Group controlId="headquarters">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter address for headquarters"
                            value={editedHeadquarters}
                            onChange={(e) =>
                              setEditedHeadquarters(e.target.value)
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
                      <div>{headquartersText}</div>
                    )}
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Shows </h5>
                    <div>
                      <>
                        {shows.length > 0 ? (
                          <>
                            <span>{`${shows.length} shows`}</span>
                            <span
                              className="link text-secondary"
                              onClick={updateShowShowsModal}
                            >
                              {" "}
                              - view
                            </span>
                          </>
                        ) : (
                          "No shows yet"
                        )}
                      </>
                    </div>
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
                            type="companyreview"
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
