import React, { memo } from 'react';
import styled from 'styled-components';
import SlickSlider from 'react-slick';
import { Button } from 'antd';

export function NextArrow(props: any) {
  const { onClick } = props;
  return <></>;
}

export function PrevArrow(props: any) {
  const { onClick } = props;
  return <></>;
}

const MenuSlider = memo((props: any) => {
  return (
    <StyledMenuSlider
      dots={false}
      arrows={true}
      slidesToShow={1}
      slidesToScroll={1}
      infinite={false}
      draggable={false}
      fade={true}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      {...props}
    >
      {props.children}
    </StyledMenuSlider>
  );
});

const StyledMenuSlider = styled(SlickSlider)`
    .slick-track {
        position: relative;
        display: flex;
        max-height: 300px;
        width: 300px !important;
        margin: 0px !important;
        padding: 20px 40px;
    }
    .slick-slider {
        box-shadow: none !important
        display: block;
        height: 250px;
        width: 300px;
        padding: 8px 0px;
        margin-right: 60px;
    }
    .slick-list {
        width: 350px;
        margin-left: 70px;
    }
    .slick-slide {
      
    }
`;

export default MenuSlider;
