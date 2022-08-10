import React, { Component } from 'react';
import './Login.css';
import { Redirect, withRouter } from 'react-router-dom';
import { loginRequest } from '../../authConfig';
import logo from '../../images/logo.png';
import sideImg from '../../images/Trafic_M_login-image.png';
import logintext from '../../images/phalkon-login-text.png';
import Cookies from 'universal-cookie';
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from '@azure/msal-browser';
import { MsalProvider, MsalContext } from '@azure/msal-react';
import { formatDateMMDDYY, postApiWithoutReqAsyn } from '../Services/PostAPI';
import { SignInButton } from './SignInButton';
const cookies = new Cookies();
class Login extends Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      AuthToken: '',
    };
  }

  RequestProfileData = async () => {
    const { instance, accounts, inProgress } = this.context;
    if (instance && inProgress === InteractionStatus.None) {
      await instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          cookies.set('AccessToken', 'Bearer ' + response.accessToken);
          cookies.set('token', 'Bearer ' + response.accessToken);
          window.location.reload();
        });
    }
  };

  SetToken = async (userID) => {
    // let req = { EMAIL_ID: 'imanol@luzcapitalcom.onmicrosoft.com' };
    let req = { EMAIL_ID: userID };
    let result = await postApiWithoutReqAsyn('/user/GetUserDataByEmail', req);
    if (result.APIResult) {
      cookies.set('userID', result.USERS[0].USER_ID);
    }
  };
  async componentDidMount() {
    await this.RequestProfileData();
  }

  render() {
    const isAuthenticated = this.context.accounts.length > 0;
    //return <Redirect to="/Welcome" />;
    if (isAuthenticated) {
      const { accounts, instance } = this.context;
      this.SetToken(accounts[0].username);
      cookies.set('USER_NAME', accounts[0].name);
      cookies.set('email', accounts[0].username);
      //this.props.callBack();
    }
    if (cookies.get('token') != null || cookies.get('token') !== undefined) {
      return <Redirect to="/Welcome" />;
    }
    return (
      <div className="login">
        <div className="login_sideImg">
          <img src={sideImg} />
        </div>
        <div className="loginpan">
          {/* <div className="loginlogo">
            <img className="image2" src={logo} alt="Phalkon" />
            <p></p>

          </div> */}
          <div className="formrow">
            <div className="micro_logo">
              <img style={{ width: '100%' }} src="./microsoft_icon.png" />
            </div>
            <span style={{ marginBottom: '10px' }}>
              <b>Microsoft Traffic Analysis </b>
            </span>
            <div style={{ marginTop: '20px' }}>
              <SignInButton />
            </div>
            {/* <FormControl placeholder="User Name" aria-label="Username" />
              <FormControl placeholder="Password" aria-label="Password" />
               */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
