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

class CreateClients extends CreateParent {
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
    let APIPost = PageURL.APIURL.ClientUpdate;
    if (this.props.match.params.id) {
      APIPost = PageURL.APIURL.ClientUpdate;
    }
    let newUIVal = {
      USER_ID: UIValue.USER_ID,
      INVESTOR_ID: UIValue.INVESTOR_ID,
      POWERBI_URL: UIValue.POWER_BI_URL,
    };
    let req = ['USER_ID', 'INVESTOR_ID', 'POWERBI_URL'];
    let validationResult = this.parenthandleValidation(req, newUIVal);
    if (!validationResult.formIsValid) {
      return false;
    }

    let result = await postApiWithoutReqAsyn(APIPost, newUIVal);
    if (result.Message === 'Success') {
      this.handelMessage('Client added successfully!', 'legalBoll');
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
    let initinalFormFill = await GetDropdown(PageURL.APIURL.ClientDropdowns);
    this.setState({ initinalFormFill: initinalFormFill });
    this.getUpdate();
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
                <Link to="/User">Client</Link>
              </li>
              <li>
                →
                <span>
                  {this.props.match !== undefined &&
                  this.props.match !== '' &&
                  this.props.match.params.id !== '' &&
                  this.props.match.params.id !== undefined
                    ? 'Add Client'
                    : 'Add Client'}
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
            ? 'Add Client'
            : 'Add Client'}

          <Link
            to={'/Client/' + this.props.match.params.id}
            className="btnback"
          >
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
                className={errors['GROUP_ID'] ? 'errorshows' : 'errorshides'}
              >
                <Form.Label>{UILabel.INVESTOR_ID}</Form.Label>
                <SelectSearch
                  container="rowselect"
                  search
                  options={initinalFormFill.INVESTORS_ID}
                  select="test"
                  name="INVESTOR_ID"
                  onChange={(val) =>
                    this.handleSeachableDropdonw(val, 'INVESTOR_ID')
                  }
                  value={UIValue.INVESTOR_ID}
                  placeholder="Select..."
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group
                className={
                  errors['POWER_BI_URL'] ? 'errorshows' : 'errorshides'
                }
              >
                <Form.Label>{UILabel.POWER_BI_URL}</Form.Label>

                <FormControl
                  name="POWER_BI_URL"
                  value={UIValue.POWER_BI_URL}
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

export default CreateClients;
