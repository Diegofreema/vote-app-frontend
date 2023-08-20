import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../../App';
import { toast } from 'react-toastify';
import Loader from '../../components/components/Loader';

const Confirm = () => {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  console.log(verificationToken);
  useEffect(() => {
    const verifyEmail = async () => {
      setIsLoading(true);
      try {
        await axios.put(`${URL}/api/users/confirmation/${verificationToken}`);
        toast.success('Email verified successfully');

        navigate('/polls');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    verifyEmail();
  }, [verificationToken, navigate]);
  return (
    <div className="flex items-center justify-center h-screen text-3xl text-black font-bold">
      {!isLoading && (
        <>
          <h1>Welcome,</h1>
          <p>
            You have confirmed your email, please wait while we are confirming
            your email
          </p>
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Confirm;
