import React from 'react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';

//import { Button, Col, Form, Row } from 'react-bootstrap';
import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import {
  formatDateMMDDYY,
  postApiWithoutReqAsyn,
  postApiFileUploadWithoutReqAsyn,
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

import { Link } from 'react-router-dom';
import { FormLabel } from '../DataEntryFormLabel';

const cookies = new Cookies();

class CameraVideo extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      UIValues: {},
      initinalFormFill: {},
      formOption: {},
      errors: {},
      CameraValue: {
        TYPE_OF_CREDIT: 'SOVEREIGN',
        TYPE_OF_MARKET_RISK: 'CURRENCY',
        TYPE_OF_PRICING_SOURCE: 'MANUAL',
        SUB_CURRENCY: 'NO',
        DAYS_FROM_TRADE_TO_SETTLEMENT: 0,
      },
      initinalFormFill: {},
    };
    this.handelInit();
  }
  handelInit = () => {
    const { UIValues, formOption } = this.state;

    formOption.currentDate =
      cookies.get('REFERENCE_DATE') === undefined
        ? new Date()
        : new Date(cookies.get('REFERENCE_DATE'));
    formOption.errorBoll = false;
    formOption.legalBoll = false;
    formOption.Message = '';

    this.setState({ UIValues: UIValues });
  };
  handleDateCRR = (date, name) => {
    this.setState(
      {
        formOption: {
          currentDate: date,
        },
      },
      async () => {
        let data = formatDateMMDDYY(this.state.formOption.currentDate);
        let res = await SetRefDate(data);
        if (res.Message === 'Success') {
          this.handelMessage('Reference date successfully saved!', 'legalBoll');
          cookies.set('REFERENCE_DATE', this.state.formOption.currentDate);
        } else {
          this.handelMessage(res.Message, 'errorBoll');
        }
      }
    );
  };

  handelMessage = (Message, Boll) => {
    const { formOption } = this.state;
    formOption[Boll] = true;
    formOption['Message'] = Message;
    this.setState(
      {
        formOption: formOption,
      },
      function () {
        setTimeout(
          function () {
            formOption[Boll] = false;
            this.setState({
              formOption: formOption,
            });
          }.bind(this),
          3000
        );
      }
    );
  };

  getUpdate = async () => {
    let reqData = {};

    if (this.props.match) {
      if (this.props.match.params.id) {
        reqData = {
          ID: this.props.match.params.id,
        };
        let res = await postApiWithoutReqAsyn(PageURL.APIURL.GetById, reqData);

        this.setState({ UIValues: res.SECURITIES[0] });
      }
    }
  };

  // Handle Searchable dropdowns
  handleSeachableDropdonw1 = (val, name) => {
    const { UIValues } = this.state;
    UIValues[name] = val;
    this.setState({
      [UIValues]: UIValues,
    });
  };

  handleChangeGen = (event) => {
    const { formOption } = this.state;
    formOption['name'] = event.target.name;
    formOption[event.target.name] = event.target.value;
    if (event.target.type === 'file')
      formOption[event.target.name] = event.target.files[0];
    formOption['FileName'] = event.target.files; // event.target.files[0];
    // formOption[event.target.name] = event.target.files[0];
    this.setState({
      [formOption]: formOption,
    });
  };

  handleDate = (date, name) => {
    const { UIValues } = this.state;
    UIValues[name] = date;
    this.setState({
      [UIValues]: UIValues,
    });
  };

  handleSave = async () => {
    const { formOption, CameraValue } = this.state;

    var files = formOption.FileName;
    if (files === undefined || files === '') {
      this.handelMessage('Please choose file to upload', 'errorBoll');
    } else {
      var form_data = new FormData();
      // form_data["name"]=formOption.name;
      for (let i = 0; i < files.length; i++) {
        form_data.append(`file[${i}]`, files[i]);
      }
      var data = JSON.stringify({
        name: formOption.name,
        VideoPath: CameraValue,
      });
      form_data.append('name', data);

      let result = await postApiFileUploadWithoutReqAsyn(
        PageURL.APIURL.Add,
        form_data
      );
      if (result.APIResult === 1) {
        var successFile = result.sucess.map(function (obj) {
          return obj.FileName;
        });
        var FaillFile = result.sucess.map(function (obj) {
          return obj.FileName;
        });
        var Msg = 'Record(s) updated successfully';
        this.parenthandelMessage(Msg, 'legalBoll');
      }
    }
  };
  /*handleSeachableDropdonw = async (val, name) => {
    this.setState({
      [name]: val,
    });
    if (name === 'CameraValue') {
      await this.getSTRATEGY(val);
    }
  };*/
  handleSeachableDropdonw = async (val, name) => {
    const { initinalFormFill, CameraValue } = this.state;
    if (name === 'State') {
      var state = { state: val };
      let result = await GetDropdownpost('/USCity/GetCity', val, 'city');
      initinalFormFill['city'] = result.city;
    }
    if (name === 'City') {
      var cameraDetails = { state: CameraValue.State, city: val };
      let result = await GetDropdownpost(
        '/Camera/GetCameraByCity',
        cameraDetails,
        'CameraIp'
      );
      initinalFormFill['CameraIp'] = result.CameraIp;
    }
    CameraValue[name] = val;
    this.setState({
      CameraValue: CameraValue,
      initinalFormFill: initinalFormFill,
    });
  };
  getSTRATEGY = async (id) => {
    let Camera = {
      CameraID: id,
    };
    let STRATEGY_NAME = [];
    await postApiWithoutReqAsyn('/Camera/GetCameraVideo', Camera).then(
      (res) => {
        const { initinalFormFill } = this.state;
        initinalFormFill['STRATEGY_NAME'] = 'STRATEGY_NAME';
        this.setState({ initinalFormFill: initinalFormFill });
      }
    );
  };
  getDataMenu = async () => {
    let res = await getMenuData();
    this.setState({
      MenuData: res.GROUP_AUTHORIZATION,
    });
  };
  async componentDidMount() {
    // let initinalFormFill = await GetDropdown('/Camera/GetAllCameraDetails');
    let initinalFormFill = await GetDropdown('/USCity/GetAllState', '');
    this.setState({ initinalFormFill: initinalFormFill });

    await this.getDataMenu();
  }
  render() {
    const {
      UIValues,
      formOption,
      errors,
      MenuData,
      CameraValue,
      initinalFormFill,
    } = this.state;
    return (
      <div className="datagrid">
        <SnackbarError
          errorBoll={formOption.errorBoll}
          errorMessage={formOption.Message}
        />

        <SnackbarSuccess
          legalBoll={formOption.legalBoll}
          successMessage={formOption.Message}
        />

        <div className="breadcrum">
          <div className="clr"></div>
        </div>
        <div className="refblock"></div>

        <div className="pagetitle">
          {this.props.match !== undefined &&
          this.props.match !== '' &&
          this.props.match.params.id !== '' &&
          this.props.match.params.id !== undefined
            ? 'Upload Video'
            : 'Upload Video'}
        </div>

        <div className="databox">
          <Row>
            <Col md={6}>
              <video
                id="my-video"
                className="video-js"
                controls
                preload="auto"
                width="600"
                height="450"
                poster="../images/folder.png"
                data-setup="{}"
              >
                <source
                  src="https://msstorageblob.blob.core.windows.net/microsofttraficmgmt/a/05-28-2022/cam1.mp4?sp=r&st=2022-05-28T16:43:18Z&se=2022-10-28T00:43:18Z&sv=2020-08-04&sr=b&sig=%2BDSQOdLb809bo%2BFgRcWiJVdbeAOoCLhxJUenfpx%2BDg4%3D"
                  type="video/mp4"
                />
                <source src="MY_VIDEO.webm" type="video/webm" />
                <p class="vjs-no-js">
                  To view this video please enable JavaScript, and consider
                  upgrading to a web browser that
                  <a
                    href="https://videojs.com/html5-video-support/"
                    target="_blank"
                  >
                    supports HTML5 video
                  </a>
                </p>
              </video>
            </Col>
            {/* <Col md={6}>
              <Form.Group>
                <Form.Label>{FormLabel.Name}</Form.Label>

                <SelectSearch
                  container="rowselect"
                  search
                 // options={initinalFormFill.CameraDetails}
                  select="test"
                 // onChange={(val) =>
                  //  this.handleSeachableDropdonw(val, 'CameraValue')
                  }
                  value={CameraValue.CameraDetails}
                  name="CameraDetails"
                  placeholder="Name..."
                /> 
              </Form.Group>
            </Col>*/}
            <Col md={6}>
              <Row className="mrb20">
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="DAY_TELEPHONE"
                      //value={UIValue.DAY_TELEPHONE}
                      onChange={this.handleChangeGen}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mrb20">
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Description</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="DAY_TELEPHONE"
                      //value={UIValue.DAY_TELEPHONE}
                      onChange={this.handleChangeGen}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>State</Form.Label>

                    <SelectSearch
                      container="rowselect"
                      search
                      options={initinalFormFill.usStateList}
                      select="test"
                      onChange={(val) =>
                        this.handleSeachableDropdonw(val, 'State')
                      }
                      value={CameraValue.State}
                      name="CameraDetails"
                      placeholder="Select..."
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>

                    <SelectSearch
                      container="rowselect"
                      search
                      options={initinalFormFill.city}
                      select="test"
                      onChange={(val) =>
                        this.handleSeachableDropdonw(val, 'City')
                      }
                      value={CameraValue.City}
                      name="CameraDetails"
                      placeholder="Select..."
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Camera</Form.Label>

                    <SelectSearch
                      container="rowselect"
                      search
                      options={initinalFormFill.CameraDetails}
                      select="test"
                      onChange={(val) =>
                        this.handleSeachableDropdonw(val, 'CameraValue')
                      }
                      value={CameraValue.CameraDetails}
                      name="CameraDetails"
                      placeholder="SelectCamera..."
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="btncontainer">
                    <Link to="/Investors" className="btnback">
                      Back
                    </Link>
                    <Button
                      onClick={this.handleAddUpdate}
                      className="btnaddrecords"
                    >
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="clr"></div>
        </div>
      </div>
    );
  }
}

export default CameraVideo;
