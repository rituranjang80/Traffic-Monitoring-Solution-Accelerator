import { postApiWithoutReqAsyn, formatDateMMDDYY } from '../Services/PostAPI';
import { getApiBodyWithoutReqAsyn } from '../Services/GetAPI';
import { APIList } from './APIList';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const GetDropdown = async (arg1, data) => {
  let result = {};
  result.result = 1;
  result.get = 0;
  var URL = '/Option/GetOptionDropdowndata';
  if (arg1) {
    URL = arg1;
  }

  await getApiBodyWithoutReqAsyn(URL, null).then((res) => {
    if (res.usStateList) {
      result.usStateList = res.usStateList.map((item) => ({
        name: item,
        value: item,
      }));
    }
    if (res.length > 0 && res[0].cameraIp) {
      result.cameraIp = res.map((item) => ({
        name: item.cameraIp,
        value: item.cameraIp,
      }));
    }

    if (result.get === 1) {
      //
      return getDropdowndata(result);
    }
  });
  return result;
};

export const GetDropdownpost = async (arg1, data, fillid) => {
  let result = {};
  result.result = 1;
  result.get = 0;
  var URL = '';
  if (arg1) {
    URL = APIList[arg1];
  }
  await postApiWithoutReqAsyn(arg1, data).then((res) => {
    if (fillid == 'city' && res.length > 0 && res[0].city) {
      result.city = res.map((item) => ({
        name: item.city,
        value: item.city,
      }));
    }
    if (fillid == 'CameraIp' && res.length > 0 && res[0].cameraIp) {
      result.CameraIp = res.map((item) => ({
        name: item.cameraIp,
        value: item.cameraId,
      }));
    }
  });
  return result;
};

let ArraytoObjectArray = (dropDownList) => {
  let result = [];
  for (var i = 0; i < dropDownList.length; i++) {
    let option = { value: dropDownList[i], name: dropDownList[i] };
    result.push(option);
  }

  return result;
};
let getDropdowndata = (initinalFormFill) => {
  //let dropDownList= ['STRATEGY','FUND','TRADER_ID','COUNTERPARTY','EUROCLEAR','CLEARING_AGENT','CUSTODIAN','CLEARING_AGENT','REPO_CURRENCY','BOOK', 'SOURCE_OF_PRICING','MAPPING_SECURITY,ADR','PRIMARY_FUND','MANAGER','CLASS','SERIES','PF_REPRESENTATIVE_SHARE','BENCHMARKF','BENCHMARK','COUNTRY','TYPE_OF_CREDIT','TYPE_OF_INVESTMENT','CREDIT_RATING','TYPE_OF_MARKET_RISK','CURRENCY','PARENT_CURRENCY','MNGMNT_FEE_CALC_PERIOD'];
  let CameraDetails = ['a', 'b', 'c'];

  //["MONTHLY";12;"QUARTERLY";4;"SEMI-ANNUALLY";2;"ANNUALLY";1;0;"NONE"]
  initinalFormFill['CameraDetails'] = ArraytoObjectArray(CameraDetails);

  return initinalFormFill;
};

export let datalist = {
  count: [
    {
      TABLE_COUNT: 34,
    },
  ],
};

export const SetRefDate = async (data) => {
  let resdata = {};
  var URL = '/ReferenceDate/SetReferenceDate';
  let reqObject = {
    REFERENCE_DATE: formatDateMMDDYY(data),
    USER_ID: cookies.get('USER_ID'),
    USER_NAME: cookies.get('USER_NAME'),
    JUSTIFICATION: 'Data Entry',
    PCID: '',
  };
  await postApiWithoutReqAsyn(URL, reqObject).then((res) => {
    resdata = res;
    var s = 0;
    if (res.usStateList) {
      res.usStateList = res.usStateList.map((item) => ({
        name: item.ISSUE_ID,
        value: item.ISSUE_ID,
      }));
    }
  });
  return resdata;
};
