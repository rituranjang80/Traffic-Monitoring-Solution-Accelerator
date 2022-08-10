import React, { Component } from 'react';

class SnackbarError extends Component {
  render() {
    let { errorBoll, errorMessage } = this.props;
    return (
      <div
        className="errorMessage"
        style={{ display: errorBoll ? 'block' : 'none' }}
      >
        {errorMessage}
      </div>
    );
  }
}

export default SnackbarError;
