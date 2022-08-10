import { APIList } from '../Store/APIList';

export let UILabel = {
  PAGE_HEADING: 'GROUP',
  GROUP_NAME: 'GROUP NAME',
};

export let PageURL = {
  Add: '/CreateGroup',
  Update: '/UpdateGroup/',
  Authorization: '/Authorization/',
  APIURL: {
    Get: APIList.GetGroupTableData,
    Delete: APIList.DeleteGroupData,
    Add: APIList.AddGroupData,
    GetById: APIList.GetGroupDataByID,
    Update: APIList.UpdateGroupData,
    AuthorizationDataByID: APIList.GetGroupAuthorizationDataByID,
    UpdateGroupAuthorizationData: APIList.UpdateGroupAuthorizationData,
  },
};

export let TableColoum = {
  GROUP_NAME: 'GROUP NAME',
};
