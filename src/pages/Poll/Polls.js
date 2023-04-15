import React, { useEffect, useState } from 'react';
import Header from '../../components/components/Header';
import axios from 'axios';

import PollCard from '../../components/PollCard';
import Loader from '../../components/components/Loader';
import { toast } from 'react-toastify';
import { URL } from '../../App';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllPolls = () => {
    setIsLoading(true);
    axios
      .get(`${URL}/api/polls`)
      .then(({ data }) => {
        return setPolls(data);
      })
      .then(() => {
        return setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      });
  };

  useEffect(() => {
    getAllPolls();
  }, []);
  const deleteHandler = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`${URL}/api/polls/${id}`);
      setIsLoading(false);
      toast.success(`${data.question} has been deleted`);
      getAllPolls();
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen sm:overflow-hidden flex flex-col justify-center items-center px-4  py-8  bg-violet-950">
      <Header
        link2={'/'}
        text2={'Log out'}
        logOut={true}
        away={true}
        link3={'/addPoll'}
        text3={'Add Poll'}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h3 className="text-white sm:mt-4 mt-20 text-2xl font-bold text-center">
              Click on each poll to vote!!!
            </h3>
          </div>
          <div className="mt-[50px] w-full">
            {polls.length > 0 ? (
              polls?.map((poll) => (
                <PollCard
                  key={poll._id}
                  question={poll.question}
                  options={poll.options}
                  votes={poll.voted}
                  id={poll._id}
                  deleteHandler={deleteHandler}
                />
              ))
            ) : (
              <p className="text-white text-center text-3xl font-bold">
                No polls at this time, please check again later!!
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Polls;
