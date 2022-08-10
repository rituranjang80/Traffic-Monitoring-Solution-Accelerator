import { APIList } from '../Store/APIList';

export let UILabel = {
  CLIENT_HEADING: 'Clients',
  INVESTOR_ID: 'INVESTOR ID',
  POWER_BI_URL: 'POWER BI URL',

  PAGE_HEADING: 'Users',
  USER_NAME: 'NAME',
  EMAIL_ID: 'EMAIL ID',
  GROUP_ID: 'GROUP ID',
  IS_ACTIVE: 'IS ACTIVE',
  USER_ORGANIZATION: 'ORGANIZATION',
  USER_DEPARTMENT: 'DEPARTMENT',
  USER_DESIGNATION: 'DESIGNATION',
  PHONE_NUMBER: 'PHONE NUMBER',
  MOBILE_NUMBER: 'MOBILE NUMBER',
  USER_ADDRESS: 'ADDRESS',
  IS_INTERNAL: 'IS INTERNAL',
};

export let PageURL = {
  Add: '/CreateUsers',
  Update: '/UpdateUsers/',
  AddClients: '/Client/',
  CreateClient: '/CreateClients/',
  APIURL: {
    Get: APIList.GetUserTableData,
    GetClient: APIList.GetUserClientTableData,
    Delete: APIList.DeleteUserData,
    Add: APIList.AddUserData,
    GetById: APIList.GetUserDataByID,
    Update: APIList.UpdateUserData,
    Dropdowns: APIList.GetUserDropdowndata,
    ClientDropdowns: APIList.GetClientDropdownData,
    ClientUpdate: APIList.AddUserClientData,
    DeleteClientData: APIList.DeleteClientData,
  },
};

export let TableColoum = {
  USER_NAME: 'NAME',
  EMAIL_ID: 'EMAIL ID',
  GROUP_NAME: 'GROUP NAME',
  IS_ACTIVE: 'IS ACTIVE',
};

export let ClientTableColoum = {
  INVESTOR_ID: 'INVESTOR ID',
  POWER_BI_URL: 'POWER BI URL',
};
