import React from 'react';

type IconProps = {
  size?: number;
};

const DashboardIcon: React.FC<
  React.SVGAttributes<SVGSVGElement> & IconProps
> = (props) => {
  return (
    <svg
      fill="currentColor"
      height={props.style?.fontSize + 'px'}
      width={props.style?.fontSize + 'px'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      id="dashboard"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect x="2" y="2" width="9" height="11" rx="2"></rect>
        <rect x="13" y="2" width="9" height="7" rx="2"></rect>
        <rect x="2" y="15" width="9" height="7" rx="2"></rect>
        <rect x="13" y="11" width="9" height="11" rx="2"></rect>
      </g>
    </svg>
  );
};

export default DashboardIcon;
