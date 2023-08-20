import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/Home';
// import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Login from './pages/auth/Login';
import Polls from './pages/Poll/Polls';
import PollsDetails from './pages/Poll/PollsDetails';
import AddPoll from './pages/Poll/AddPoll';
import ForgotPassword from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Confirm from './pages/auth/Confirm';

axios.defaults.withCredentials = true;
export const URL = process.env.REACT_APP_URL;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path="/confirmation/:verificationToken" element={<Confirm />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/polls/:id" element={<PollsDetails />} />
        <Route path="/addPoll" element={<AddPoll />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
