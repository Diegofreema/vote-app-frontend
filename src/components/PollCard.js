import React from 'react';
import { MdCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SET_LOGIN } from '../Redux/features/authSlice';

const PollCard = ({ question, options, voted, id, deleteHandler }) => {
  const { isAdmin } = useSelector(SET_LOGIN).payload.auth;

  return (
    <div className="relative bg-white w-[100%] sm:[80%] flex-1 sm:w-[50%] mx-auto rounded-sm shadow-md shadow-black/80 p-4 mb-6 cursor-pointer hover:scale-110 transition-all duration-300">
      <Link to={`/polls/${id}`}>
        <div className="">
          <div className="text-center text-2xl font-bold mb-2">{question}</div>
          <div className="flex items-center justify-evenly">
            {options.map((option) => {
              return <button key={option._id}>{option.option}</button>;
            })}
          </div>
        </div>
      </Link>
      {isAdmin === true ? (
        <MdCancel
          className="absolute top-1 right-0 cursor-pointer "
          onClick={deleteHandler.bind(this, id)}
          color="red"
          size={25}
        />
      ) : null}
    </div>
  );
};

export default PollCard;
