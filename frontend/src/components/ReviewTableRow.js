import React, { useEffect, useState } from "react";

const ReviewTableRow = ({ review }) => {
  return (
    <tr>
      <td className="text-light">{review.poster}</td>
      <td className="text-light">{review.title}</td>
      <td className="text-light">{review.company}</td>
      <td className="text-light">{review.rating}</td>
    </tr>
  );
};

export default ReviewTableRow;
