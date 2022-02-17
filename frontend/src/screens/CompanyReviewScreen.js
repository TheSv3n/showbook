import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Image, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingWidget from "../components/RatingWidget";
import NewReviewModal from "../components/NewReviewModal";
import Review from "../components/Review";
import {
  getCompanyReviewInfo,
  editCompanyReview,
  deleteCompanyReview,
} from "../actions/companyActions";
import {
  VENUE_DELETE_REVIEW_RESET,
  VENUE_UPDATE_REVIEW_RESET,
} from "../constants/venueConstants";
import DeleteModal from "../components/DeleteModal";

const CompanyReviewScreen = () => {
  return <div>CompanyReviewScreen</div>;
};

export default CompanyReviewScreen;
