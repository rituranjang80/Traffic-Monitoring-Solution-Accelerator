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
import './Group.css';
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
const cookies = new Cookies();
const mmtdropdown = [
  { name: 'True', value: '1' },
  { name: 'False', value: '0' },
];

class Authorization extends CreateParent {
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
      UIValue: [],
      initinalFormFill: {},
      errors: {},
      allchecked: false,
      GroupData: {},
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
        postApi(PageURL.APIURL.AuthorizationDataByID, reqData).then((res) => {
          this.setState({
            UIValue: res.GROUP_AUTHORIZATION,
            GroupData: res.GROUP[0],
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
  handleCheckALL = (e) => {
    const { checked } = e.target;
    this.setState((prevState) => {
      let { allchecked, UIValue } = prevState;
      allchecked = checked;
      UIValue = UIValue.map((item) => ({
        ...item,
        ACCESS_RIGHT: checked,
        ADD_RIGHT: checked,
        EDIT_RIGHT: checked,
        DELETE_RIGHT: checked,
      }));

      return { allchecked, UIValue };
    });
  };
  handleChange = (e, index) => {
    let { UIValue } = this.state;
    const { name, checked } = e.target;
    UIValue = [...UIValue];
    UIValue[index][name] = checked;

    this.setState({ UIValue });
  };

  handleAuthSave = async (type) => {
    const { UIValue } = this.state;
    let APIPost = PageURL.APIURL.UpdateGroupAuthorizationData;

    let newUIVal = {
      GROUP_ID: this.props.match.params.id,
      AUTHORIZATION: UIValue,
    };
    //let req = ['USER_ID', 'INVESTOR_ID', 'POWERBI_URL'];

    let result = await postApiWithoutReqAsyn(APIPost, newUIVal);
    if (result.Message === 'Success') {
      this.handelMessage('Authentication updated successfully!', 'legalBoll');
    } else {
      this.handelMessage(result.Message, 'errorBoll');
    }
  };

  async componentDidMount() {
    let initinalFormFill = await GetDropdown(PageURL.APIURL.Dropdowns);
    this.setState({ initinalFormFill: initinalFormFill });
    this.getUpdate();
  }

  render() {
    const { formOption, GroupData } = this.state;

    const { UIValue, errors, allchecked } = this.state;

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
                <Link to="/Group">Group-Auth</Link>
              </li>
              <li>
                →
                <span>
                  {this.props.match !== undefined &&
                  this.props.match !== '' &&
                  this.props.match.params.id !== '' &&
                  this.props.match.params.id !== undefined
                    ? 'Update Authorization'
                    : 'Update Authorization'}
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
            ? 'Update Authorization'
            : 'Update Authorization'}{' '}
          - Group : <span className="grpname">{GroupData.GROUP_NAME}</span>
          <Link to="/Group" className="btnback">
            Back
          </Link>
          <Button className="btnaddrecords" onClick={this.handleAuthSave}>
            Save
          </Button>
        </div>

        <div className="checkAll">
          <label for="all">
            <input
              id="all"
              type="checkbox"
              checked={allchecked}
              name="allchecked"
              onChange={(e) => this.handleCheckALL(e)}
            />{' '}
            Reset All
          </label>
        </div>
        <div className="securitiesTablegrids">
          <div className="listtopbar">
            <div className="action">NAME</div>
            <div className="action">VIEW</div>
            <div className="action">ADD</div>
            <div className="action">EDIT</div>
            <div className="action">DELETE</div>
          </div>

          <div className="listdata">
            {UIValue.map((item, i) => (
              <div className="securitiesTablegrid">
                <div
                  className={
                    item.IS_BASE === true
                      ? 'listtopbar black'
                      : item.IS_PARENT === true
                      ? 'listtopbar grey'
                      : 'listtopbar'
                  }
                >
                  <div className="action">{item.MENU_TEXT}</div>

                  <div className="action">
                    <input
                      type="checkbox"
                      checked={item.ACCESS_RIGHT}
                      name="ACCESS_RIGHT"
                      onChange={(e) => this.handleChange(e, i)}
                    />
                  </div>

                  <div className="action">
                    {item.IS_BASE !== true && item.IS_PARENT !== true ? (
                      <input
                        type="checkbox"
                        checked={item.ADD_RIGHT}
                        name="ADD_RIGHT"
                        onChange={(e) => this.handleChange(e, i)}
                      />
                    ) : null}
                  </div>

                  <div className="action">
                    {item.IS_BASE !== true && item.IS_PARENT !== true ? (
                      <input
                        type="checkbox"
                        checked={item.EDIT_RIGHT}
                        name="EDIT_RIGHT"
                        onChange={(e) => this.handleChange(e, i)}
                      />
                    ) : null}
                  </div>

                  <div className="action">
                    {item.IS_BASE !== true && item.IS_PARENT !== true ? (
                      <input
                        type="checkbox"
                        checked={item.DELETE_RIGHT}
                        name="DELETE_RIGHT"
                        onChange={(e) => this.handleChange(e, i)}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
            {/* <div>{JSON.stringify(UIValue)}</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Authorization;
