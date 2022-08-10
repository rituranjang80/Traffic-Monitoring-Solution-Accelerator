import React from 'react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import ImageUpload from './ImageUpload';
import './UploadVideo.css';
import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
  FormControl,
  Spinner,
} from 'react-bootstrap';

import {
  postApiFileUploadWithoutReqAsyn,
  postApiWithoutReqAsyn,
  checkEditRights,
} from '../Services/PostAPI';
import { UILabel, PageURL } from './typeofassets';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import SelectSearch from 'react-select-search';
import { GetDropdown, GetDropdownpost } from '../Store/GetDropdown';

const cookies = new Cookies();

class UploadVideo extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      UIValues: {},
      initinalFormFill: {},
      formOption: { uploadVide: false, showResults: 0 },
      formOption2: { showResults: 1 },
      errors: {},
      CameraValue: {},
      initinalFormFill: {},
      image: {},
    };
    this.handelInit();
  }
  handelInit = () => {
    const { UIValues, formOption, CameraValue } = this.state;

    formOption.errorBoll = false;
    formOption.legalBoll = false;
    formOption.Message = '';

    if (this.props && this.props.item && this.props.item.videoId) {
      let videoid = this.props.item.videoId;

      let CameraId = {};

      let VideoDetals = this.props.item;
      const { CameraValue } = this.state;
      const CameraValuedata = {};

      //CameraValuedata.CameraIp = VideoDetals.cameraIp;
      // CameraValuedata.cameraid = VideoDetals.cameraid;
      CameraValuedata.name = VideoDetals.name;
      CameraValuedata.remark = VideoDetals.remark;
      CameraValue['videoId'] = VideoDetals.videoId;
      CameraValue['cameraid'] = VideoDetals.cameraid;
      this.setState({
        CameraValue: CameraValuedata,
      });
      // postApiWithoutReqAsyn('/Camera/GetCameraByID', reqData).then((res) => {
      //   let VideoDetals = this.props.item;
      //   const { CameraValue } = this.state;
      //   const CameraValuedata = {};
      //   CameraValuedata.State = res.state;
      //   CameraValuedata.CameraIp = VideoDetals.cameraIp;
      //   CameraValuedata.City = res.city;
      //   CameraValuedata.name = VideoDetals.name;
      //   CameraValuedata.remark = VideoDetals.remark;
      //   // CameraValuedata.videoId = VideoDetals.videoId;
      //   CameraValue['videoId'] = VideoDetals.videoId;
      //   this.setState({
      //     CameraValue: CameraValuedata,
      //   });
      // });
    }

    //this.setState({ UIValues: UIValues, CameraValue: this.props.item });
  };
  setImage = (img) => {
    this.setState({ image: img });
  };

  getCameraByid = async () => {
    const { CameraValue } = this.state;
    if (this.state.CameraValue && this.state.CameraValue.cameraid) {
      let reqData = {
        cameraId: CameraValue.cameraid,
        // CameraId: 1,
      };
      const CameraValuedata = {};
      let VideoDetals = this.props.item;
      CameraValuedata['name'] = VideoDetals.name;
      CameraValuedata['remark'] = VideoDetals.remark;
      // CameraValuedata.videoId = VideoDetals.videoId;
      CameraValue['videoId'] = VideoDetals.videoId;
      this.setState({
        CameraValue: CameraValuedata,
      });
      postApiWithoutReqAsyn('/Camera/GetCameraByID', reqData).then((res) => {
        let VideoDetals = this.props.item;
        const { CameraValue } = this.state;

        CameraValuedata.State = res.state;
        // CameraValuedata.cameraIp = res.cameraIp;
        CameraValuedata.City = res.city;
        CameraValuedata['name'] = VideoDetals.name;
        CameraValuedata['remark'] = VideoDetals.remark;
        // CameraValuedata.videoId = VideoDetals.videoId;
        CameraValue['videoId'] = VideoDetals.videoId;
        CameraValue['CameraIp'] = res.cameraIp;
        CameraValue['cameraId'] = res.cameraId;

        this.setState({
          CameraValue: CameraValuedata,
        });
      });
    }
  };

  handleSeachableDropdonwn = async (val, name) => {
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
      initinalFormFill['CameraIp'] = [];
      if (result.CameraIp) {
        if (result.CameraIp.length > 0) {
          initinalFormFill['CameraIp'] = initinalFormFill['CameraIp'].concat(
            result.CameraIp
          );
        } else {
          initinalFormFill['CameraIp'] = initinalFormFill['place'];
        }
      }
    }
    CameraValue[name] = val;
    this.setState({
      CameraValue: CameraValue,
      initinalFormFill: initinalFormFill,
    });
  };

  handleChangeGen = (event) => {
    const { formOption, CameraValue } = this.state;
    CameraValue[event.target.name] = event.target.value;
    if (event.target.type === 'file') {
      formOption['FileName'] = event.target.files;
      CameraValue[event.target.name] = event.target.files;
    }
    this.setState({
      [formOption]: formOption,
    });
  };

  handleSave = async () => {
    const { formOption, CameraValue, image, formOption2 } = this.state;
    formOption2.showResults = 1;
    formOption['FileName'] = image;
    var files = formOption.FileName;
    let videoid = 0;
    if (this.props && this.props.item && this.props.item.videoId) {
      videoid = this.props.item.videoId;
    }

    // if(this.props.item.videoId>0){
    if (!CameraValue.name) {
      //this.handelMessage('Requried name');
      alert('Required name');
      return false;
    }
    if (!CameraValue.cameraId) {
      //this.handelMessage('Requried name');
      alert('Required camera');
      return false;
    }
    //}
    if (files === undefined || files === '') {
      this.handelMessage('Please choose file to upload', 'errorBoll');
    } else {
      var form_data = new FormData();
      var data = JSON.stringify({
        remark: CameraValue.remark,
        name: CameraValue.name,
        CameraIp: CameraValue.cameraId,
        city: CameraValue.City,
        State: CameraValue.State,
        VideoId: videoid,
        Cameraid: CameraValue.cameraId,
      });
      for (let i = 0; i < files.length; i++) {
        form_data.append(`file[${i}]`, files[i]);
      }
      form_data.append('name', data);
      this.setState({
        formOption2: { showResults: 0 },
      });
      let result = await postApiFileUploadWithoutReqAsyn(
        PageURL.APIURL.Add,
        form_data
      );
      this.setState({
        formOption2: { showResults: 1 },
      });
      this.props.handleModalClose();
      var Msg = 'Record(s) updated successfully';
      this.parenthandelMessage(Msg, 'legalBoll');
    }
  };

  async componentDidMount() {
    try {
      this.setState({
        formOption2: { showResults: 0 },
      });
      await this.getCameraByid();
      let initinalFormFill = await GetDropdown('/USCity/GetAllState', '');
      initinalFormFill['place'] = (
        await GetDropdown('/Camera/GetCameraByPlace', '')
      ).cameraIp;

      initinalFormFill['CameraIp'] = initinalFormFill['place'];
      if (this.props.item.videoId > 0) {
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

        if (this.state.CameraValue && this.state.CameraValue.City) {
          var cameraDetails = {
            state: this.state.CameraValue.State,
            city: this.state.CameraValue.City,
          };
          let result = await GetDropdownpost(
            '/Camera/GetCameraByCity',
            cameraDetails,
            'CameraIp'
          );
          var cam = result.CameraIp;
          // cam=cam.map(item=> item.value==this.state.CameraValue.cameraId)?{...item,selected:true}:{item})
          cam = cam.map((item) =>
            item.value == this.state.CameraValue.cameraId
              ? { ...item, selected: true }
              : { ...item }
          );
          initinalFormFill['CameraIp'] = cam; //result.CameraIp;
        }
        // //  return;

        this.setState({ initinalFormFill: initinalFormFill });
      }
      ///Camera/Get_Camera_Table_Data
      this.setState({ initinalFormFill: initinalFormFill });
      this.setState({
        formOption2: { showResults: 1 },
      });
    } catch (err) {
      this.setState({
        formOption2: { showResults: 1 },
      });
    }
  }
  render() {
    const {
      UIValues,
      formOption,
      formOption2,
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

        <div className="databox">
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <ImageUpload
                      setImage={this.setImage}
                      videoId={this.props.item.videoId}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col md={6}>
              <Row className="mrb20">
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="inputButton">
                        Name
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      readOnly={this.props.item.videoId > 0 ? true : false}
                      name="name"
                      value={CameraValue.name}
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
                      name="remark"
                      value={CameraValue.remark}
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
                      disabled={this.props.item.videoId > 0 ? true : false}
                      container="rowselect"
                      search
                      options={initinalFormFill.usStateList}
                      select="test"
                      onChange={(val) =>
                        this.handleSeachableDropdonwn(val, 'State')
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
                      disabled={this.props.item.videoId > 0 ? true : false}
                      container="rowselect"
                      search
                      options={initinalFormFill.city}
                      select="test"
                      onChange={(val) =>
                        this.handleSeachableDropdonwn(val, 'City')
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
                      disabled={this.props.item.videoId > 0 ? true : false}
                      container="rowselect"
                      search
                      options={initinalFormFill.CameraIp}
                      select="test"
                      onChange={(val) =>
                        this.handleSeachableDropdonwn(val, 'cameraId')
                      }
                      value={CameraValue.cameraId}
                      name="CameraDetails"
                      placeholder="Select..."
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {formOption2.showResults == 0 ? (
                    <>
                      <Spinner animation="border" size="lg" />
                      <Spinner animation="border" />
                      <Spinner animation="grow" size="sm" />
                      <Spinner animation="grow" />
                    </>
                  ) : (
                    <div className="btncontainer">
                      <Button
                        onClick={this.handleSave}
                        className="btnaddrecords"
                      >
                        Save
                      </Button>
                    </div>
                  )}
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

export default UploadVideo;
