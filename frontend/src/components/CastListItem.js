import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Col, Row } from "react-bootstrap";
import axios from "axios";

const CastListItem = ({ role }) => {
  const [castMember, setCastMember] = useState({});

  const getCastmemberInfo = async (castMemberId) => {
    const { data } = await axios.get(`/api/castmembers/${castMemberId}`);
    setCastMember(data);
  };

  useEffect(() => {
    getCastmemberInfo(role.castMemberId);
  }, [role]);

  return (
    <Link to={`/castmember/${castMember._id}`}>
      <li className="list-group-item link">
        <Row className="align-items-center ">
          <Col sm={1}>
            <Image
              src={castMember.coverImage}
              alt={castMember.name}
              fluid
              className="list-image"
            ></Image>
          </Col>
          <Col sm={3}>{castMember.name}</Col>
          <Col sm={3}>{role.role}</Col>
        </Row>
      </li>
    </Link>
  );
};

export default CastListItem;
