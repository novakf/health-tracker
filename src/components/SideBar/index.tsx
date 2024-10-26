import { AppstoreOutlined, CalendarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import FoodIcon from '../../icons/FoodIcon';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '../../icons/DashboardIcon';
import { user } from '../../pages/HomePage';

const items = [
  {
    title: 'Домашняя',
    link: '/',
    icon: <DashboardIcon style={{ fontSize: 20 }} />,
  },
  {
    title: 'Календарь',
    link: '/calendar',
    icon: <CalendarOutlined style={{ fontSize: 20 }} />,
  },
  {
    title: 'Рацион',
    link: '/diet',
    icon: <FoodIcon style={{ fontSize: 20 }} />,
  },
];

const SideBar: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <Title>Life Tracker</Title>
      {items.map((item) => {
        return (
          <Item
            to={item.link}
            key={item.title}
            $active={location.pathname === item.link}
          >
            {item.icon}
            {item.title}
          </Item>
        );
      })}
    </Container>
  );
};

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
  margin-left: 30px;
  color: #000;
`;

const Profile = styled(Link)`
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Name = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  padding: 0 0 8px 0;
  text-align: center;
`;

const Avatar = styled.img`
  width: 100%;
  transition: transform 0.3s ease-out;
  background: #afadb5;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0;
`;

const Item = styled(Link)<{ $active?: boolean }>`
  display: flex;
  color: #4b4b4b;
  background: ${(p) => (p.$active ? '#f1f1f1;' : '#fff;')}
  gap: 14px;
  transition: 0.3s;
  padding: 10px 14px 10px 30px;
  font-size: 14px;
  align-items: center;

  &:hover {
    background: #e1e1e1;
    color: #4b4b4b;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  width: 250px;
  box-shadow: 0 10px 20px -10px #0000003a;
  padding-top: 14px;
`;

export default SideBar;
