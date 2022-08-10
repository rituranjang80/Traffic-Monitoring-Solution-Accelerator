import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import { Trash } from 'react-bootstrap-icons';
import {
  Button,
  Col,
  Form,
  Row,
  Modal,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import {
  formatDateMMDDYY,
  postApiWithoutReqAsyn,
  postApiFileUploadWithoutReqAsyn,
  checkEditRights,
} from '../Services/PostAPI';
import './Library.css';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import { GetDropdown } from '../Store/GetDropdown';
import ReactDOM from 'react-dom';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';
import UploadVideo from '../UploadVideo/UploadVideo';

const cookies = new Cookies();

class Library extends CreateParent {
  constructor(props) {
    super(props);

    this.AnalyseVideo = this.AnalyseVideo.bind(this);
    this.EditVideo = this.EditVideo.bind(this);
    this.getAllVidoe = this.getAllVidoe.bind(this);
    this.state = {
      show: false,
      item: {},
      iframe_key: 0,
      iframe_url:
        'https://stackoverflow.com/questions/24621664/uploading-blockblob-and-setting-contenttype', //Your URL here
      UIValues: {
        cameraVideo: {
          sasURL:
            'https://msstorageblob.blob.core.windows.net/microsofttraficmgmt/a/05-28-2022/cam1.mp4?sp=r&st=2022-05-28T16:43:18Z&se=2022-10-28T00:43:18Z&sv=2020-08-04&sr=b&sig=%2BDSQOdLb809bo%2BFgRcWiJVdbeAOoCLhxJUenfpx%2BDg4%3D',
        },
      },
      initinalFormFill: {},
      formOption: {
        searchFind: true,
      },
      errors: {},

      initinalFormFill: {},
    };
    this.handelInit();
  }
  handelInit = () => {
    const { UIValues, formOption } = this.state;
    this.setState({ UIValues: UIValues });
  };

  AnalyseVideo = async (event) => {
    var video = {};
    var UIValues = await postApiWithoutReqAsyn('/Video/AIanalysis', event);
    if (UIValues) {
      this.handelMessage(
        'File is processing, Please wait for sometime then click refresh file show in process file section ',
        'legalBoll'
      );
    } else {
      this.handelMessage('File failed send to process!', 'legalBoll');
    }

    this.getAllVidoe();
  };

  EditVideo = async (event) => {
    this.setState({ item: event });
    this.handleModalClose();
  };

  DeleteVideo = async (event) => {
    var video = {};
    var UIValues = await postApiWithoutReqAsyn(
      '/Video/DeleteFileBlobAPI',
      event
    );
    await this.getAllVidoe();
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
    const { UIValues } = this.state;
    UIValues[name] = val;
    this.setState({
      [UIValues]: UIValues,
    });
  };
  handleSaveCalagouge = () => {
    alert('abc');
  };

  handleChangeGen2 = async (event) => {
    if (event.target.name == 'search') {
      if (event.target.value.length > 3) {
        let VideoDetails = {};
        VideoDetails.Remark = event.target.value;
        let find = { text: event.target.value };
        let result = await postApiWithoutReqAsyn(
          '/Video/GetVideoBySearch',
          VideoDetails
        );
        if (result.length > 0) {
          this.setState({ UIValues: result });
        } else {
          this.setState({ UIValues: {} });
          this.handelMessage('No record Found', 'errorBoll');
        }
      }
      // if (event.target.value=='') {
      //   await this.getAllVidoe();
      // }
    }
  };

  handleChangeGen = async (event) => {
    const { formOption } = this.state;
    formOption['name'] = event.target.name;
    formOption[event.target.name] = event.target.value;
    if (event.target.type === 'file') {
      formOption[event.target.name] = event.target.files[0];
      formOption['FileName'] = event.target.files;
      this.setState({
        [formOption]: formOption,
      });
    }

    // if (event.target.name == 'search') {
    //   if (event.target.value.length > 3) {
    //     let VideoDetails = {};
    //     VideoDetails.Remark = event.target.value;
    //     let find = { text: event.target.value };
    //     let result = await postApiWithoutReqAsyn(
    //       '/Video/GetVideoBySearch',
    //       VideoDetails
    //     );
    //     if (result.length>0) {
    //       this.setState({ UIValues: result });
    //     } else {
    //       this.handelMessage('No record Found', 'errorBoll');
    //     }
    //   }
    // }
  };

  iframeRefresh() {
    this.setState({ iframe_key: this.state.iframe_key + 1 });
  }
  async componentDidMount() {
    let initinalFormFill = await GetDropdown('/Camera/GetAllCameraDetails2');
    var video = {};
    var UIValues = await postApiWithoutReqAsyn('/Video/GetAllVideo', video);
    this.setState({ initinalFormFill: initinalFormFill, UIValues: UIValues });
  }
  async getAllVidoe() {
    var video = {};
    const { formOption } = this.state;
    var UIValues = await postApiWithoutReqAsyn('/Video/GetAllVideo', video);
    formOption['search'] = '';
    this.setState({ UIValues: UIValues, formOption: formOption });
  }

  handleModalClose = async () => {
    this.setState((prevState) => {
      let { show, item } = prevState;
      show = prevState.show === false ? true : false;
      if (show === false) {
        item = '';
      }
      return {
        show,
        item,
      };
    });
    await this.getAllVidoe();
  };

  render() {
    const { UIValues, formOption, errors, show } = this.state;
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

        <div className="refblock"></div>

        <div className="pagetitle">
          <Row style={{ marginTop: '20px' }}>
            <Col md={10}>
              <Row>
                <Col md={2}>
                  {formOption.searchFind && UIValues.length > 0
                    ? 'Library'
                    : 'Library'}
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      name="search"
                      value={formOption.search}
                      onChange={this.handleChangeGen2}
                      className="iconsearch form-control"
                      placeholder="Search"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Col>

            <Col md={1}>
              <InputGroup>
                <Button onClick={this.handleModalClose} className="">
                  Upload
                </Button>
              </InputGroup>
            </Col>
            <Col md={1}>
              <InputGroup>
                <Button onClick={this.getAllVidoe} className="">
                  Refresh
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </div>

        <div className="databox">
          {UIValues.length >= 0 ? (
            <>
              <div className="dbmenu">
                <div className="divheight">
                  <span className="pageSubtitle "> Unprocessed Videos</span>
                  <ul>
                    {UIValues &&
                      UIValues.filter(
                        (player) => player.analyse == 0 || player.analyse == 2
                      ).map((item, i) => (
                        <>
                          <li
                            style={{
                              width: '250px',
                              height: '330px',
                              marginTop: '25px',
                            }}
                          >
                            <div className="videobox">
                              <button
                                onClick={() => {
                                  this.EditVideo(item);
                                }}
                              >
                                <img src={`${editImg}`}></img>
                              </button>
                              <button
                                onClick={() => {
                                  this.DeleteVideo(item);
                                }}
                              >
                                <img src={`${deleteImg}`}></img>
                              </button>
                              <NavLink to={`/VideoShow/${item.videoId}`}>
                                <img
                                  src={`${item.videoImage}`}
                                  width="220.12"
                                  height="140.69"
                                ></img>
                              </NavLink>
                            </div>
                            <span
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginLeft: '4px',
                                marginTop: '10px',
                                fontSize: '18px',
                              }}
                            >
                              {item.name}
                            </span>

                            <span
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginLeft: '4px',
                                marginTop: '10px',
                                fontSize: '12px',
                                height: '50px',
                              }}
                            >
                              {item.remark.substring(0, 99)}
                            </span>
                            <span
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginLeft: '15px',
                                fontSize: '10px',
                              }}
                            >
                              {/* DATE:
                                {item.created_Date} */}
                            </span>
                            <div style={{ marginTop: '10px' }}>
                              {item.analyse == 0 ? (
                                <button
                                  onClick={() => {
                                    this.AnalyseVideo(item);
                                  }}
                                  className="background"
                                  style={{
                                    width: '100px',
                                    position: 'inherit',
                                  }}
                                >
                                  Analyse
                                </button>
                              ) : (
                                <button
                                  className="background"
                                  style={{
                                    width: '100px',
                                    position: 'inherit',
                                  }}
                                >
                                  Processing....
                                </button>
                              )}
                            </div>
                          </li>
                        </>
                      ))}
                  </ul>
                </div>

                <div style={{ clear: 'both' }}>
                  <span className="pageSubtitle"> Processed Videos</span>
                  <div className="divcss">
                    <ul>
                      {UIValues &&
                        UIValues.filter((player) => player.analyse == 1).map(
                          (item, i) => (
                            <>
                              <li
                                style={{
                                  width: '250px',
                                  height: '330px',
                                  marginTop: '25px',
                                }}
                              >
                                {/* <Col md={6}> */}
                                <div className="videobox">
                                  <button
                                    onClick={() => {
                                      this.EditVideo(item);
                                    }}
                                  >
                                    <img src={`${editImg}`}></img>
                                  </button>
                                  <button
                                    onClick={() => {
                                      this.DeleteVideo(item);
                                    }}
                                  >
                                    <img src={`${deleteImg}`}></img>
                                  </button>
                                  <NavLink to={`/VideoShow/${item.videoId}`}>
                                    <img
                                      src={`${item.videoImage}`}
                                      width="220.12"
                                      height="140.69"
                                    ></img>
                                  </NavLink>
                                </div>
                                {/* </Col> */}
                                <span
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginLeft: '4px',
                                    marginTop: '10px',
                                    fontSize: '18px',
                                  }}
                                >
                                  {item.name}
                                </span>

                                <span
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginLeft: '4px',
                                    marginTop: '10px',
                                    fontSize: '12px',
                                    height: '50px',
                                  }}
                                >
                                  {item.remark.substring(0, 99)}
                                </span>
                                <span
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginLeft: '15px',
                                    fontSize: '10px',
                                  }}
                                >
                                  {/* CR DATE:
                                  {item.created_Date} */}
                                </span>
                                <div>
                                  <NavLink
                                    to={`/VideoShowProcess/${item.videoId}`}
                                  >
                                    <button
                                      className="background"
                                      style={{
                                        width: '100px',
                                      }}
                                    >
                                      Details
                                    </button>
                                  </NavLink>
                                </div>
                              </li>
                            </>
                          )
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className="clr"></div>
        </div>
        <Modal
          backdrop="static"
          keyboard={false}
          id="addrecord"
          show={show}
          onHide={this.handleModalClose}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              id="loading"
              style={{ display: 'none', position: 'inherit', zIndex: '3' }}
            >
              <img alt="loading" src="./loading.gif" />
            </div>{' '}
            <UploadVideo
              handleModalClose={this.handleModalClose}
              item={this.state.item}
            ></UploadVideo>{' '}
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Library;
