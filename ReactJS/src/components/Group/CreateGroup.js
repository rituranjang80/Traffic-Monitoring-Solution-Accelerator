import React from 'react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import {
  postApi,
  postApiWithoutReqAsyn,
  formatDateMMDDYY,
} from '../Services/PostAPI';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { UILabel, PageURL } from './typeofassests';
import { GetDropdown, SetRefDate } from '../Store/GetDropdown';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import { getMenuData } from '../Services/MenuAccess';
const cookies = new Cookies();
const mmtdropdown = [
  { name: 'True', value: '1' },
  { name: 'False', value: '0' },
];

class CreateGroup extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      errorBoll: false,
      legalBoll: false,
      errorMessage: '',
      successMessage: '',
      CRRDATE: new Date(),
      MaturityDate: new Date(),
      formOption: {},
      UIValue: {},
      initinalFormFill: {},
      errors: {},
    };
  }

  getUpdate = () => {
    let reqData = {};

    if (this.props.match !== undefined && this.props.match !== '') {
      if (
        this.props.match.params.id !== '' &&
        this.props.match.params.id !== undefined
      ) {
        reqData = {
          GROUP_ID: this.props.match.params.id,
        };
        postApi(PageURL.APIURL.GetById, reqData).then((res) => {
          this.setState({
            UIValue: res.GROUPS[0],
          });
        });
      }
    }
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
  handleAddUpdate = async () => {
    const { UIValue } = this.state;
    let APIPost = PageURL.APIURL.Add;
    if (this.props.match.params.id) {
      APIPost = PageURL.APIURL.Update;
    }

    let req = ['GROUP_NAME'];
    let validationResult = this.parenthandleValidation(req, UIValue);
    if (!validationResult.formIsValid) {
      return false;
    }

    let result = await postApiWithoutReqAsyn(APIPost, UIValue);
    if (result.Message === 'Success') {
      this.handelMessage('Group added successfully!', 'legalBoll');
    } else {
      this.handelMessage(result.Message, 'errorBoll');
    }
  };

  handleSeachableDropdonw = (val, name) => {
    const { UIValue } = this.state;
    UIValue[name] = val;
    this.setState({
      [UIValue]: UIValue,
    });
  };

  handleChangeGen = (event) => {
    const { UIValue } = this.state;
    UIValue[event.target.name] = event.target.value;
    this.setState({
      [UIValue]: UIValue,
    });
  };

  handleDate = (date, name) => {
    const { UIValue } = this.state;
    UIValue[name] = date;
    this.setState({
      [UIValue]: UIValue,
    });
  };

  handleDateSelect = (e) => {};
  getDataMenu = async () => {
    let res = await getMenuData();
    this.setState({
      MenuData: res.GROUP_AUTHORIZATION,
    });
  };
  async componentDidMount() {
    let initinalFormFill = await GetDropdown(PageURL.APIURL.Dropdowns);
    this.setState({ initinalFormFill: initinalFormFill });
    await this.getUpdate();
    await this.getDataMenu();
  }

  render() {
    const { formOption, initinalFormFill } = this.state;

    const { UIValue, errors, MenuData } = this.state;

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
          <div className="menublock">
            <ul>
              <li>
                <Link to="/Group">Group</Link>
              </li>
              <li>
                →
                <span>
                  {this.props.match !== undefined &&
                  this.props.match !== '' &&
                  this.props.match.params.id !== '' &&
                  this.props.match.params.id !== undefined
                    ? 'Update Group'
                    : 'Add Group'}
                </span>
              </li>
            </ul>
          </div>

          <div className="clr"></div>
        </div>
        <div className="refblock"></div>

        <div className="pagetitle">
          {this.props.match !== undefined &&
          this.props.match !== '' &&
          this.props.match.params.id !== '' &&
          this.props.match.params.id !== undefined
            ? 'Update Group'
            : 'Add Group'}

          <Link to="/Group" className="btnback">
            Back
          </Link>
          {MenuData &&
          MenuData.length > 0 &&
          MenuData[73].MENU_ID === 16020 &&
          MenuData[73].MENU_INDEX === 73 &&
          MenuData[73].EDIT_RIGHT === true ? (
            <Button onClick={this.handleAddUpdate} className="btnaddrecords">
              Save
            </Button>
          ) : (
            <Button className="btnaddrecords disabled">Save</Button>
          )}
        </div>

        <div className="databox">
          <Row>
            <Col md={3}>
              <Form.Group
                className={errors['GROUP_NAME'] ? 'errorshows' : 'errorshides'}
              >
                <Form.Label>{UILabel.GROUP_NAME}</Form.Label>

                <FormControl
                  name="GROUP_NAME"
                  value={UIValue.GROUP_NAME}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
