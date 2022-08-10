import { APIList } from '../Store/APIList';

export let PageURL = {
  APIURL: {
    Get: APIList.GetUserDataByEmail,
    Logout: APIList.LogoutUser,
  },
};
