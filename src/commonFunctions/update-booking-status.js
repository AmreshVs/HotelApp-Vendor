import { API_URL } from '../constants/index';
import axios from 'axios';
import SnackbarMessage from '../redux/thunkActions/snackbarMessage';

const UpdateBookingStatus = async (data, token) => {
  await axios({
    url: API_URL + '/update-booking-status',
    method: 'POST',
    headers:{
      "Authorization" : token,
      "Content-Type": "application/json"
    },
    data: data
  })
  .then(function (response) {
    SnackbarMessage(response.data.message);
  })
  .catch(function (error) {
    SnackbarMessage(error.data.message);
  });
}

export default UpdateBookingStatus;