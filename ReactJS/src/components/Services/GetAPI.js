import Cookies from 'universal-cookie';
const cookies = new Cookies();

let baseUrl = window.baseURL;

export let downloadURL = baseUrl;
//get API servicesnpm
export function getApi(type) {
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
    method: 'GET',
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

//get API services for download
export function getApiDown(type) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }

  return fetch(baseUrl + type, {
    headers: {
      UserID: UserID,
    },
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }
      return response;
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      throw error;
    });
}

//get API services with parameter
export function getApiParam(type, param) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type + param, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
      // 'Authorization': token
    },
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 401) {
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

//get API services for wav file
export function getWaveApi(type) {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'image/png',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.replace('/');
      }
      return response;
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      throw error;
    });
}

//get API servicest with body params
export function getApiBody(type, userInput) {
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
    method: 'GET',
    body: JSON.stringify(userInput),
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

export const getApiBodyWithoutReqAsyn = async (type, userInput) => {
  let UserID = '0';
  if (cookies.get('userID')) {
    UserID = cookies.get('userID');
  }

  loadingShow('block');
  return await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserID: UserID,
    },
    method: 'GET',
  })
    .then((response) => {
      loadingShow('none');
      if (response.status === 401) {
        window.location.replace('/');
      }
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
};

function loadingShow(hidden) {
  let loading = document.getElementById('loading');
  loading.style.display = hidden;
}

export const getAsyncPowerBi = async (type, token) => {
  loadingShow('block');
  let result = await fetch(type, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
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

export const getAsyncPowerBiToken = async (type, data) => {
  loadingShow('block');
  let result = await fetch(type, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: JSON.stringify(data),
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
