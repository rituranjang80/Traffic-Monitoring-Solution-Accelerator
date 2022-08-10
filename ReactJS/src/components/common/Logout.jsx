import React from 'react';
import { useMsal } from '@azure/msal-react';
import Cookies from 'universal-cookie';
import { postApiWithoutReqAsyn } from '../Services/PostAPI';
import { PageURL } from './typeofassets.js';
const cookies = new Cookies();
export const SignOutButton = () => {
  const { instance, accounts } = useMsal();

  const getLogout = async () => {
    let APIPost = PageURL.APIURL.Logout;
    let reqData = {
      EMAIL_ID: cookies.get('email'),
    };
    let res = await postApiWithoutReqAsyn(APIPost, reqData);
    cookies.remove('REFERENCE_DATE');
    cookies.remove('token');
    cookies.remove('userID');
    cookies.remove('USER_NAME');
    cookies.remove('AccessToken');
    cookies.remove('email');
  };
  const handleLogout = async () => {
    const isAuthenticated = (await accounts.length) > 0;
    getLogout();
    instance.logout();
    cookies.remove('REFERENCE_DATE');
    cookies.remove('token');
    cookies.remove('userID');
    cookies.remove('USER_NAME');
    cookies.remove('AccessToken');
    cookies.remove('email');

    window.location.replace('/');
  };
  return (
    <li className="logout" onClick={() => handleLogout()}>
      Logout
    </li>
  );
};
