import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import logo_white from '../../images/logo_white.png';
import menuarrow from '../../images/downarrow.png';
import { Accordion, Button } from 'react-bootstrap';
import { MsalContext } from '@azure/msal-react';
import user from '../../images/ic-user.png';
import { SignOutButton } from './Logout';
import jwt_decode from 'jwt-decode';
import {
  postApi,
  postApiWithoutReqAsyn,
  formatDateMMDDYY,
} from '../Services/PostAPI';
import { PageURL } from './typeofassets.js';
import { loginRequest } from '../../authConfig';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Header extends Component {
  static contextType = MsalContext;
  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: true,
      Dashboard: false,
      DataEntry: false,
      Endofday: false,
      Report: false,
      Utilities: false,
      Users: false,
      Documents: false,
      Setting: false,
      Data: [],
      menuaccess: {},
      isAccess: false,
    };
    this.setWrapperRefSource = this.setWrapperRefSource.bind(this);
  }

  setWrapperRefSource(node) {
    this.wrapperRefSource = node;
  }
  handleClickOutside = (event) => {
    if (
      this.wrapperRefSource &&
      !this.wrapperRefSource.contains(event.target)
    ) {
      this.setState({
        Dashboard: false,
        DataEntry: false,
        Endofday: false,
        Report: false,
        Utilities: false,
        Users: false,
        Documents: false,
        Setting: false,
      });
    }
  };
  handleLogout = async () => {
    const isAuthenticated = (await this.context.accounts.length) > 0;
    cookies.remove('token');
    cookies.remove('userID');
    cookies.remove('USER_NAME');
    cookies.remove('email');
    cookies.remove('AccessToken');

    window.location.replace('/');
  };

  getUserData = async () => {
    let APIPost = PageURL.APIURL.Get;
    let reqData = {
      EMAIL_ID: cookies.get('email'),
    };
    let result = await postApiWithoutReqAsyn(APIPost, reqData);
    result['GROUP_AUTHORIZATION'] = result.grouP_AUTHORIZATION;
    // result['GROUP_AUTHORIZATION']=result.grouP_AUTHORIZATION;

    // if (result.Message !== 'USER does not exist.') {
    let data = result.users[0];
    cookies.set('userID', data.user_Id);
    cookies.set('USER_NAME', data.user_Name);
    if (result.GROUP_AUTHORIZATION.length === 0) {
      this.setState({
        isAccess: true,
      });
    } else {
      this.setState({
        isAccess: false,
        menuaccess: result.GROUP_AUTHORIZATION,
      });
    }
  };
  //};

  componentDidMount() {
    document.addEventListener('mousemove', this.handleClickOutside);
    this.getUserData();
  }

  render() {
    const pathname = this.props.location.pathname;
    const {
      isMenuVisible,
      Dashboard,
      DataEntry,
      Endofday,
      Report,
      Utilities,
      Users,
      Documents,
      Setting,
      menuaccess,
      isAccess,
    } = this.state;
    if (menuaccess && menuaccess.length === 0) {
      // this.handleLogout();
      this.handleDeleteModal();
    }

    return (
      <React.Fragment>
        <div className="header">
          <div className="topbar">
            <div className="branding">
              <div className="">
                <img style={{ height: '100%' }} src="./microsoft_icon.png" />
              </div>

              <NavLink
                className="logo "
                exact
                activeClassName="tabactive"
                to="/Dashboard/0"
              >
                <div>Control Room</div>
              </NavLink>
              <NavLink
                className="logo "
                exact
                activeClassName="tabactive"
                to="/Library"
              >
                <div>Library</div>
              </NavLink>
              <NavLink
                className="logo "
                exact
                activeClassName="tabactive"
                to="/CameraAdd1"
              >
                <div>Configuration</div>
              </NavLink>
              <NavLink
                className="logo"
                exact
                activeClassName="tabactive"
                to="/CameraGrid"
              >
                <div>Camera Detail</div>
              </NavLink>
            </div>

            <div className="UserLogin">
              <div className="UserLoginBox">
                <span className="UserLogin Test_login">
                  <img className="usericon" src={user} alt="user images" />{' '}
                  {cookies.get('USER_NAME')}{' '}
                  {/* <img className="downarrow" src={menuarrow} alt="Phalkon" />*/}
                  <span style={{ marginBottom: '10px' }}>&nbsp; </span>
                </span>

                <ul>
                  <SignOutButton />
                </ul>
              </div>
            </div>
          </div>
        </div>

        {isAccess === true ? (
          <div className="permission">
            <h1>You don't have sufficient permission on portal, </h1>
            <p>Please contact portal administrator</p>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
