import Moment from 'moment';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
//Rest API Env
let baseUrl = 'http://192.168.150.247/PhalkonAPI/api';
//baseUrl = 'http://localhost:56488/api'; //'https://api.phalkons.com/api';
baseUrl = 'https://api.phalkons.com/api';
// post API services

function loadingShow(hidden) {
  let loading = document.getElementById('loading');
  loading.style.display = hidden;
}

export const getMenuData = async () => {
  let UserID = '0';
  var loginData = cookies.get('email') && cookies.get('email');
  let reqData = {
    EMAIL_ID: loginData && loginData,
  };
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  loadingShow('block');
  let result = await fetch(baseUrl + '/User/GetUserDataByEmail', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
    body: JSON.stringify(reqData),
  })
    .then((response) => {
      loadingShow('none');
      if (response.status === 401) {
        //window.location.replace("/");
      }
      return response.json();
    })
    .then((data) => {
      data['APIResult'] = 1;
      return data;
    })
    .catch((error) => {
      loadingShow('none');
      error['APIResult'] = 0;
      if (error.TypeError) {
        error['Message'] = 'Internal server error (' + error.TypeError + ')';
      }
      return error;
    });
  return result;
};

/*export const getMenuData = async () =>{
    let reqData = {
      EMAIL_ID: cookies.get('email'),
    };
    let result = await postApiWithoutReqAsyn('/User/GetUserDataByEmail', reqData);

   return result.GROUP_AUTHORIZATION
}*/

//getMenuData();
