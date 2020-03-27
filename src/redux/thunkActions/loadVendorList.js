import { API_URL } from '../../constants';
import axios from 'axios';
import Logout from '../../commonFunctions/logout';

const LoadVendorList = async (token) => {
  return await axios({
    method: 'GET',
    url: API_URL + '/get-agent-list',
    headers: {
      'Accept-Language': 'en',
      'Authorization': token
    }
  })
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response.data.message === 'Please Login to Continue') {
        Logout();
      }
      return error.response.data;
    });
}

export default LoadVendorList;