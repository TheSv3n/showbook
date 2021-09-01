import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowInfo } from "../actions/showActions";
import { Image, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const ShowScreen = ({ match }) => {
  const dispatch = useDispatch();
  const showId = match.params.id;

  const [companyName, setCompanyName] = useState("");

  const getCompanyName = async (companyId) => {
    const { data: name } = await axios.get(`/api/companies/${companyId}/name`);
    setCompanyName(name);
  };

  const showInfo = useSelector((state) => state.showInfo);
  const { show, loading } = showInfo;

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    } else {
      getCompanyName(show.company);
    }
  }, [dispatch, showId, show]);
  return (
    <section class="bg-dark p-5 ">
      <Container>
        <Row>
          <h2 class="text-white">{show && show.title}</h2>
          <h5 class="text-secondary">By {companyName}</h5>
        </Row>
        <Row>
          <Col md={9}>
            <Image
              src={show && show.coverImage}
              alt={show && show.title}
              fluid
            ></Image>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShowScreen;
