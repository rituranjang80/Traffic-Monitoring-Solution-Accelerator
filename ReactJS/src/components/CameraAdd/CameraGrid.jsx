import React from 'react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import './CameraAdd.css';
import {
  Button,
  Col,
  Form,
  Row,
  Modal,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import { formatDateMMDDYY, postApiWithoutReqAsyn } from '../Services/PostAPI';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

const cookies = new Cookies();
let istSearchList = '';
class CameraGrid extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      typeofassets: 'CameraGrid ',
      typeofassetsdisplay: 'CameraGrid',
      errorBoll: false,
      legalBoll: false,
      errorMessage: '',
      successMessage: '',
      Data: [],
      PageNumber: 1,
      PageSize: 10,
      pageCount: 0,
      deleteModal: false,
      itemtodelete: '',
      search: '',
      MenuData: [],
    };
  }

  handleChange = (val, name) => {
    this.setState((prevState) => {
      let { typeofassets, typeofassetsdisplay } = prevState;
      typeofassets = val;
      typeofassetsdisplay = name.name;

      return { typeofassets, typeofassetsdisplay };
    });
  };
  getCameraGrid = async () => {
    const { PageNumber, PageSize } = this.state;
    let reqData = {
      PAGE_NUMBER: PageNumber,
      PAGE_SIZE: PageSize,
    };
    let APIPost = '/Camera/GetAllCameraDetails';

    let result = await postApiWithoutReqAsyn(APIPost, reqData);
    this.setState({ Data: result });
  };
  async componentDidMount() {
    this.getCameraGrid();
  }

  render() {
    const { Data, search, PageNumber, PageSize, deleteModal } = this.state;
    const {
      legalBoll,
      pageCount,
      errorBoll,
      errorMessage,
      successMessage,
      MenuData,
    } = this.state;
    return (
      <div>
        <SnackbarError errorBoll={errorBoll} errorMessage={errorMessage} />

        <SnackbarSuccess
          legalBoll={legalBoll}
          successMessage={successMessage}
        />
        {/*<div className="pagetitle">Camera Grid</div> */}

        <table className="table-data">
          <tbody className="">
            <tr className="">
              <th className="other">Camera Name</th>

              <th className="other" style={{ width: '400px' }}>
                Stream Endpoint
              </th>
              <th className="other">State</th>
              <th className="other">City</th>
              <th className="other" style={{ width: '100px' }}>
                Latitude
              </th>
              <th className="other" style={{ width: '100px' }}>
                Longitude
              </th>
              <th className="other"></th>
            </tr>

            {Data.map((item) => (
              <tr className="" key={item.cameraId}>
                <td className="other">{item.cameraIp}</td>
                <td className="other" style={{ wordBreak: 'break-word' }}>
                  {item.iP_Address}
                </td>
                <td className="other">{item.state}</td>
                <td className="other" style={{}}>
                  {item.city}
                </td>
                <td className="other" style={{}}>
                  {item.latitude}
                </td>
                <td className="other" style={{}}>
                  {item.longitude}
                </td>

                <td className="action" style={{}}>
                  <div className="edit">
                    <Link to={{ pathname: `/UpdateCamera/${item.cameraId}` }}>
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {/* <div className="paginationData">
              <div className="leftpage">
                <div className="showing">
                  <span>Showing: </span>
                  {PageSize * PageNumber + 1 - PageSize} -
                  {PageSize > istSearchList
                    ? istSearchList
                    : PageSize * PageNumber > istSearchList
                    ? istSearchList
                    : PageSize * PageNumber}{' '}
                  <span> of</span> {istSearchList} <span>Currency</span>{' '}
                </div>

                <div className="rowperpage">
                  <Form.Group>
                    <Form.Label>Items per page:</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.handleResultperpage}
                      name="PageSize"
                      value={PageSize}
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
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />

              <div className="clr"></div>
            </div> */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CameraGrid;
