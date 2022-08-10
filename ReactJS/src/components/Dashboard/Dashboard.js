import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { getAsyncPowerBi, getAsyncPowerBiToken } from '../Services/GetAPI';
import { MsalProvider, MsalContext } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import * as pbi from 'powerbi-client';
//import './Dashboard.css';
const cookies = new Cookies();

class Dashboard extends Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);

    this.state = {
      src: '',
      token: '',
    };
    //alert(this.props.powerBIEmbedUrl);
  }
  componentDidMount() {
    if (this.props.match !== undefined && this.props.match !== '') {
      if (
        this.props.match.params.id !== '' &&
        this.props.match.params.id !== undefined
      ) {
        let src = '';
        src = './CameraMap.html?id=' + this.props.match.params.id;
        //   if(this.props.match.params.id==40){
        //     src='./CameraMap.html?id='+this.props.match.params.id
        //     //='http://www.mozilla.org'
        //   //  src='http://localhost/index40.html'
        //   }
        //  else if(this.props.match.params.id==41){
        //     src='./CameraMap.html?id='+this.props.match.params.id
        //   //  src='http://localhost/index41.html'
        //     }
        //   else{
        //     src='http://localhost/index0.html'
        //   }

        this.setState({ src: src });
      }
    }
  }

  render() {
    const { src } = this.state;
    return (
      <div style={{ height: '85vh', overflowY: 'hidden' }}>
        {/* {this.props.powerBIEmbedUrlID ? ( */}
        <iframe
          id="test"
          name="test"
          width="1000"
          height="1000"
          frameBorder="0"
          // scrolling="no"
          // seamless="seamless"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          className="reportContainner"
          style={{ 'margin-top': '4%' }}
          title="Chart"
          src={src}
          allowFullScreen="true"
        ></iframe>
        {/* ) : null} */}

        {/* 
<PowerBIEmbed
	embedConfig = {{
		type: 'report',  
		id: Data.id,
		embedUrl: Data.embedUrl,
		accessToken: undefined,
		tokenType: models.TokenType.Aad,
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = { 
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}]
		])
	}
		
	cssClassName = { "reportContainner" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport;
	}}
/> */}
      </div>
    );
  }
}

export default Dashboard;
