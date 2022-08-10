import React, { Fragment } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import {
  formatDateMMDDYY,
  postApiWithoutReqAsyn,
  postApiFileUploadWithoutReqAsyn,
  postApiWithoutReqAsynNoLoader,
  checkEditRights,
} from '../Services/PostAPI';
import DatePicker from 'react-datepicker';
import { UILabel, PageURL } from './typeofassets';
import { SetRefDate } from '../Store/GetDropdown';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import { getMenuData } from '../Services/MenuAccess';
import SelectSearch from 'react-select-search';
import { GetDropdown, GetDropdownpost } from '../Store/GetDropdown';
import editImg from '../../images/edit_video.png';
import deleteImg from '../../images/delete_video.png';
import { Link } from 'react-router-dom';
import { FormLabel } from '../DataEntryFormLabel';
import TrendChartLine from './TrendChartLine';
import VechileAccidentLive from './VechileAccidentLive';
import Dashboard from '../Dashboard/Dashboard';
import { getApiBodyWithoutReqAsyn, getApiBody } from '../Services/GetAPI';
//import { Iframe2} from './Iframe2'

const cookies = new Cookies();

class Livevideo extends CreateParent {
  constructor(props) {
    super(props);

    this.intervel = null;
    this.state = {
      iframe_key: 0,
      iframe_url: '', //Your URL here
      UIValues: {
        cameraVideo: {
          processSasURL:
            'https://msstorageblob.blob.core.windows.net/microsofttraficmgmt/cam04.mp4?sp=r&st=2022-05-31T14:29:07Z&se=2022-10-27T22:29:07Z&sv=2020-08-04&sr=b&sig=UffEjSERsU95h4QdGQYtyMYyoarUlTOf%2FJWOwdGDBGQ%3D',
        },
      },
      formOption2: { showResults: 1 },
      initinalFormFill: {},
      formOption: {},
      errors: {},
      CameraValue: {
        processSasURL: '',
      },

      initinalFormFill: {},
    };
  }

  getUpdate = () => {
    console.log('test');
    let reqData = {};

    if (this.props.match) {
      if (this.props.match.params.id) {
        reqData = {
          ID: this.props.match.params.id,
        };
        this.getPowerBIData(reqData.ID);
        // this.setState({ CameraValue: res });
      }
    }
  };

  getPowerBIData = async (id) => {
    let s = document.cookie
      .split('; ')
      .find((row) => row.startsWith('selectedcamera='))
      .split('=')[1];
    let cameraId = JSON.parse(s);
    let VideoID = { VideoID: id };
    const { initinalFormFill, formOption2 } = this.state;

    let lastcurrenttimestamp = 0;
    if (localStorage.getItem('lastcurrenttimestamp')) {
      lastcurrenttimestamp = localStorage.getItem('lastcurrenttimestamp');
    }
    let keyid = Math.random() * 100;
    let reqData = {
      cameraId: cameraId,
      currenttimestamp: lastcurrenttimestamp,
      keydata: keyid,
    };
    let res = await postApiWithoutReqAsynNoLoader(
      '/VehicletrendLive/GetBycameraId',
      reqData
    );
    // if (res.length > 0) {
    if (res.vehicleTrendingLive && res.vehicleTrendingLive.length > 0) {
      if (!localStorage.getItem('lastcurrenttimestamp')) {
        localStorage.setItem(
          'lastcurrenttimestamp',
          res.vehicleTrendingLive[0].current_time
        );
      }
      //window.TrendData.push(res);
      if (initinalFormFill['TrendData']) {
        let data = initinalFormFill['TrendData'];

        Array.prototype.push.apply(data, res);
        initinalFormFill['TrendData'] = res.vehicleTrendingLive;

        initinalFormFill['MonitorData'] = res.trafficAccidentLive;
      } else {
        initinalFormFill['TrendData'] = res.vehicleTrendingLive;

        initinalFormFill['MonitorData'] = res.trafficAccidentLive;
      }
      // this.setState({initinalFormFill:initinalFormFill});
      this.setState((prevState) => {
        // let { initinalFormFill } = prevState;
        // initinalFormFill = initinalFormFill;
        return { initinalFormFill: initinalFormFill };
      });
    }
  };

