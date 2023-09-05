import React, { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { BsSquare, BsCheckSquare } from 'react-icons/bs';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// eslint-disable-next-line

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_USERNAME } from '../../Redux/features/authSlice';
import Loader from '../../components/components/Loader';
import { URL } from '../../App';

export const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const Register = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [checked, setChecked] = useState(false);

  const { username, password, email, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const register = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword || !email) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Password do not match');
    }

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (!password.match(lowerCaseLetters)) {
      return toast.error('Password must contain at least one lowercase letter');
    }
    if (!password.match(upperCaseLetters)) {
      return toast.error('Password must contain at least one uppercase letter');
    }
    if (!password.match(numbers)) {
      return toast.error('Password must contain at least one number');
    }
    if (!password.match(symbols)) {
      return toast.error(
        'Password must contain at least one special character'
      );
    }
    if (!checked) {
      return toast.error(
        'Please accept the terms and conditions before registering'
      );
    }
    const userData = {
      email,
      username: username.toLocaleLowerCase(),
      password,
    };

    try {
      setIsLoading(true);

      const { data } = await axios.post(`${URL}/api/users/register`, userData);
      await axios.post(`${URL}/api/users/confirm`, { email });
      toast.success('Registered successful, Check your email for confirmation');

      console.log(data);
      dispatch(SET_LOGIN(true));
      dispatch(SET_USERNAME(data.username));

      setIsLoading(false);
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-zinc-200">
        <p className="text-center my-8 text-black text-3xl">
          You have to be 18 years old or older to register
        </p>
        <div className=" w-[90%] sm:w-[50%] m-auto p-4 flex flex-col justify-center items-center rounded-md text-center space-y-4  bg-white shadow-sm shadow-black/50">
          <FiUserPlus color="orange" size={40} />
          <p className="text-center font-bold text-3xl">Register</p>
          <form onSubmit={register} className="grid space-y-4 w-full">
            <input
              type="email"
              className="bg-slate-300 border-none rounded-md p-3 w-full  outline-none"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="bg-slate-300 border-none rounded-md p-3 w-full  outline-none"
              placeholder="Username"
              name="username"
              required
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              className="bg-slate-300 border-none rounded-md p-3 w-full   outline-none"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={handleInputChange}
              y
            />
            <input
              type="password"
              className="bg-slate-300 border-none rounded-md p-3 w-full   outline-none"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <div className="flex items-center space-x-2">
              <div onClick={() => setChecked((prev) => !prev)}>
                {!checked ? <BsSquare /> : <BsCheckSquare />}
              </div>
              <Link to={'/policy'} className="text-blue-500 underline">
                Terms & Conditions
              </Link>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 p-2 rounded-md text-white"
              >
                Sign up
              </button>
            )}
          </form>
          <div className="text-center mb-4 flex space-x-1 items-center">
            <p className="text-xs">Already have an account? </p>{' '}
            <p className="text-blue-500">
              <Link to={'/Login'}> Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
