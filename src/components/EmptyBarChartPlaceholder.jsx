import React from 'react'

const EmptyBarChartPlaceholder = ({className}) => {
  return (
     <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className={className}
    fill="none"
  >
    <rect x="20" y="120" width="20" height="60" fill="#cbd5e1" rx="4" />
    <rect x="60" y="90" width="20" height="90" fill="#93c5fd" rx="4" />
    <rect x="100" y="60" width="20" height="120" fill="#cbd5e1" rx="4" />
    <rect x="140" y="40" width="20" height="140" fill="#93c5fd" rx="4" />
  </svg>
  )
}

export default EmptyBarChartPlaceholder
