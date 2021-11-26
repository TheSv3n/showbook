import React from "react";

const DirectorListItem = ({
  director,
  setDirectorName,
  setDirectorId,
  updateShowModal,
}) => {
  return (
    <li
      className="list-group-item col-6 mx-auto my-2 link"
      onClick={() => {
        setDirectorName(director.name);
        setDirectorId(director._id);
        updateShowModal();
      }}
    >
      {director.name}
    </li>
  );
};

export default DirectorListItem;
