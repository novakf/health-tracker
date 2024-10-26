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

const App = () => {
  const message = messageData();

  return (
    <BrowserRouter>
      <GenericMessage
        status={message.status}
        open={message.message}
        text={message.messageText}
      />
      {user && <SideBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/:step" element={<SignUp />} />
        <Route path="/diet" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
