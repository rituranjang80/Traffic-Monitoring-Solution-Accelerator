import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class NotFound extends Component {
  render() {
    return (
      <div className="notfound">
        <p>
          You don't have permission to access this page, contact your
          administrator
        </p>
      </div>
    );
  }
}

export default NotFound;
