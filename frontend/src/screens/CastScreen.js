import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getShowInfo } from "../actions/showActions";

const CastScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const showId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showInfo = useSelector((state) => state.showInfo);
  const { show, loading } = showInfo;

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    }
  }, [dispatch, showId, show]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        show && (
          <>
            <Container>
              <Row>
                <h2 className="text-white">{show.title} - Cast</h2>
              </Row>
              <Row className="mb-4"></Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default CastScreen;
