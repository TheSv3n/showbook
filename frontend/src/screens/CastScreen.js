import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getShowInfo } from "../actions/showActions";
import CastListItem from "../components/CastListItem";
import NewRoleModal from "../components/NewRoleModal";
import axios from "axios";

const CastScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const showId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showInfo = useSelector((state) => state.showInfo);
  const { show, loading } = showInfo;

  const updateShowNewRoleModal = () => {
    setShowNewRoleModal(!showNewRoleModal);
  };

  const getCompanyName = async (companyId) => {
    const { data: name } = await axios.get(`/api/companies/${companyId}/name`);
    setCompanyName(name);
  };

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    } else {
      getCompanyName(show.company);
    }
  }, [dispatch, showId, show]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        show && (
          <>
            <NewRoleModal
              showModal={showNewRoleModal}
              updateShowModal={updateShowNewRoleModal}
              showId={showId}
            />
            <Container>
              <Row className="align-items-center ">
                <Col sm={1}>
                  <Link to={`/show/${showId}`}>
                    <Image src={show.coverImage} alt={show.name} fluid></Image>
                  </Link>
                </Col>
                <Col sm={7}>
                  <Link to={`/show/${showId}`}>
                    <h2 className="text-white">{show.title}</h2>
                  </Link>
                  <h5 className="text-secondary">
                    By{" "}
                    <Link
                      className="link text-secondary"
                      to={`/company/${show.company}`}
                    >
                      {companyName}
                    </Link>
                  </h5>
                </Col>
              </Row>
              <Row>
                <h5 className="text-white">Full Cast List</h5>
              </Row>
              <Row className="text-white">
                {userInfo ? (
                  <Col sm={1}>
                    <span className="link" onClick={updateShowNewRoleModal}>
                      Add Role
                    </span>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
              <Row className="mb-4">
                <ul>
                  {show.roles.map((role) => {
                    return <CastListItem role={role} key={role._id} />;
                  })}
                </ul>
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default CastScreen;
