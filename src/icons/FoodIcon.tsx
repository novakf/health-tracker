import Icon, {
  CustomIconComponentProps,
} from '@ant-design/icons/lib/components/Icon';
import React from 'react';

type IconProps = {
  size?: number;
};

const FoodIcon: React.FC<React.SVGAttributes<SVGSVGElement> & IconProps> = (
  props
) => {
  return (
    <svg
      fill="currentColor"
      height={props.style?.fontSize + 'px'}
      width={props.style?.fontSize + 'px'}
      viewBox="0 0 15 15"
      version="1.1"
      id="restaurant"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          id="path11774"
          d="M3.5,0l-1,5.5c-0.1464,0.805,1.7815,1.181,1.75,2L4,14c-0.0384,0.9993,1,1,1,1s1.0384-0.0007,1-1L5.75,7.5
	c-0.0314-0.8176,1.7334-1.1808,1.75-2L6.5,0H6l0.25,4L5.5,4.5L5.25,0h-0.5L4.5,4.5L3.75,4L4,0H3.5z M12,0
	c-0.7364,0-1.9642,0.6549-2.4551,1.6367C9.1358,2.3731,9,4.0182,9,5v2.5c0,0.8182,1.0909,1,1.5,1L10,14c-0.0905,0.9959,1,1,1,1
	s1,0,1-1V0z"
        ></path>{' '}
      </g>
    </svg>
  );
};

export default FoodIcon;
