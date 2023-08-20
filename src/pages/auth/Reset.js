import React, { useState } from 'react';
import { MdPassword } from 'react-icons/md';
// eslint-disable-next-line
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// eslint-disable-next-line

import axios from 'axios';

import Loader from '../../components/components/Loader';
import { URL } from '../../App';

export const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const Reset = () => {
  const { resetToken } = useParams();

  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const register = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Password do not match');
    }
    const userData = {
      password,
    };

    try {
      setIsLoading(true);

      const { data } = await axios.put(
        `${URL}/api/users/resetpassword/${resetToken}`,
        userData
      );
      toast.success(data.message);
      console.log(data);

      setIsLoading(false);
      setFormData({
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
      <div className="flex items-center h-screen bg-zinc-200">
        <div className=" w-[90%] sm:w-[50%] m-auto p-4 flex flex-col justify-center items-center rounded-md text-center space-y-4  bg-white shadow-sm shadow-black/50">
          <MdPassword color="orange" size={40} />
          <p className="text-center font-bold text-3xl">Reset</p>
          <form onSubmit={register} className="grid space-y-4 w-full">
            <input
              type="password"
              className="bg-slate-300 border-none rounded-md p-3 w-full   outline-none"
              placeholder="New Password"
              name="password"
              required
              value={password}
              onChange={handleInputChange}
              y
            />
            <input
              type="password"
              className="bg-slate-300 border-none rounded-md p-3 w-full   outline-none"
              placeholder="Confirm New Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleInputChange}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 p-2 rounded-md text-white"
              >
                Reset Password
              </button>
            )}
          </form>
          <div className="self-end mb-4 flex space-x-1 ">
            <p className="text-blue-500">
              <Link to={'/Login'}> Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
