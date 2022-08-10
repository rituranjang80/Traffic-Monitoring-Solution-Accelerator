import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//let navigate = useNavigate();

//const SignInButton = (props) => {
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    // alert('hello');
    // if (loginType === 'popup') {
    //   instance.loginPopup(loginRequest).catch((e) => {});
    // } else if (loginType === 'redirect') {
    //   instance.loginRedirect(loginRequest).catch((e) => {});
    // }

    document.cookie = 'token=1';
    document.cookie = 'email=DEMO@microsoft.com';

    document.cookie = 'AccessToken=1';
    window.loginRedirect();
    //this.props.history.push('/Welcome');

    // let path = `Welcome`;
    // navigate('Welcome')
    //let history = useHistory();
    //history.push(path);
  };
  return <Button onClick={() => handleLogin('redirect')}>Sign in</Button>;
};
