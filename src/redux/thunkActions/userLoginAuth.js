import { API_URL } from '../../constants';
import axios from 'axios';

const UserLoginAuth = async (data) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/vendor-login',
    data: data,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });

}

export default UserLoginAuth;