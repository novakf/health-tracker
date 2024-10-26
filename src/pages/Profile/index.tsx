import React, { useEffect, useState } from 'react';
import { user } from '../HomePage';
import { styled } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GenericFileUpload from './components/GenericFileUpload';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useMessage } from '../../utils';

const Profile = () => {
  const [avatar, setAvatar] = useState<File>();

  const [currentUser, setCurrentUser] = useState(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const speakerId = Number(location.pathname.split('/')[3]);

  useEffect(() => {
    getSpeaker(speakerId);
  }, []);

  const getSpeaker = (speakerId: number) => {
    axios
      .get(`http://localhost:3001/speakers/${speakerId}`)
      .then((result) => {
        setAvatar(result.data.avatarImg);
      })
      .catch((error) => {
        console.log('GetSpeakerError', error);
      });
  };

  const createSpeaker = () => {
    var formData = new FormData();
    user.name && formData.append('name', user.name);
    avatar && formData.append('file', avatar);

    axios
      .post(`http://localhost:3001/speakers/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigate('/speakers/moderation');
        useMessage({ messageText: 'Спикер успешно добавлен' }, dispatch);
      })
      .catch((error) => {
        console.log('AddSpeakerError', error);
      });
  };

  const saveSpeaker = () => {
    var formData = new FormData();
    user.name && formData.append('name', user.name);
    avatar && formData.append('file', avatar);

    axios
      .put(`http://localhost:3001/speakers/${speakerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        getSpeaker(speakerId);
        useMessage({ messageText: 'Данные успешно сохранены' }, dispatch);
      })
      .catch((error) => {
        console.log('AddSpeakerError', error);
        useMessage({ messageText: 'Данные успешно сохранены' }, dispatch);
      });
  };

  return (
    <Container>
      <Form>
        <Field>
          <InputLabel>Имя</InputLabel>
          <StyledInput value={user.height} placeholder="Рост" />
        </Field>
        <Field>
          <InputLabel>Рост</InputLabel>
          <StyledInput value={user.height} placeholder="Рост" />
        </Field>
        <Field>
          <InputLabel>Вес</InputLabel>
          <StyledInput value={user.height} placeholder="Вес" />
        </Field>
        <Field>
          <InputLabel>Возраст</InputLabel>
          <StyledInput value={user.height} placeholder="Возраст" />
        </Field>
        <Field>
          <InputLabel>Физическая активность</InputLabel>
          <StyledInput value={user.height} placeholder="Возраст" />
        </Field>

        <SubmitButton onClick={saveSpeaker}>Сохранить</SubmitButton>
      </Form>
    </Container>
  );
};

const Field = styled.div`
  width: 45%;
`;

const Contacts = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const InputLabel = styled.div`
  color: #1e1e1e;
  font-size: 20px;
  margin-top: 30px;
`;

const StyledTextArea = styled.textarea`
  margin-top: 15px;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;

  height: 50px;

  &:focus {
    border-bottom: 2px solid #898989;
  }
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  background: #003983;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-top: auto;
  cursor: pointer;
  width: 200px;

  &:hover {
    background: #00275b;
  }

  &:active {
    background: #01367d;
  }

  &:disabled {
    background: #dddddd;
    cursor: not-allowed;
    color: #353535;
  }
`;

const StyledInput = styled.input<{ $error?: boolean }>`
  margin-top: 10px;
  border: none;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 16px;
  transition: all 0.2s;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
`;

const Organization = styled.input<{ $empty: boolean }>`
  font-size: 25px;
  color: #00ddff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 10px;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    border: 1px solid #dbdbdb;
  }

  &:focus {
    border: 1px solid #a3a3a3;
  }

  ${(props) => props.$empty && 'border-bottom: 1px solid #dbdbdb'}
`;

const Name = styled.input<{ $empty: boolean }>`
  font-size: 34px;
  font-weight: bold;
  margin-top: 15px;
  color: #2c2e51;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    border: 1px solid #dbdbdb;
  }

  &:focus {
    border: 1px solid #a3a3a3;
  }

  ${(props) => props.$empty && 'border-bottom: 1px solid #dbdbdb'}
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border-right: 2px solid #dddddd;
  padding: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-left: 20px;
`;

const SpeakerContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const AvatarContainer = styled.div`
  display: flex;
  height: 180px;
  width: 180px;
  overflow: hidden;
  border-radius: 90px;
  margin: 0;
  border: 1px solid #e9e9e9;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    color: #535353;
  }
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`;

export default Profile;
