import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import HomePage, { user } from './pages/HomePage';
import '@fontsource/montserrat';
import '@fontsource/inter';
import { styled } from 'styled-components';
import Profile from './pages/Profile';
import GenericMessage from './components/Message';
import { messageData } from './store/slices/messageSlice';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { setUserDataAction, userData } from './store/slices/userSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {
  const message = messageData();

  const user = userData();

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [modalMenuOpen, setModalMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8010/api/v1/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        dispatch(setUserDataAction(res.data));
        setLoading(false);
      })
      .catch(function (error) {
        console.log('UserInfoError', error);
        setLoading(false);
      });
  }, []);

  return (
    !loading && (
      <BrowserRouter>
        <GenericMessage
          status={message.status}
          open={message.message}
          text={message.messageText}
        />
        {<SideBar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/:step" element={<SignUp />} />
          <Route path="/diet" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    )
  );
};

export default App;
