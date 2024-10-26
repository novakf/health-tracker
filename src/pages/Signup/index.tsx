import { Button, Radio, RadioChangeEvent, Steps, message, theme } from 'antd';
import React, { act, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserDataAction } from '../../store/slices/userSlice';

const steps = [
  {
    title: 'Имя',
    content: ({ navigate, name, setName }) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormTitle>Как вас зовут?</FormTitle>
          <TextField
            label="Имя"
            variant="outlined"
            value={name || ''}
            onChange={(v) => {
              setName(v.currentTarget.value);
            }}
          />
        </div>
      );
    },
  },
  {
    title: 'Активность',
    content: ({ navigate, activity, setActivity }) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormTitle>Какой образ жизни вы ведете?</FormTitle>
          <ActivityButton
            onClick={() => setActivity('NFA')}
            $active={activity === 'NFA'}
          >
            <div>Не очень подвижный</div>
            <div id="desc">
              Большую часть дня провожу сидя (банковский служащий, работник
              офиса и т.п.)
            </div>
          </ActivityButton>
          <ActivityButton
            onClick={() => setActivity('LA')}
            $active={activity === 'LA'}
          >
            <div>Малоподвижный</div>
            <div id="desc">
              Большую часть дня провожу на ногах (учитель, продавец и т.п.)
            </div>
          </ActivityButton>
          <ActivityButton
            onClick={() => setActivity('HA')}
            $active={activity === 'HA'}
          >
            <div>Активный</div>
            <div id="desc">
              Физические нагрузки большую часть дня (официант, курьер и т. п.)
            </div>
          </ActivityButton>
          <ActivityButton
            onClick={() => setActivity('EA')}
            $active={activity === 'EA'}
          >
            <div>Очень активный</div>
            <div id="desc">
              Тяжелые физические нагрузки большую часть дня (велосипедный
              курьер, плотник и т.п.)
            </div>
          </ActivityButton>
        </div>
      );
    },
  },
  {
    title: 'Параметры',
    content: ({
      navigate,
      sex,
      onChangeSex,
      weight,
      setWeight,
      height,
      setHeight,
      age,
      setAge,
    }) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormTitle style={{ marginBottom: 4 }}>Укажите возраст</FormTitle>
          <TextField
            type="number"
            label="Возраст"
            variant="outlined"
            value={age || ''}
            onChange={(v) => {
              setAge(v.currentTarget.value);
            }}
          />
          <FormTitle style={{ marginBottom: 4 }}>Укажите ваш вес</FormTitle>
          <TextField
            type="number"
            label="Вес"
            variant="outlined"
            value={weight || ''}
            onChange={(v) => {
              setWeight(v.currentTarget.value);
            }}
          />
          <FormTitle style={{ marginBottom: 4 }}>Укажите ваш рост</FormTitle>
          <TextField
            type="number"
            label="Рост"
            variant="outlined"
            value={height || ''}
            onChange={(v) => {
              setHeight(v.currentTarget.value);
            }}
          />
          <FormTitle style={{ marginBottom: 4 }}>Выберите пол</FormTitle>
          <Radio.Group onChange={onChangeSex} value={sex}>
            <Radio style={{ fontSize: 16 }} value={'M'}>
              мужчина
            </Radio>
            <Radio style={{ fontSize: 16 }} value={'W'}>
              женщина
            </Radio>
          </Radio.Group>
        </div>
      );
    },
  },
  {
    title: 'Данные авторизации',
    content: ({ navigate, userName, setUserName, password, setPassword }) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormTitle>Почти готово! Создать аккаунт</FormTitle>
          <TextField
            label="Никнейм"
            variant="outlined"
            value={userName || ''}
            onChange={(v) => {
              setUserName(v.currentTarget.value);
            }}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            value={password || ''}
            onChange={(v) => {
              setPassword(v.currentTarget.value);
            }}
          />
        </div>
      );
    },
  },
];

const SignUp = () => {
  const [sex, setSex] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDataAction({ id: '-1', name: '' }));
  }, []);

  const onChangeSex = (e: RadioChangeEvent) => {
    setSex(e.target.value);
  };

  const { token } = theme.useToken();

  const [userInfo, setUserInfo] = useState<{ first_name?: string }>({});
  const [activity, setActivity] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'left',
    marginTop: 16,
    borderTop: '1px solid #cbcbcb',
  };

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const params = useParams();

  const navigate = useNavigate();

  const sendData = async () => {
    await axios
      .post('http://localhost:8010/api/v1/signup', {
        username: userName,
        first_name: name,
        weight: Number(weight),
        height: Number(height),
        age: Number(age),
        sex,
        physical_activity: activity,
        password,
      })
      .then((res) => {
        dispatch(setUserDataAction({ name: userName }));
        if (res.status === 200) {
          message.success('Аккаунт создан');
        }
      })
      .catch(function (error) {
        message.error(error);
      });
  };

  return !params.step ? (
    <Welcome>
      <div>
        <Title>Крепкое здоровье начинается с того, что вы едите.</Title>
        <Description>
          Хотите есть более осознанно? Отслеживайте приемы пищи, узнавайте о
          своих привычках и достигайте своих целей с HealthCheck.
        </Description>
        <Button
          onClick={() => navigate('/signup/1')}
          style={{ marginTop: 20 }}
          size="large"
          type="primary"
        >
          Начать
        </Button>
      </div>
      <img src="src/assets/welcome.webp"></img>
    </Welcome>
  ) : (
    <Wrapper>
      {params.step === '1' && (
        <Form>
          <Steps current={current} items={items} />
          <div style={contentStyle}>
            {steps[current].content({
              navigate,
              name,
              setName,
              activity,
              setActivity,
              onChangeSex,
              sex,
              weight,
              setWeight,
              height,
              setHeight,
              age,
              setAge,
              userName,
              setUserName,
              password,
              setPassword,
            })}
          </div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button
                type="primary"
                disabled={
                  (current === 0 && !name) ||
                  (current === 1 && activity === '') ||
                  (current === 2 && sex === '') ||
                  (current === 2 && height === '') ||
                  (current === 2 && weight === '') ||
                  (current === 2 && age === '')
                }
                onClick={() => next()}
              >
                Дальше
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={async () => {
                  await sendData();
                }}
                disabled={
                  (current === 3 && userName === '') ||
                  (current === 3 && password === '')
                }
              >
                Отправить
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Назад
              </Button>
            )}
          </div>
        </Form>
      )}
    </Wrapper>
  );
};

const FormTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 30px;
  margin-top: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  width: 700px;
  min-height: 100px;
  box-shadow: 0px 6px 25px -11px #0000004f;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 50px;
  line-height: 1em;
  margin-bottom: 40px;
`;

const Description = styled.div``;

const Welcome = styled.div`
  display: flex;
  align-items: center;
  margin: 0 400px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
`;

const ActivityButton = styled.button<{ $active: boolean }>`
  border: 1px solid #cbcbcb;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  padding: 10px !important;

  div {
    text-align: left;
    font-weight: 600;
    font-size: 14px;

    &#desc {
      text-align: left;
      font-weight: 400;
      font-size: 12px;
    }
  }

  transition: 0.2s;

  &:hover {
    border: 1px solid #000;
    cursor: pointer;
  }

  ${(p) => p.$active && 'border: 1px solid #000;'}
`;

export default SignUp;
