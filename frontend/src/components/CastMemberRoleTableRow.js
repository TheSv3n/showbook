import React from "react";
import { Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CastMemberRoleTableRow = ({ role }) => {
  return (
    <tr>
      <td className="text-light">
        {" "}
        <Link to={`/show/${role.showId}`} className="link text-light">
          <Col sm={6}>
            <Image
              src={role.showPoster}
              alt={role.showTitle}
              fluid
              className="list-image"
            ></Image>
          </Col>
        </Link>
      </td>
      <td className="text-light">
        <Link to={`/show/${role.showId}`} className="link text-light">
          {role.showTitle}
        </Link>
      </td>

      <td className="text-light">{role.roleName}</td>
    </tr>
  );
};

export default CastMemberRoleTableRow;
