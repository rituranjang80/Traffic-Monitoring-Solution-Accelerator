import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import './User.css';
import {
  postApiSearchAsyn,
  postApiWithoutReqAsyn,
  deleteApiOut,
} from '../Services/PostAPI';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import ReactPaginate from 'react-paginate';
import {
  UILabel,
  TableColoum,
  ClientTableColoum,
  PageURL,
} from './typeofassests';
import { APIList } from '../Store/APIList';
import { getMenuData } from '../Services/MenuAccess';

let istSearchList = '';
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOption: {},
      Data: [],
      deleteModal: false,
      search: '',
      mode: 0,
    };
    this.handelInit();
  }

  handelInit = () => {
    const { formOption } = this.state;
    formOption.currentDate = new Date();
    formOption.errorBoll = false;
    formOption.legalBoll = false;
    formOption.Message = '';
    formOption.show = false;

    formOption.PageNumber = 1;
    formOption.PageSize = 10;
    formOption.pageCount = 0;
    formOption.USER_ID = 0;
    this.setState({ formOption: formOption });
  };
  getSearch = async (event) => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({
      [fieldName]: fleldVal,
    });

    const { formOption } = this.state;
    let reqData = {
      PAGE_NUMBER: formOption.PageNumber,
      PAGE_SIZE: formOption.PageSize,
      ISSUE_ID: fleldVal,
    };
    if (fleldVal.trim()) {
      let res = await postApiSearchAsyn(APIList.SearchAPI, reqData);
      if (res.COUNT) {
        istSearchList = res.COUNT[0].TABLE_COUNT;
        formOption.pageCount = istSearchList / formOption.PageSize;
        this.setState({
          Data: res.INVESTORS,
          formOption: formOption,
        });
      }
    }
  };

  //async handleResultperpage =event => {
  handleResultperpage = async (event) => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    const { formOption } = this.state;
    let isLast = Math.ceil(istSearchList / fleldVal);
    if (formOption.PageNumber > isLast) {
      this.setState((prevState) => {
        let { formOption } = prevState;
        formOption.PageNumber = isLast;
        return { formOption };
      });
    }
    formOption[fieldName] = fleldVal;

    this.setState(
      {
        formOption: formOption,
      },
      async () => {
        await this.getData();
      }
    );
  };

  handlePageClick = async (data) => {
    const { formOption } = this.state;
    formOption.PageNumber = data.selected + 1;
    this.setState({ formOption: formOption }, async () => {
      await this.getData();
    });
  };
  handleChangeGen = (event) => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({
      [fieldName]: fleldVal,
    });
  };
  handleChange = (val, name) => {
    this.setState((prevState) => {
      let { typeofassets, typeofassetsdisplay } = prevState;
      typeofassets = val;
      typeofassetsdisplay = name.name;
      return { typeofassets, typeofassetsdisplay };
    });
  };

  //async getOptions =() =>{
  getData = async () => {
    const { formOption } = this.state;
    let reqData = {
      PAGE_NUMBER: formOption.PageNumber,
      PAGE_SIZE: formOption.PageSize,
    };

    let res = await postApiWithoutReqAsyn(PageURL.APIURL.Get, reqData);
    istSearchList = res.COUNT[0].TABLE_COUNT;
    formOption.pageCount = istSearchList / formOption.PageSize;
    this.setState({
      Data: res.USERS,
      formOption: formOption,
    });
  };

  getClienData = async () => {
    const { formOption } = this.state;
    let reqData = {
      USER_ID: formOption.USER_ID,
    };

    let ClientRes = await postApiWithoutReqAsyn(
      PageURL.APIURL.GetClient,
      reqData
    );
    // istSearchList = res.COUNT[0].TABLE_COUNT;
    //formOption.pageCount = istSearchList / formOption.PageSize;
    this.setState({
      clientData: ClientRes.USERS,
      // formOption: formOption,
    });
  };

  handleDeleteModal = (id) => {
    this.setState((prevState) => {
      let { deleteModal, itemtodelete } = prevState;
      deleteModal = prevState.deleteModal === false ? true : false;
      itemtodelete = id;
      return { deleteModal, itemtodelete };
    });
  };
  handleRecordDelete = () => {
    let { itemtodelete } = this.state;
    let reqData = {
      USER_ID: itemtodelete,
    };

    deleteApiOut(PageURL.APIURL.Delete, reqData).then((res) => {
      if (res.status === 200) {
        this.setState(
          {
            legalBoll: true,
            successMessage: 'Record deleted successfully',
          },
          function () {
            this.handleDeleteModal();
            setTimeout(
              function () {
                this.setState({
                  legalBoll: false,
                });
              }.bind(this),
              3000
            );
          }
        );
        this.getData();
      }
    });
  };
  getDataMenu = async () => {
    let res = await getMenuData();
    this.setState({
      MenuData: res.GROUP_AUTHORIZATION,
    });
  };
  async componentDidMount() {
    await this.getData();
    await this.getDataMenu();
  }

  getValues(TableColoum) {
    let arr = [];
    arr = Object.keys(TableColoum).map((key) => (
      <div key={TableColoum[key]} className="other">
        {TableColoum[key]}
      </div>
    ));
    return arr;
  }

  render() {
    const { Data, search, deleteModal, clientData, formOption } = this.state;
    const { errorMessage, successMessage, MenuData } = this.state;
    return (
      <div>
        <SnackbarError
          errorBoll={formOption.errorBoll}
          errorMessage={errorMessage}
        />
        <SnackbarSuccess
          legalBoll={formOption.legalBoll}
          successMessage={successMessage}
        />
        <div className="pagetitle">{UILabel.PAGE_HEADING}</div>
        <div className="databox">
          <h2>
            {MenuData &&
            MenuData.length > 0 &&
            MenuData[72].MENU_ID === 16010 &&
            MenuData[72].MENU_INDEX === 72 &&
            MenuData[72].EDIT_RIGHT === true ? (
              <Link to={PageURL.Add} className="btnaddrecords">
                ADD RECORDS
              </Link>
            ) : (
              <Link to="#" className="btnaddrecords disabled">
                ADD RECORDS
              </Link>
            )}
          </h2>

          <div className="securitiesTablegrid">
            <div className="listtopbar">
              {this.getValues(TableColoum)}
              <div className="action">Action</div>
            </div>
            {Data.map((item) => (
              <div className="listdata" key={item.ID}>
                {Object.keys(TableColoum).map((key) => (
                  <div className="other">
                    {key === 'IS_ACTIVE'
                      ? item[key] === true
                        ? 'True'
                        : 'False'
                      : item[key]}
                  </div>
                ))}

                <div className="action">
                  <div className="edit">
                    <Link to={{ pathname: PageURL.Update + item.USER_ID }}>
                      Edit
                    </Link>
                  </div>

                  <div className="Authorization">
                    <Link to={{ pathname: PageURL.AddClients + item.USER_ID }}>
                      Clients
                    </Link>
                  </div>
                  {MenuData &&
                  MenuData.length > 0 &&
                  MenuData[72].MENU_ID === 16010 &&
                  MenuData[72].MENU_INDEX === 72 &&
                  MenuData[72].DELETE_RIGHT === true ? (
                    <div
                      className="delete"
                      onClick={() => this.handleDeleteModal(item.USER_ID)}
                    >
                      Delete
                    </div>
                  ) : (
                    <div className="delete disabled">Delete</div>
                  )}
                </div>
              </div>
            ))}

            <div className="paginationData">
              <div className="leftpage">
                <div className="showing">
                  <span>Showing: </span>
                  {formOption.PageSize * formOption.PageNumber +
                    1 -
                    formOption.PageSize}{' '}
                  -
                  {formOption.PageSize > istSearchList
                    ? istSearchList
                    : formOption.PageSize * formOption.PageNumber >
                      istSearchList
                    ? istSearchList
                    : formOption.PageSize * formOption.PageNumber}{' '}
                  <span> of</span> {istSearchList} <span>Records</span>{' '}
                </div>

                <div className="rowperpage">
                  <Form.Group>
                    <Form.Label>Items per page:</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.handleResultperpage}
                      name="PageSize"
                      value={formOption.PageSize}
                    >
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>50</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>

              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={formOption.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />

              <div className="clr"></div>
            </div>
          </div>
        </div>

        <Modal
          backdrop="static"
          keyboard={false}
          id="deleteRecord"
          show={deleteModal}
          onHide={this.handleDeleteModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Delete - </span> Are you sure?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You are about to delete the saved record .<br />
              This cannot be undone.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleRecordDelete}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Users;
