import React, { memo } from 'react';
import styled from 'styled-components';
import SlickSlider from 'react-slick';
import { Button } from 'antd';
import './styles.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <StyledButton className="NextDay" onClick={onClick}>
      Вперед
    </StyledButton>
  );
}

export const PrevArrow = (props: any) => {
  const { onClick } = props;
  return <StyledButton onClick={onClick}>Назад</StyledButton>;
};

const MenuSlider = memo((props: any) => {
  return (
    <StyledMenuSlider
      dots={false}
      arrows={true}
      slidesToShow={1}
      slidesToScroll={1}
      infinite={false}
      draggable={false}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      {...props}
    >
      {props.children}
    </StyledMenuSlider>
  );
});

const StyledButton = styled(Button)``;

const StyledMenuSlider = styled(SlickSlider)`
  .slick-track {
    position: relative;
    display: flex;
    max-height: 450px;
    width: 500px !important;

    padding: 0px 0px 0px 5px;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .slick-slider {
    height: 100%;
    width: 300px;
  }

  .slick-list {
    width: 510px;
    height: 300px;
    overflow: hidden;
  }
`;

export default MenuSlider;
