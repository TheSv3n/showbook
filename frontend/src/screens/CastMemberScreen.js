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

  useEffect(() => {
    if (!castMember || castMember._id !== castMemberId) {
      dispatch(getCastMemberInfo(castMemberId, false));
    }
  }, [dispatch, castMember, castMemberId]);

  return <div>CastMember Screen</div>;
};

export default CastMemberScreen;
