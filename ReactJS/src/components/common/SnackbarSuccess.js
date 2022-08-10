import React, { Component } from 'react';

class SnackbarSuccess extends Component {
  render() {
    let { legalBoll, successMessage } = this.props;
    return (
      <div
        className="successmessage"
        style={{ display: legalBoll ? 'block' : 'none' }}
      >
        {successMessage}
      </div>
    );
  }
}

export default SnackbarSuccess;
