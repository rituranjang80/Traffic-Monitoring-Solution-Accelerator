import Moment from 'moment';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
//Rest API Env
let baseUrl = window.baseURL;
// post API services
export function postApiWithoutReq(type) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },

    method: 'POST',
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }
      return response;
    })
    .then((responseJson) => {
      return responseJson.json();
    })
    .catch((error) => {
      throw error;
    });
}

export const postApiWithoutReqAsyn = async (type, UserData) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  loadingShow('block');
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
    body: JSON.stringify(UserData),
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
export const postApiFileUploadWithoutReqAsyn = async (type, UserData) => {
  loadingShow('block');
  let result = await fetch(baseUrl + type, {
    /* headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },*/
    method: 'POST',
    body: UserData, // JSON.stringify(UserData)
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
function loadingShow(hidden) {
  let loading = document.getElementById('loading');
  loading.style.display = hidden;
}
// Post without body

export function postApi(type, UserData) {
  loadingShow('block');
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }

  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },

    method: 'POST',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
      if (response.status === 401) {
        loadingShow('none');
        window.location.replace('/');
      }
      loadingShow('none');
      return response;
    })
    .then((responseJson) => {
      loadingShow('none');

      return responseJson.json();
    })
    .catch((error) => {
      loadingShow('none');
      throw error;
    });
}

// post API services for delete object with null returen
export function deleteApi(type) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }
    })
    .then((responseJson) => {})
    .catch((error) => {
      throw error;
    });
  // });
}

//post API services delete with body
export function deleteApiBody(type, dataToPost) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'DELETE',
    body: JSON.stringify(dataToPost),
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }
    })
    .then((responseJson) => {})
    .catch((error) => {
      throw error;
    });
  // });
}

//post API services delete with json response
export function deleteApiOut(type, dataToPost) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'DELETE',
    body: JSON.stringify(dataToPost),
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }

      return response;
    })
    .then((responseJson) => {
      if (responseJson.status === 200) {
        return responseJson;
      } else {
        return responseJson.json();
      }
    })
    .catch((error) => {
      throw error;
    });
}
export function deleteApiOutRes(type, dataToPost) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'DELETE',
    body: JSON.stringify(dataToPost),
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }

      return response;
    })
    .then((responseJson) => {
      if (responseJson.status === 200) {
        return responseJson.json();
      } else {
        return responseJson.json();
      }
    })
    .catch((error) => {
      throw error;
    });
}
//PUT API services
export function putApi(type, UserData) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'PUT',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }

      return response;
    })
    .then((responseJson) => {})
    .catch((error) => {
      throw error;
    });
  // });
}

//PUT API services Response
export function putApiRes(type, UserData) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'PUT',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }

      return response;
    })
    .then((responseJson) => {
      if (responseJson.status === 200) {
        return responseJson;
      } else {
        return responseJson.json();
      }
    })
    .catch((error) => {
      throw error;
    });
  // });
}

//post API servicest without json Response
export function postApiLiteral(type, UserData) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'POST',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }
      return response;
    })
    .then((responseJson) => {
      if (responseJson.status === 200) {
        return responseJson;
      } else {
        return responseJson.json();
      }
    })
    .catch((error) => {
      throw error;
    });
}

export const getFormattedDate = (
  date,
  dateFormat = 'dd-MM-YYYY hh:mm:ss',
  toString = false
) => {
  if (date) {
    const formattedDate = Moment(date, dateFormat);
    return toString ? formattedDate.format(dateFormat) : formattedDate;
  }

  return '';
};
export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('/');
};

export const formatDateMMDDYY = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('/');
};
//export const spaceRegx ="^(\d|\w)+$";

export const postApiSearchAsyn = async (type, UserData) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
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
      error['APIResult'] = 0;
      if (error.TypeError) {
        error['Message'] = 'Internal server error (' + error.TypeError + ')';
      }
      return error;
    });
  return result;
};

export const postApiSearchAsynWLoader = async (type, UserData) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  loadingShow('block');
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
      if (response.status === 401) {
        loadingShow('none');
        //window.location.replace("/");
      }

      return response.json();
    })
    .then((data) => {
      data['APIResult'] = 1;
      return data;
    })
    .catch((error) => {
      error['APIResult'] = 0;
      loadingShow('none');
      if (error.TypeError) {
        error['Message'] = 'Internal server error (' + error.TypeError + ')';
      }
      return error;
    });
  loadingShow('none');
  return result;
};

