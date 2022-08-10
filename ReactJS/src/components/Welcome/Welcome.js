import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import welcomeImg from '../../images/logos.svg';
import Filter from '../common/Filter';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
class Welcome extends Component {
  render() {
    return (
      <div className="datagrid center">
        <h2 style={{ color: '#055C9D' }}>
          {' '}
          Welcome To Microsoft Traffic Analysis System
        </h2>
      </div>
    );
  }
}

export default Welcome;
