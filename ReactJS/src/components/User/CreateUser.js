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
  { name: 'True', value: 'true' },
  { name: 'False', value: 'false' },
];

class CreateUser extends CreateParent {
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
          USER_ID: this.props.match.params.id,
        };
        postApi(PageURL.APIURL.GetById, reqData).then((res) => {
          res.USERS[0].IS_ACTIVE =
            res.USERS[0].IS_ACTIVE === false ? 'false' : 'true';

          res.USERS[0].IS_INTERNAL =
            res.USERS[0].IS_INTERNAL === false ? 'false' : 'true';
          this.setState({
            UIValue: res.USERS[0],
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

    let req = [
      'USER_NAME',
      'EMAIL_ID',
      'GROUP_ID',
      'USER_ORGANIZATION',
      'USER_DEPARTMENT',
      'USER_DESIGNATION',
      'PHONE_NUMBER',
      'USER_ADDRESS',
      'IS_INTERNAL',
      'IS_ACTIVE',
    ];
    let validationResult = this.parenthandleValidation(req, UIValue);
    if (!validationResult.formIsValid) {
      return false;
    }

    let result = await postApiWithoutReqAsyn(APIPost, UIValue);
    if (result.Message === 'Success') {
      this.handelMessage('User added successfully!', 'legalBoll');
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
    const { formOption, initinalFormFill, MenuData } = this.state;

    const { UIValue, errors } = this.state;

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
                <Link to="/User">User</Link>
              </li>
              <li>
                →
                <span>
                  {this.props.match !== undefined &&
                  this.props.match !== '' &&
                  this.props.match.params.id !== '' &&
                  this.props.match.params.id !== undefined
                    ? 'Update User'
                    : 'Add User'}
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
            ? 'Update User'
            : 'Add User'}

          <Link to="/User" className="btnback">
            Back
          </Link>
          {MenuData &&
          MenuData.length > 0 &&
          MenuData[72].MENU_ID === 16010 &&
          MenuData[72].MENU_INDEX === 72 &&
          MenuData[72].EDIT_RIGHT === true ? (
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
                className={errors['USER_NAME'] ? 'errorshows' : 'errorshides'}
              >
                <Form.Label>{UILabel.USER_NAME}</Form.Label>

                <FormControl
                  name="USER_NAME"
                  value={UIValue.USER_NAME}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <InputGroup
                className={errors['EMAIL_ID'] ? 'errorshows' : 'errorshides'}
              >
                <InputGroup.Prepend>
                  <InputGroup.Text>{UILabel.EMAIL_ID}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  name="EMAIL_ID"
                  value={UIValue.EMAIL_ID}
                  onChange={this.handleChangeGen}
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Group
                className={errors['GROUP_ID'] ? 'errorshows' : 'errorshides'}
              >
                <Form.Label>{UILabel.GROUP_ID}</Form.Label>
                <SelectSearch
                  container="rowselect"
                  search
                  options={initinalFormFill.GROUPS}
                  select="test"
                  name="GROUP_ID"
                  onChange={(val) =>
                    this.handleSeachableDropdonw(val, 'GROUP_ID')
                  }
                  value={UIValue.GROUP_ID}
                  placeholder="Select..."
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group
                className={
                  errors['USER_ORGANIZATION'] ? 'errorshows' : 'errorshides'
                }
              >
                <Form.Label>{UILabel.USER_ORGANIZATION}</Form.Label>

                <FormControl
                  name="USER_ORGANIZATION"
                  value={UIValue.USER_ORGANIZATION}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group
                className={
                  errors['USER_DEPARTMENT'] ? 'errorshows' : 'errorshides'
                }
              >
                <Form.Label>{UILabel.USER_DEPARTMENT}</Form.Label>

                <FormControl
                  name="USER_DEPARTMENT"
                  value={UIValue.USER_DEPARTMENT}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group
                className={
                  errors['USER_DESIGNATION'] ? 'errorshows' : 'errorshides'
                }
              >
                <Form.Label>{UILabel.USER_DESIGNATION}</Form.Label>

                <FormControl
                  name="USER_DESIGNATION"
                  value={UIValue.USER_DESIGNATION}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group
                className={
                  errors['PHONE_NUMBER'] ? 'errorshows' : 'errorshides'
                }
              >
                <Form.Label>{UILabel.PHONE_NUMBER}</Form.Label>

                <FormControl
                  name="PHONE_NUMBER"
                  value={UIValue.PHONE_NUMBER}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group
                className={
                  errors['MOBILE_NUMBER'] ? 'errorshows' : 'errorshides'
                }
              >
                <Form.Label>{UILabel.MOBILE_NUMBER}</Form.Label>

                <FormControl
                  name="MOBILE_NUMBER"
                  value={UIValue.MOBILE_NUMBER}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group
                className={
                  errors['USER_ADDRESS'] ? 'errorshows' : 'errorshides'
                }
              >
                <Form.Label>{UILabel.USER_ADDRESS}</Form.Label>

                <FormControl
                  name="USER_ADDRESS"
                  value={UIValue.USER_ADDRESS}
                  onChange={this.handleChangeGen}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group
                className={errors['IS_INTERNAL'] ? 'errorshows' : 'errorshides'}
              >
                <Form.Label>{UILabel.IS_INTERNAL}</Form.Label>
                <SelectSearch
                  container="rowselect"
                  search
                  options={mmtdropdown}
                  select="test"
                  name="IS_INTERNAL"
                  onChange={(val) =>
                    this.handleSeachableDropdonw(val, 'IS_INTERNAL')
                  }
                  value={UIValue.IS_INTERNAL}
                  placeholder="Select..."
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group
                className={errors['IS_ACTIVE'] ? 'errorshows' : 'errorshides'}
              >
                <Form.Label>{UILabel.IS_ACTIVE}</Form.Label>
                <SelectSearch
                  container="rowselect"
                  search
                  options={mmtdropdown}
                  select="test"
                  name="IS_ACTIVE"
                  onChange={(val) =>
                    this.handleSeachableDropdonw(val, 'IS_ACTIVE')
                  }
                  value={UIValue.IS_ACTIVE}
                  placeholder="Select..."
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CreateUser;
