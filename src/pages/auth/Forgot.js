import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { initialState } from './Register';
import axios from 'axios';

import Loader from '../../components/components/Loader';
import { URL } from '../../App';
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { email } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const forgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('Please add an email');
    }

    const userData = {
      email,
    };

    try {
      setIsLoading(true);
      // const data =  await registerUser(userData);
      const { data } = await axios.post(
        `${URL}/api/users/forgotpassword`,
        userData
      );
      toast.success(data.message);
      console.log(data);

      setIsLoading(false);
      setFormData({
        password: '',
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen bg-zinc-200 ">
        <div className=" w-[90%] sm:w-[50%] m-auto p-4 flex flex-col justify-center items-center rounded-md text-center space-y-4  bg-white shadow-sm shadow-black/50">
          <AiOutlineMail color="orange" size={40} />
          <p className="text-center font-bold text-3xl">Forgot password</p>
          <form onSubmit={forgotPassword} className="grid space-y-4 w-full">
            <input
              type="text"
              className="bg-slate-300 border-none rounded-md p-3 w-full  outline-none"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 p-2 mb-4 rounded-md text-white"
              >
                Get reset email
              </button>
            )}
          </form>
          <div className="self-end mb-4 ">
            <p className=" text-right">
              <Link to={'/login'}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
