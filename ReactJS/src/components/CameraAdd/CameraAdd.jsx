import React from 'react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import './CameraAdd.css';
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
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import { getMenuData } from '../Services/MenuAccess';
import SelectSearch from 'react-select-search';
import { GetDropdown, GetDropdownpost } from '../Store/GetDropdown';

const cookies = new Cookies();

class CameraAdd extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      CameraValue: {},
      initinalFormFill: {},
      formOption: {},
      errors: {},
      CameraValue: {},
      map: {},
    };
    this.handelInit();
  }
  handelInit = () => {
    const { CameraValue, formOption } = this.state;

    formOption.PageLoad = true;
    formOption.errorBoll = false;
    formOption.legalBoll = false;
    formOption.Message = '';

    this.setState({ CameraValue: CameraValue });
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

  handleSeachableDropdonw1 = (val, name) => {
    const { CameraValue } = this.state;
    CameraValue[name] = val;
    this.setState({
      [CameraValue]: CameraValue,
    });
  };

  handleChangeGen = (event) => {
    const { formOption, CameraValue } = this.state;
    formOption['name'] = event.target.name;
    CameraValue[event.target.name] = event.target.value;
    formOption[event.target.name] = event.target.value;
    if (event.target.type === 'file')
      formOption[event.target.name] = event.target.files[0];
    formOption['FileName'] = event.target.files; // event.target.files[0];

    this.setState({
      [formOption]: formOption,
      CameraValue: CameraValue,
    });
  };

  handleAddUpdate = async () => {
    const { CameraValue } = this.state;
    let APIPost = '/camera/create';
    if (this.props.match !== undefined && this.props.match !== '') {
      APIPost = '/camera/update';
    }
    CameraValue['place'] = CameraValue['Search'];

    CameraValue['Latitude'] = document.getElementById('Latitude').value;
    CameraValue['Longitude'] = document.getElementById('Longitude').value;

    CameraValue['place'] = document.getElementById('Search').value;

    if (!CameraValue.Latitude) {
      //this.handelMessage('Requried name');
      alert('required Latitude');
      return false;
    }

    if (!CameraValue.Longitude) {
      //this.handelMessage('Requried name');
      alert('required Longitude');
      return false;
    }
    if (!CameraValue.CameraIp) {
      //this.handelMessage('Requried name');
      alert('required CameraName');
      return false;
    }

    let result = await postApiWithoutReqAsyn(APIPost, CameraValue);
    this.handelMessage('Record added successfully!', 'legalBoll');
  };

  handleSeachableDropdonw = async (val, name) => {
    const { initinalFormFill, CameraValue } = this.state;
    if (name === 'State') {
      var state = { state: val };
      let result = await GetDropdownpost('/USCity/GetCity', val, 'city');
      initinalFormFill['city'] = result.city;
    }
    if (name === 'City') {
      var cameraDetails = { city: val };
      let result = await postApiWithoutReqAsyn('/USCity/GetCityByID', val);
      initinalFormFill['CameraIp'] = result.CameraIp;
      document.getElementById('Latitude').value = result.latitude;
      document.getElementById('Longitude').value = result.longitude;
      window.FindMAp(result);
    }
    CameraValue[name] = val;
    this.setState({
      CameraValue: CameraValue,
      initinalFormFill: initinalFormFill,
    });
  };

  /*getDataMenu = async () => {
    let res = await getMenuData();
    this.setState({
      MenuData: res.GROUP_AUTHORIZATION,
    });
  }; */

  async componentDidMount1() {
    let initinalFormFill = await GetDropdown('/USCity/GetAllState', '');
    this.setState({ initinalFormFill: initinalFormFill });
  }
  MapLoad() {
    document.addEventListener('DOMContentLoaded', function (event) {
      var result = {};
      result.latitude = document.getElementById('Latitude').value;
      result.longitude = document.getElementById('Longitude').value;
      window.FindMAp(result);
    });
  }

  async componentDidMount() {
    //   componentDidMount() {
    const { CameraValue, formOption } = this.state;
    let initinalFormFill = await GetDropdown('/USCity/GetAllState', '');
    if (formOption.PageLoad == true) {
      CameraValue.state = window.StateName;
    }

    if (this.props.match !== undefined && this.props.match !== '') {
      if (
        this.props.match.params.id !== '' &&
        this.props.match.params.id !== undefined
      ) {
        await this.getUpdateCamera();
      }
    } else {
      this.setState({
        CameraValue: {},
      });
    }

    if (this.state.CameraValue && this.state.CameraValue.State) {
      let initinalFormFill2 = await GetDropdownpost(
        '/USCity/GetCity',
        this.state.CameraValue.State,
        'city'
      );
      //  console.log(initinalFormFill2, initinalFormFill, 'city');
      initinalFormFill['city'] = initinalFormFill2.city;
    }
    //  return;

    this.setState({
      initinalFormFill: initinalFormFill,
      CameraValue: CameraValue,
      formOption: formOption,
    });

    var result = {};
    if (CameraValue.Latitude) {
      var result = {};
      result.latitude = CameraValue.Latitude;
      result.longitude = CameraValue.Longitude;
      window.FindMAp(result);
    } else {
      result.latitude = window.lat1;
      result.longitude = window.long1;
      window.FindMAp(result);
      document.getElementById('Latitude').value = result.latitude;
      document.getElementById('Longitude').value = result.longitude;
    }
  }

  getUpdateCamera = async () => {
    let reqData = {};

    if (this.props.match !== undefined && this.props.match !== '') {
      if (
        this.props.match.params.id !== '' &&
        this.props.match.params.id !== undefined
      ) {
        reqData = {
          CameraId: this.props.match.params.id,
        };

        await postApiWithoutReqAsyn('/Camera/GetCameraByID', reqData).then(
          (res) => {
            const CameraValuedata = {};
            console.log(res, 'res');
            CameraValuedata.State = res.state;
            CameraValuedata.City = res.city;
            CameraValuedata.Latitude = res.latitude;
            CameraValuedata.Longitude = res.longitude;
            CameraValuedata.iP_Address = res.iP_Address;
            CameraValuedata.CameraIp = res.cameraIp;
            CameraValuedata.remark = res.remark;
            CameraValuedata.cameraId = res.cameraId;
            var result = {};
            result.latitude = CameraValuedata.Latitude;
            result.longitude = CameraValuedata.Longitude;
            window.FindMAp(result);
            let initinalFormFill = {};
            initinalFormFill.city = [res.city];
            this.setState({
              CameraValue: CameraValuedata,
              // initinalFormFill:{}
            });
          }
        );
      }
    } else {
      let CameraValue2 = {};
      this.setState({ CameraValue: CameraValue2 });
    }
  };
  render() {
    const {
      CameraValue,
      formOption,
      errors,
      MenuData,
      initinalFormFill,
    } = this.state;
    if (formOption.PageLoad == true) {
      CameraValue.State = window.StateName;
      CameraValue.City = window.CityName;
      formOption.PageLoad == false;
      //this.setState({formOption:formOption});
    }
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

        <div className="pagetitle">
          {this.props.match !== undefined &&
          this.props.match !== '' &&
          this.props.match.params.id !== '' &&
          this.props.match.params.id !== undefined
            ? 'Camera Update'
            : 'Camera Add'}
        </div>

        <div className="databox">
          <Row>
            <Col md={3}>
              <Form.Group>
                <SelectSearch
                  container="rowselect"
                  search
                  options={initinalFormFill.usStateList}
                  select="test"
                  onChange={(val) => this.handleSeachableDropdonw(val, 'State')}
                  value={CameraValue.State}
                  name="CameraDetails"
                  placeholder="Select..."
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <SelectSearch
                  container="rowselect"
                  search
                  options={initinalFormFill.city}
                  select="test"
                  onChange={(val) => this.handleSeachableDropdonw(val, 'City')}
                  value={CameraValue.City}
                  name="CameraDetails"
                  placeholder="Select..."
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <div id="searchBoxContainer">
                <Form.Group>
                  <InputGroup>
                    <FormControl
                      name="Search"
                      id="Search"
                      value={CameraValue.Search}
                      placeholder="Search"
                      style={{ height: '40px' }}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </Col>
            <Col md={3}>
              <Button
                onClick={this.handleAddUpdate}
                className="btnaddrecords"
                style={{ marginRight: '250px' }}
              >
                Go
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div id="myMap" className="mapcss"></div>
              <Row>
                <Col md={4} style={{ marginLeft: '70px', width: '237px' }}>
                  <Form.Group>
                    <InputGroup>
                      <div style={{ marginTop: '20px' }}>
                        <span style={{ marginLeft: '-80px' }}>
                          <b>Latitude :</b>
                        </span>{' '}
                        <span id="latitude"></span>
                      </div>
                      <FormControl
                        name="Latitude"
                        id="Latitude"
                        value={CameraValue.Latitude}
                        onChange={this.handleChangeGen}
                        placeholder="Latitude"
                        style={{ height: '40px', marginTop: '15px' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <InputGroup style={{ marginLeft: '80px' }}>
                      <div style={{ marginTop: '20px' }}>
                        <span style={{ marginLeft: '-80px' }}>
                          <b>Longitude :</b>
                        </span>{' '}
                        <span id="latitude"></span>
                      </div>
                      <FormControl
                        name="Longitude"
                        id="Longitude"
                        value={CameraValue.Longitude}
                        onChange={this.handleChangeGen}
                        placeholder="Longitude"
                        style={{ height: '40px', marginTop: '15px' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row className="mrb20">
                <Col md={12}>
                  <InputGroup>
                    <FormControl
                      name="CameraIp"
                      value={CameraValue.CameraIp}
                      onChange={this.handleChangeGen}
                      placeholder="Camera Name"
                      style={{ height: '50px', marginTop: '15px' }}
                    />
                  </InputGroup>
                </Col>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Prepend></InputGroup.Prepend>
                    <FormControl
                      name="iP_Address"
                      value={CameraValue.iP_Address}
                      onChange={this.handleChangeGen}
                      placeholder="Stream Endpoint"
                      style={{ height: '50px', marginTop: '15px' }}
                    />
                  </InputGroup>
                </Col>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Prepend></InputGroup.Prepend>
                    <FormControl
                      name="remark"
                      value={CameraValue.remark}
                      onChange={this.handleChangeGen}
                      placeholder="Remarks"
                      style={{ height: '100px', marginTop: '15px' }}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Col md={12}>
                <div className="btncontainer">
                  <Button
                    onClick={this.handleAddUpdate}
                    className="btnaddrecords"
                  >
                    Save
                  </Button>
                </div>
              </Col>
            </Col>
          </Row>
          <div className="clr"></div>
        </div>
      </div>
    );
  }
}

export default CameraAdd;
