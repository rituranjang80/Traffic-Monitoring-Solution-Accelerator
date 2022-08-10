import React, { Component } from 'react';

class Breadcrum extends Component {
  render() {
    let { title, client, breadmenu, calender } = this.props;
    return (
      <div className="breadcrum">
        <div
          className="menublock"
          dangerouslySetInnerHTML={{ __html: <breadmenu /> }}
        ></div>
        <div className="fundName">
          <h4>{title}</h4>
          <p>{client}</p>
        </div>
        <div className="refdate">{calender}</div>
        <div className="clr"></div>
      </div>
    );
  }
}

export default Breadcrum;
