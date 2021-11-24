import React from "react";

const CompanyListItem = ({
  company,
  setCompanyName,
  setCompanyId,
  updateShowModal,
}) => {
  return (
    <li
      className="list-group-item col-6 mx-auto my-2 link"
      onClick={() => {
        setCompanyName(company.name);
        setCompanyId(company._id);
        updateShowModal();
      }}
    >
      {company.name}
    </li>
  );
};

export default CompanyListItem;
