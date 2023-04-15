import axios from 'axios';
import React from 'react';
import { AiOutlineIe } from 'react-icons/ai';
import { BsDashLg } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_USERNAME, SET_LOGIN } from '../../Redux/features/authSlice';
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
  const { isAdmin, isLoggedIn } = useSelector(SET_LOGIN).payload.auth;
  const LoggedIn = !!isLoggedIn;

  const { pathname } = useLocation();

  const { payload } = useSelector(SET_USERNAME);
  // const { auth: isAdmin } = useSelector(SET_ISADMIN).payload;

  // const isAdmin = localStorage.getItem('isAdmin');

  const userName = payload.auth.username;

  const logOutHandler = async () => {
    try {
      await axios.get(`${URL}/api/users/logout`);
      toast.success('Logged out successfully');
      dispatch(SET_LOGIN(false));
      localStorage.removeItem('isAdmin');

      localStorage.removeItem('username');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`sm:py-6 p-2 fixed top-0 left-0 right-0  z-10 bg-blue-900`}>
      <div
        className={`container flex sm:flex-row ${
          pathname === '/' ? 'flex-row pt-2' : 'flex-col '
        } space-y-2 justify-between items-center mx-auto max-w-6xl`}
      >
        {logOut ? (
          <div className="logo flex items-center space-x-2 text-white  ">
            {vote ? null : <p className="text-4xl">Welcome,</p>}
            <span className="text-3xl uppercase text-white font-bold ">
              {userName}
            </span>{' '}
            {vote ? (
              <p className="sm:text-3xl text-xl">{'  '}Your vote counts</p>
            ) : null}
          </div>
        ) : (
          <div className="logo flex items-center">
            <AiOutlineIe size={35} color="#fff" />
            <BsDashLg color="#fff" />
            <span className="text-3xl text-white font-bold ">Vote</span>
          </div>
        )}
        <div className="buttons ">
          <ul className="flex items-center gap-2">
            {!LoggedIn && pathname !== '/' ? (
              <li className="text-white">
                <Link to={'/'}>Home</Link>
              </li>
            ) : null}

            {LoggedIn ? (
              <>
                <li
                  className="py-1 px-2 text-white rounded-sm bg-blue-600"
                  onClick={logOutHandler}
                >
                  <Link to={'/'}>Log out</Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-white">
                  <Link to={link1}>{text1}</Link>
                </li>
                <li>
                  <button
                    className="py-1 px-2 text-white rounded-sm bg-blue-600"
                    onClick={logOut ? logOutHandler : null}
                  >
                    <Link to={link2}>{text2}</Link>
                  </button>
                </li>
              </>
            )}

            {isAdmin && LoggedIn && pathname !== '/addPoll' ? (
              <>
                <li
                  className="text-white  py-1 px-2
                  rounded-sm bg-blue-600"
                >
                  <Link to={'/addPoll'}>add Poll</Link>
                </li>
              </>
            ) : null}
            {pathname !== '/polls' && pathname !== '/' ? (
              <li>
                <button className="py-1 px-2 text-white rounded-sm bg-blue-600">
                  <Link to={'/polls'}>{'Polls'}</Link>
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