  // getAccidentData = async (id) => {
  //   let VideoID = { VideoID: id };
  //   const { initinalFormFill, formOption2 } = this.state;

  //   if (!window.lastcurrenttimestamp) {
  //     window.lastcurrenttimestamp = 0;
  //     this.setState({
  //       formOption2: { showResults: 0 },
  //     });
  //   } else {
  //     this.setState({
  //       formOption2: { showResults: 1 },
  //     });
  //   }
  //   // window.lastcurrenttimestamp,
  //   let lastcurrenttimestamp = 0;
  //   if (localStorage.getItem('lastcurrenttimestamp') != '0') {
  //     lastcurrenttimestamp = localStorage.getItem('lastcurrenttimestamp');
  //   }

  //   let reqData = {
  //     cameraId: id,
  //     currenttimestamp: lastcurrenttimestamp,
  //   };
  //   let res = await postApiWithoutReqAsynNoLoader(
  //     '/VehicletrendLiveAccident/GetBycameraId',
  //     reqData
  //   );
  //   if (res.vehicleTrendingLive.length > 0) {
  //     if (!window.lastcurrenttimestamp) {
  //       localStorage.setItem(
  //         'lastcurrenttimestamp',
  //         res.vehicleTrendingLive[0].current_time
  //       );

  //       window.lastcurrenttimestamp = res.vehicleTrendingLive[0].current_time;
  //     }
  //     //window.TrendData.push(res);
  //     if (initinalFormFill['MonitorData']) {
  //       let data = initinalFormFill['MonitorData'];

  //       Array.prototype.push.apply(data, res);
  //       initinalFormFill['MonitorData'] = res;
  //     } else {
  //       initinalFormFill['MonitorData'] = res;
  //     }
  //     // this.setState({initinalFormFill:initinalFormFill});
  //     this.setState((prevState) => {
  //       // let { initinalFormFill } = prevState;
  //       // initinalFormFill = initinalFormFill;
  //       return { initinalFormFill: initinalFormFill };
  //     });
  //   }
  // };

  componentDidMount() {
    const { initinalFormFill } = this.state;
    // this.getUpdate();
    this.intervel = setInterval(this.getUpdate.bind(this), 10000);
    //this.intervel2 = setInterval(this.getAccidentData.bind(this), 10000);
  }
  componentWillUnmount() {
    if (this.setInterval != null) clearInterval(this.intervel);
    // if (this.setInterval != null) clearInterval(this.intervel2);
  }
  render() {
    const {
      UIValues,
      formOption,
      errors,
      MenuData,
      CameraValue,
      initinalFormFill,
      iframe_key,
      iframe_url,
      formOption2,
    } = this.state;
    let keyid = Math.random() * 100;

    return (
      <div className="databox1">
        <Row>
          <Col md={12}>
            {/* {formOption2.showResults == 0 ? (
                    <>
                      <Spinner animation="border" size="lg" />
                      <Spinner animation="border" />
                      <Spinner animation="grow" size="sm" />
                      <Spinner animation="grow" />
                    </>
                  ) : ( */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '12px 2px',
              }}
            ></div>
            {initinalFormFill.TrendData ? (
              <TrendChartLine
                TrendData={initinalFormFill.TrendData}
              ></TrendChartLine>
            ) : null}
            {initinalFormFill.MonitorData ? (
              <VechileAccidentLive
                keyid={keyid}
                MonitorData={initinalFormFill.MonitorData}
              ></VechileAccidentLive>
            ) : null}
            {/* )}
             */}
          </Col>
        </Row>

        <div className="clr"></div>
      </div>
    );
  }
}

export default Livevideo;
