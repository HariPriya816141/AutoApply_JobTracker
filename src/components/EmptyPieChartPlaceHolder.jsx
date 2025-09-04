import React from "react";

const EmptyPieChartPlaceHolder = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      fill="none"
    >
      <circle cx="100" cy="100" r="80" stroke="#e5e7eb" strokeWidth="16" />
      <path d="M100 20 A80 80 0 0 1 180 100 L100 100 Z" fill="#93c5fd" />
      <circle cx="100" cy="100" r="30" fill="white" />
    </svg>
  );
};


export default EmptyPieChartPlaceHolder;