// Without Loader to call

export const postApiNLoaderAsyn = async (type, UserData) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
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

export const postApiAsynBlob = async (type, UserData) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  // loadingShow('block');
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
      loadingShow('none');
      if (response.status === 401) {
      }
      return response.blob();
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

export const JSONToCSVConvertor = (JSONData, ShowLabel, name) => {
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  var CSV = '';
  if (ShowLabel) {
    let row = '';
    for (let index in arrData[0]) {
      row += index + ',';
    }

    row = row.slice(0, -1);

    CSV += row + '\r\n';
  }
  for (var i = 0; i < arrData.length; i++) {
    let row = '';
    for (let index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }
    row.slice(0, row.length - 1);
    CSV += row + '\r\n';
  }
  if (CSV === '') {
    return;
  }
  var fileName = name;
  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
  var link = document.createElement('a');
  link.href = uri;
  link.style = 'visibility:hidden';
  link.download = fileName + '.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const LoginPostAPI = async (UserData) => {
  let result = await fetch('https://login.microsoftonline.com', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
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

export const PostAPIWithoutBody = async (type) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  loadingShow('block');
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
  })
    .then((response) => {
      if (response.status === 401) {
        //window.location.replace("/");
      }
      loadingShow('none');
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

export const FilterData = [
  { id: 'CUSTODIAN', name: 'CUSTODIAN', selected: false },
  { id: 'LC_INVESTOR_ID', name: 'LC INVESTOR ID', selected: false },
  { id: 'LC_WORD', name: 'LC WORD', selected: false },
];

export const postApiAsynBlobWithoutReq = async (type) => {
  loadingShow('block');
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
  })
    .then((response) => {
      loadingShow('none');
      if (response.status === 401) {
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

export const postApiWithoutReqAsynNoLoader = async (type, UserData) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  //loadingShow('block');
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'POST',
    body: JSON.stringify(UserData),
  })
    .then((response) => {
      //loadingShow('none');
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
      //loadingShow('none');
      error['APIResult'] = 0;
      if (error.TypeError) {
        error['Message'] = 'Internal server error (' + error.TypeError + ')';
      }
      return error;
    });
  return result;
};

export const PostPowerBI = async (type, token) => {
  let result = await fetch(type, {
    headers: {
      authorization: token,
    },
    method: 'GET',
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

export const deleteAsync = async (type, UserData) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  loadingShow('block');
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'DELETE',
    body: JSON.stringify(UserData),
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

export const validationForSpecialchar = (e, type) => {
  if (type === 'desc') {
    let result = /[^a-z 0-9 A-Z\\,\\.\\;]/g;
    if (!result.test(e) && e.length <= 200) {
      return false;
    }
    return true;
  }
  if (type === 'num') {
    if (isNaN(e)) {
      return true;
    }
  } else {
    let result = /[^a-z 0-9 A-Z\\,\\.\\;]/g;
    if (!result.test(e) && isNaN(e) && e.length <= 50) {
      return false;
    }

    return true;
  }
};

export const checkEditRights = (MenuData, index, menuid, paramid) => {
  return (
    (MenuData[index].MENU_ID === menuid &&
      MenuData[index].MENU_INDEX === index &&
      MenuData[index].EDIT_RIGHT === true) ||
    (MenuData[index].MENU_ID === menuid &&
      MenuData[index].MENU_INDEX === index &&
      MenuData[3].ADD_RIGHT === true &&
      !paramid)
  );
};

export const checkAccessRights = (MenuData, index, menuid) => {
  return (
    MenuData[index].MENU_ID === menuid &&
    MenuData[index].MENU_INDEX === index &&
    MenuData[index].ACCESS_RIGHT === true
  );
};
export const checkAddRights = (MenuData, index, menuid) => {
  return (
    MenuData[index].MENU_ID === menuid &&
    MenuData[index].MENU_INDEX === index &&
    MenuData[index].ADD_RIGHT === true
  );
};

export const normalizeInput = (value) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (cvLength < 4) return currentValue;
  if (cvLength < 7)
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
  return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
    3,
    6
  )}-${currentValue.slice(6, 10)}`;
};
