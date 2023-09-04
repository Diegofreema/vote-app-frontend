import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/components/Header';
import Loader from '../../components/components/Loader';
import { toast } from 'react-toastify';
import BarCart from '../../components/components/BarCart';
import { URL } from '../../App';

const PollsDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    const getPoll = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${URL}/api/polls/${id}`);
        setIsLoading(false);
        setPoll(data);
        // console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        toast.error(error.message);
      }
    };
    getPoll();
  }, [id]);
  const [dayLeft, setDayLeft] = useState(0);
  const [hourLeft, setHourLeft] = useState(0);
  const [minuteLeft, setMinuteLeft] = useState(0);
  const [secondLeft, setSecondLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('candidate');

  const [poll, setPoll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const { question, _id, options, createdAt } = poll;
  // console.log(createdAt);
  const created = new Date(createdAt).getTime();
  const expiresIn = created + 1000 * 60;
  console.log(expiresIn);
  const data = {
    labels: options?.map((option) => option.option),
    datasets: [
      {
        label: 'Poll',
        data: options?.map((option) => option.votes),
        backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };
  useEffect(() => {
    const interval = setInterval(
      () => {
        const countDate = new Date(expiresIn).getTime();
        const now = new Date().getTime();
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const gap = countDate - now;
        setDayLeft(Math.floor(gap / day));
        setHourLeft(Math.floor((gap % day) / hour));
        setMinuteLeft(Math.floor((gap % hour) / minute));
        setSecondLeft(Math.floor((gap % minute) / second));
      },
      +dayLeft <= 0 && +hourLeft <= 0 && minuteLeft <= 0 && +secondLeft <= 0
        ? null
        : 1000
    );
    return () => clearInterval(interval);
  }, [expiresIn, dayLeft, hourLeft, minuteLeft, secondLeft]);

  const vote = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${URL}/api/polls/vote/${id}`, {
        answer,
      });
      toast.success(`You voted for ${answer}!!!`);
      setIsLoading(false);
      setPoll(data);
    } catch (error) {
      setIsLoading(false);
      toast.error('Sorry, you have already voted!!!');
      console.log(error.message);
    }
  };

  const getAnswer = (option) => {
    setAnswer(option);
    setSelectedAnswer(option);
  };
  const numberedDayLeft = +dayLeft;
  const numberedHourLeft = +hourLeft;
  const numberedMinuteLeft = +minuteLeft;
  const numberedSecondLeft = +secondLeft;

  return (
    <div className="m-h-screen sm:overflow-hidden px-4  flex-col items-center justify-center   py-8  bg-violet-950">
      <Header
        vote={true}
        link2={'/'}
        text2={'Logout'}
        logOut={true}
        away={true}
      />
      <div className="h-screen bg-violet-950">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className=" mt-[100px] text-center">
              <h2 className="text-2xl text-white font-bold">Vote ends in</h2>
              <div className="flex items-center justify-center space-x-3">
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl text-white font-medium space-y-1">
                    {numberedDayLeft <= 0 ? 0 : numberedDayLeft}:
                  </div>
                  <span className="text-white">Day</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl text-white font-medium space-y-1">
                    {numberedHourLeft <= 0 ? 0 : numberedHourLeft}:
                  </div>
                  <span className="text-white"> Hr</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl text-white font-medium space-y-1">
                    {numberedMinuteLeft <= 0 ? 0 : numberedMinuteLeft}:
                  </div>
                  <span className="text-white">Min</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl text-white font-medium space-y-1">
                    {numberedSecondLeft <= 0 ? 0 : numberedSecondLeft}
                  </div>
                  <span className="text-white">Sec</span>
                </div>
              </div>
            </div>
            <div className="mt-[50px] bg-white w-[100%]  sm:w-[50%] shadow-md mx-auto  py-4 shadow-black/50 rounded-lg">
              <p className="font-bold sm:text-3xl text-xl text-black text-center mb-8">
                {question}
              </p>

              {
                <>
                  <div className="flex items-center flex-wrap mb-4 justify-evenly  w-[90%] mx-auto">
                    {options?.map((option) => {
                      return (
                        <button
                          onClick={() => getAnswer(option.option)}
                          key={option._id}
                          className="bg-violet-950 p-2 py-1 mb-2  cursor-pointer text-white rounded-sm "
                        >
                          {option.option}
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-center mt-2">
                    {Number(dayLeft) <= 0 &&
                    Number(hourLeft) <= 0 &&
                    Number(minuteLeft) <= 0 &&
                    Number(secondLeft) <= 0 ? (
                      <p className="text-xl font-bold">
                        Vote has ended, Please check results below!!!
                      </p>
                    ) : (
                      <div className="flex item-center space-x-2 justify-center">
                        <div className="flex items-center space-x-2">
                          <p className="text-black  border border-black p-2 py-1">
                            {selectedAnswer}
                          </p>
                          <button
                            onClick={() => vote(_id)}
                            className="bg-black p-2 py-1   cursor-pointer text-white rounded-sm "
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              }
            </div>
            <div className="w-[100%] py-4   sm:w-[50%] mx-auto mt-5 ">
              <BarCart data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PollsDetails;
