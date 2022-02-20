import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/review.css";
import RatingWidget from "../components/RatingWidget";
import Loader from "../components/Loader";
import {
  editShowReviewComment,
  deleteShowReviewCommment,
} from "../actions/showActions";
import {
  SHOW_UPDATE_REVIEW_COMMENT_RESET,
  SHOW_DELETE_REVIEW_COMMENT_RESET,
} from "../constants/showConstants";
import DeleteModal from "../components/DeleteModal";
import {
  VENUE_DELETE_REVIEW_COMMENT_RESET,
  VENUE_UPDATE_REVIEW_COMMENT_RESET,
} from "../constants/venueConstants";
import {
  deleteVenueReviewCommment,
  editVenueReviewComment,
} from "../actions/venueActions";
import {
  COMPANY_DELETE_REVIEW_COMMENT_RESET,
  COMPANY_UPDATE_REVIEW_COMMENT_RESET,
} from "../constants/companyConstants";
import {
  deleteCompanyReviewCommment,
  editCompanyReviewComment,
} from "../actions/companyActions";

const Review = ({ review, performances, type, reviewId }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [performanceDate, setPerformanceDate] = useState("");
  const [performanceVenue, setPerformanceVenue] = useState("");
  const [showEditFields, setShowEditFields] = useState("");
  const [commentText, setCommentText] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateShowReviewComment = useSelector(
    (state) => state.updateShowReviewComment
  );
  const { loading: loadingUpdateShow, success: successUpdateShow } =
    updateShowReviewComment;

  const showReviewDeleteComment = useSelector(
    (state) => state.showReviewDeleteComment
  );
  const { loading: loadingDeleteShowComment, success: successDeleteShow } =
    showReviewDeleteComment;

  const updateVenueReviewComment = useSelector(
    (state) => state.updateVenueReviewComment
  );
  const { loading: loadingUpdateVenue, success: successUpdateVenue } =
    updateVenueReviewComment;

  const venueReviewDeleteComment = useSelector(
    (state) => state.venueReviewDeleteComment
  );
  const { loading: loadingDeleteVenueComment, success: successDeleteVenue } =
    venueReviewDeleteComment;

  const updateCompanyReviewComment = useSelector(
    (state) => state.updateCompanyReviewComment
  );
  const { loading: loadingUpdateCompany, success: successUpdateCompany } =
    updateCompanyReviewComment;

  const companyReviewDeleteComment = useSelector(
    (state) => state.companyReviewDeleteComment
  );
  const {
    loading: loadingDeleteCompanyComment,
    success: successDeleteCompany,
  } = companyReviewDeleteComment;

  const getUserName = async (userId) => {
    const { data: userName } = await axios.get(`/api/users/${userId}/username`);
    setUserName(userName);
  };

  const getPerformanceInfo = async () => {
    let venueId;
    let performanceDate;

    for (let i = 0; i < performances.length; i++) {
      if (performances[i]._id === review.performanceId) {
        venueId = performances[i].venueId;
        performanceDate = performances[i].date.toString();
      }
    }

    const { data: name } = await axios.get(`/api/venues/${venueId}/name`);
    setPerformanceVenue(name);
    setPerformanceDate(performanceDate.substr(0, 10));
  };

  const editHandler = () => {
    setShowEditFields(!showEditFields);
    setEditedComment(review.comment);
  };

  const updateShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const deleteHandler = () => {
    switch (type) {
      case "showcomment":
        dispatch(deleteShowReviewCommment(reviewId, review._id));
        break;
      case "venuecomment":
        dispatch(deleteVenueReviewCommment(reviewId, review._id));
        break;
      case "companycomment":
        dispatch(deleteCompanyReviewCommment(reviewId, review._id));
        break;
      default:
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editedComment !== "") {
      switch (type) {
        case "showcomment":
          dispatch(
            editShowReviewComment(reviewId, {
              comment: editedComment,
              commentId: review._id,
            })
          );
          break;
        case "venuecomment":
          dispatch(
            editVenueReviewComment(reviewId, {
              comment: editedComment,
              commentId: review._id,
            })
          );
          break;
        case "companycomment":
          dispatch(
            editCompanyReviewComment(reviewId, {
              comment: editedComment,
              commentId: review._id,
            })
          );
          break;
        default:
      }
    }
  };

  useEffect(() => {
    getUserName(review.user);
    if (type === "showreview") {
      getPerformanceInfo();
    }
    if (!successUpdateShow && !successUpdateVenue) {
      setCommentText(review.comment);
    }
    if (successUpdateShow || successUpdateVenue || successUpdateCompany) {
      setShowEditFields(false);
      dispatch({ type: SHOW_UPDATE_REVIEW_COMMENT_RESET });
      dispatch({ type: VENUE_UPDATE_REVIEW_COMMENT_RESET });
      dispatch({ type: COMPANY_UPDATE_REVIEW_COMMENT_RESET });
    }
    if (successDeleteShow || successDeleteVenue || successDeleteCompany) {
      setShowDeleteModal(false);
      dispatch({ type: SHOW_DELETE_REVIEW_COMMENT_RESET });
      dispatch({ type: VENUE_DELETE_REVIEW_COMMENT_RESET });
      dispatch({ type: COMPANY_DELETE_REVIEW_COMMENT_RESET });
    }
  }, [
    review,
    successUpdateShow,
    successDeleteShow,
    successUpdateVenue,
    successDeleteVenue,
    successUpdateCompany,
    successDeleteCompany,
  ]);

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        updateShowModal={updateShowDeleteModal}
        type={"comment"}
        submitDelete={deleteHandler}
      />
      <li className="list-group-item review-card bg-secondary my-2">
        <div className="d-flex">
          <Col md={6}>
            <Link to={`/user/${review.user}`}>
              <div className="user">{userName}</div>
            </Link>
          </Col>
          {review.rating && (
            <Col md={6}>
              <div className="align-right">
                <RatingWidget
                  value={review.rating}
                  text={""}
                  color={"orange"}
                />
              </div>
            </Col>
          )}
        </div>
        {type === "showreview" ? (
          <div className="performance">
            Seen at: {performanceVenue} on {performanceDate}
          </div>
        ) : (
          <></>
        )}

        {showEditFields ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="comment">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter comment"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {loadingUpdateShow || loadingUpdateVenue || loadingUpdateCompany ? (
              <Loader />
            ) : (
              <>
                <Button type="submit" variant="primary" className="my-2">
                  Submit
                </Button>
                <Button
                  variant="danger"
                  className="my-2 mx-2"
                  onClick={editHandler}
                >
                  Cancel
                </Button>
              </>
            )}
          </Form>
        ) : (
          <>
            <div className="text-light">{commentText} </div>
            <div className="d-flex justify-content-between">
              <span className="align-right">
                {userInfo &&
                userInfo._id === review.user &&
                (type === "showcomment" ||
                  type === "venuecomment" ||
                  type === "companycomment") ? (
                  <>
                    <i
                      className="bi bi-pencil-square text-light review-icon mx-1"
                      onClick={editHandler}
                    ></i>
                    <i
                      className="bi bi-trash text-light review-icon mx-1"
                      onClick={updateShowDeleteModal}
                    ></i>
                  </>
                ) : (
                  ""
                )}
              </span>
              {type === "showcomment" ||
              type === "venuecomment" ||
              type === "companycomment" ? (
                ""
              ) : (
                <Link to={`/${type}/${review._id}`} className="text-white">
                  <span className="align-left">Show full review</span>
                </Link>
              )}
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default Review;
