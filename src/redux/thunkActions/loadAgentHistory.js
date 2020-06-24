import { API_URL } from '../../constants';
import axios from 'axios';
import Logout from '../../commonFunctions/logout';

const LoadAgentBookingsHistory = async (token, user_id = '') => {
  return await axios({
    method: 'GET',
    url: user_id === '' ? API_URL + '/get-agent-order-list' : API_URL + '/get-agent-order-list?user_id=' + user_id,
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

export default LoadAgentBookingsHistory;