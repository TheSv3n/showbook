import React from "react";

const CastMemberListItem = ({
  castMember,
  setCastMemberName,
  setCastMemberId,
  updateShowModal,
}) => {
  return (
    <li
      className="list-group-item col-6 mx-auto my-2 link"
      onClick={() => {
        setCastMemberName(castMember.name);
        setCastMemberId(castMember._id);
        updateShowModal();
      }}
    >
      {castMember.name}
    </li>
  );
};

export default CastMemberListItem;
