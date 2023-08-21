import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineIe } from 'react-icons/ai';
import { BsDashLg, BsMenuButtonWideFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  SET_USERNAME,
  SET_LOGIN,
  SET_ISADMIN,
} from '../../Redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../../App';

const Header = ({
  link1,
  link2,
  text1,
  text2,
  link3,
  text3,
  logOut = false,
  vote = false,
  away = false,
}) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(SET_LOGIN).payload.auth;
  const LoggedIn = !!isLoggedIn;
  const { isAdmin } = useSelector(SET_ISADMIN).payload.auth;
  console.log(isAdmin);
  // const admin = !!isAdmin;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { payload } = useSelector(SET_USERNAME);
  console.log(payload);
  // const { auth: isAdmin } = useSelector(SET_ISADMIN).payload;

  // const isAdmin = localStorage.getItem('isAdmin');
  const name = localStorage.getItem('username');
  const userName = payload.auth.username || name;

  const logOutHandler = async () => {
    try {
      await axios.get(`${URL}/api/users/logout`);
      toast.success('Logged out successfully');
      dispatch(SET_LOGIN(false));
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isLoggedIn');

      localStorage.removeItem('username');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  // console.log(LoggedIn);
  return (
    <div
      className={`  flex items-center pb-6 pt-2 px-4 fixed top-0 left-0 right-0  z-10 bg-blue-900`}
    >
      <div
        className={`container flex sm:flex-row ${
          pathname === '/' ? 'flex-row pt-2' : ' '
        } space-y-2 justify-between  items-center mx-auto max-w-6xl`}
      >
        {logOut ? (
          <div className="logo flex  space-x-2 text-white font-bold  ">
            {vote ? null : <p className="text-base">Welcome,</p>}
            <span className="text-base uppercase text-white font-bold ">
              {userName && userName.length > 7
                ? `${userName.slice(0, 7)}...`
                : userName}
            </span>{' '}
            {vote ? (
              <p className="sm:text-3xl text-xl">{'  '}Your vote counts</p>
            ) : null}
          </div>
        ) : (
          <div className="logo flex items-center mr">
            <AiOutlineIe size={35} color="#fff" />
            <BsDashLg color="#fff" />
            <span className="text-3xl text-white font-bold ">Vote</span>
          </div>
        )}
        <div className="buttons hidden md:flex ">
          <ul className="flex items-center flex-wrap gap-2">
            {!LoggedIn && pathname !== '/' ? (
              <li className="text-white">
                <Link to={'/'}>Home</Link>
              </li>
            ) : null}
            {LoggedIn && pathname !== '/' ? (
              <li className="text-white">
                <Link to={'/'}>Home</Link>
              </li>
            ) : null}

            {LoggedIn === false ? (
              <>
                <li className="text-white ">
                  <Link to={link1}>{text1}</Link>
                </li>
                <li>
                  <button className="py-1 px-2 text-white rounded-sm bg-blue-600">
                    <Link to={link2}>{text2}</Link>
                  </button>
                </li>
              </>
            ) : (
              <button
                className="py-1 px-2 text-white rounded-sm bg-blue-600"
                onClick={logOutHandler}
              >
                <Link>{'Log out'}</Link>
              </button>
            )}

            {isAdmin && LoggedIn && pathname === '/polls' ? (
              <>
                <li
                  className="text-white  py-1 px-2
                  rounded-sm bg-blue-600"
                >
                  <Link to={'/addPoll'}>add Poll</Link>
                </li>
              </>
            ) : null}
            {LoggedIn === true && pathname !== '/polls' && (
              <li>
                <button className="py-1 px-2 text-white rounded-sm bg-blue-600">
                  <Link to={'/polls'}>{'Polls'}</Link>
                </button>
              </li>
            )}
          </ul>
        </div>
        <div
          className={`${
            isOpen
              ? 'block translate-y-0 duration-300 transition-all'
              : 'hidden -translate-y-6 duration-300 transition-all'
          } buttons absolute right-4 top-14  bg-white p-4 `}
        >
          <ul className="flex flex-col items-center flex-wrap gap-2">
            {!LoggedIn && pathname !== '/' ? (
              <li className="text-black font-bold">
                <Link to={'/'}>Home</Link>
              </li>
            ) : null}
            {LoggedIn && pathname !== '/' ? (
              <li className="text-black  font-bold">
                <Link to={'/'}>Home</Link>
              </li>
            ) : null}

            {LoggedIn === false ? (
              <>
                <li className="text-white bg-blue-600 py-1 px-2">
                  <Link to={link1}>{text1}</Link>
                </li>
                <li>
                  <button className="py-1 px-2 text-white rounded-sm bg-blue-600">
                    <Link to={link2}>{text2}</Link>
                  </button>
                </li>
              </>
            ) : (
              <button
                className="py-1 px-2 text-white rounded-sm bg-blue-600"
                onClick={logOutHandler}
              >
                <Link>{'Log out'}</Link>
              </button>
            )}

            {isAdmin && LoggedIn && pathname === '/polls' ? (
              <>
                <li
                  className="text-white  py-1 px-2
                  rounded-sm bg-blue-600"
                >
                  <Link to={'/addPoll'}>add Poll</Link>
                </li>
              </>
            ) : null}
            {LoggedIn === true && pathname !== '/polls' && (
              <li>
                <button className="py-1 px-2 text-white rounded-sm bg-blue-600">
                  <Link to={'/polls'}>{'Polls'}</Link>
                </button>
              </li>
            )}
          </ul>
        </div>
        <div onClick={() => setIsOpen((prev) => !prev)} className="md:hidden">
          {isOpen ? (
            <FaTimes color="white" size={25} className="md:hidden" />
          ) : (
            <BsMenuButtonWideFill
              color="white"
              size={25}
              className="md:hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
