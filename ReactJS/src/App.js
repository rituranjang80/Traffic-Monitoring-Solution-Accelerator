import React, { Component } from 'react';
import Header from './components/common/Header';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'universal-cookie';
import Routing from './components/Router/Routing';
import { withRouter } from 'react-router-dom';

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCookiesSet: cookies.get('token'),
    };
  }
  SwithToLogin = () => {
    this.setState({
      isCookiesSet: cookies.get('token'),
    });
  };

  render() {
    let locationName = this.props?.location?.pathname.split('/')[1];
    if (
      this.state.isCookiesSet !== null &&
      this.state.isCookiesSet !== undefined
    ) {
      return (
        <div>
          {locationName !== 'Livevideo' && (
            <Header switchHeader={this.SwithToLogin} />
          )}
          <div className="comoncantainer">
            <Routing switchHeader={this.SwithToLogin} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Routing switchHeader={this.SwithToLogin} />
        </div>
      );
    }
  }
}

export default withRouter(App);
