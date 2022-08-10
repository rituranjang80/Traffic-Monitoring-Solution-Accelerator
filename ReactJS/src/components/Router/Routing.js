import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Login from '../Login/Login';
import Dashboards from '../Dashboard/Dashboard';
import Users from '../User/User';
import CreateUser from '../User/CreateUser';
import Group from '../Group/Group';
import CreateGroup from '../Group/CreateGroup';
import Authorization from '../Group/Authorization';

import Cookies from 'universal-cookie';
import {
  postApiWithoutReqAsyn,
  checkAccessRights,
  checkAddRights,
} from '../Services/PostAPI';
import { PageURL } from '../common/typeofassets';
import NotFound from '../NotFound/NotFound';
import Welcome from '../Welcome/Welcome';
import UploadVideo from '../UploadVideo/UploadVideo';
import CameraVideo from '../CameraVideo/CameraVideo';
import CameraGrid from '../CameraAdd/CameraGrid';
import Library from '../Library/Library';
import VideoShow from '../Library/VideoShow';
import VideoShowProcess from '../Library/VideoShowProcess';
import Livevideo from '../Library/Livevideo';

import CameraAdd from '../CameraAdd/CameraAdd';
const cookies = new Cookies();
class Routing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuaccess: {},
    };
  }
  getUserData = async () => {
    let APIPost = PageURL.APIURL.Get;
    let reqData = {
      EMAIL_ID: cookies.get('email'),
    };
    let result = await postApiWithoutReqAsyn(APIPost, reqData);

    result['GROUP_AUTHORIZATION'] = result.grouP_AUTHORIZATION;
    if (result.Message !== 'USER does not exist.') {
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
    }
  };

  Update = () => {
    this.props.switchHeader();
  };
  async componentDidMount() {
    await this.getUserData();
  }
  render() {
    const { menuaccess } = this.state;
    return (
      <Switch>
        <Route exact path="/" render={() => <Login callBack={this.Update} />} />

        <Route path="/Welcome" component={Welcome} />

        <Route path="/Dashboard/:id" component={Dashboards} />

        <Route path="/UploadVideo" component={UploadVideo} />
        <Route path="/CameraVideo" component={CameraVideo} />
        <Route path="/Library" component={Library} />
        <Route path="/UpdateCamera/:id" component={CameraAdd} />
        <Route path="/CameraAdd/" component={CameraAdd} />
        <Redirect exact from="/CameraAdd1" to="/CameraAdd" />
        <Route path="/CameraGrid" component={CameraGrid} />
        <Route path="/VideoShow/:id" component={VideoShow} />
        <Route path="/VideoShowProcess/:id" component={VideoShowProcess} />
        <Route path="/Livevideo/:id" component={Livevideo} />

        <Route path="*" render={() => <NotFound />} />
      </Switch>
    );
  }
}

export default Routing;
