import { Progress } from 'react-circle-progress-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { Statistic, StatisticProps, Tabs } from 'antd';
import CountUp from 'react-countup';
import { Link, useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/default-avatar.png';
import dietsMock from '../../mocks/diets';
import Menu from '../../components/SelectDiet/Menu';
import { userData } from '../../store/slices/userSlice';

export const user = {
  name: 'Богдан',
  avatarImage: defaultAvatar,
  height: 180,
};

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const user = userData();

  useEffect(() => {
    if (!user || !user.id) navigate('/signup');
  }, []);

  const [diets, setDiets] = useState(dietsMock);

  const currentHour = new Date().getHours();

  let welcome = '';

  if (currentHour >= 5 && currentHour < 11) {
    welcome = 'Доброе утро!';
  }

  if (currentHour >= 11 && currentHour < 17) {
    welcome = 'Добрый день!';
  }

  if (currentHour >= 17 && currentHour < 21) {
    welcome = 'Добрый вечер!';
  }

  return (
    <Container>
      <Header>
        <Title>{welcome}</Title>
        <Profile to={'/profile'}>
          <Name>{user.name}</Name>
          <ImageContainer>
            <Avatar src={user.avatarImage} />
          </ImageContainer>
        </Profile>
      </Header>
      <Line>
        <Pane>
          <PaneTitle>Ваши цели</PaneTitle>
          <Circles>
            <StyledProgress>
              <Progress
                strokeWidth={16}
                style={{ width: 120 }}
                subtitle={'Калории'}
                hideValue
              />
              <ProgressTitle>
                <Statistic value={2000} formatter={formatter} />
              </ProgressTitle>
            </StyledProgress>

            <StyledProgress>
              <Progress
                strokeWidth={16}
                style={{ width: 120 }}
                subtitle={'Белки'}
                hideValue
              />
              <ProgressTitle>
                <Statistic value={140} formatter={formatter} />
              </ProgressTitle>
            </StyledProgress>
            <StyledProgress>
              <Progress
                strokeWidth={16}
                style={{ width: 120 }}
                subtitle={'Жиры'}
                hideValue
              />
              <ProgressTitle>
                <Statistic value={50} formatter={formatter} />
              </ProgressTitle>
            </StyledProgress>
            <StyledProgress>
              <Progress
                strokeWidth={16}
                style={{ width: 120 }}
                subtitle={'Углеводы'}
                hideValue
              />
              <ProgressTitle>
                <Statistic value={120} formatter={formatter} />
              </ProgressTitle>
            </StyledProgress>
          </Circles>
        </Pane>
        <Pane style={{ minWidth: 180 }}>
          <PaneTitle>Пройдено</PaneTitle>
          <Statistic value={12000} formatter={formatter} suffix={'шагов'} />
          <Statistic value={10} formatter={formatter} suffix={'км'} />
        </Pane>
      </Line>
      <Title style={{ marginTop: 30, marginBottom: 16 }}>Рацион для вас</Title>
      <Menu diets={diets} />
    </Container>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Line = styled.div`
  display: flex;
  gap: 18px;
`;

const Circles = styled.div`
  display: flex;
`;

const ProgressTitle = styled.div`
  position: absolute;
  margin-left: -10px;
  margin-top: 26px;
  top: 0;
  left: 0;
  width: 140px;
  font-size: 24px;

  .ant-statistic {
    display: flex;
    justify-content: center;
  }
`;

const StyledProgress = styled.div`
  position: relative;
  width: 140px;
  font-size: 20px;
`;

const PaneTitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Pane = styled.div`
  padding: 14px;
  box-shadow: 0px 6px 25px -11px #0000004f;
  border-radius: 15px;
  background: #fff;
`;

const Container = styled.div`
  margin-top: 16px;
  margin-left: 20px;
`;

const Title = styled.div`
  font-size: 30px;
`;

const Profile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 20px;
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
  text-align: center;
`;

const Avatar = styled.img`
  width: 100%;
  transition: transform 0.3s ease-out;
  background: #fff;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0;
  border: 1px solid #d7d7d7;
`;

export default HomePage;
