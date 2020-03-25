import axios from 'axios';

const SendNotification = (heading, content, buttons = [], data = {}, player_id = "") => {
  var message = { 
    app_id: "9cf8c27d-0a89-4e7d-bb2a-d24e8bfd03ab",
    headings: {"en": heading},
    // subtitle: {"en": "Chech to approve or cancel!"},
    contents: {"en": content},
    include_player_ids: [player_id],
    buttons: buttons,
    data: data
    // big_picture: "http://i.imgur.com/N8SN8ZS.png",
  };

  axios({
    method: 'POST',
    url: 'https://onesignal.com/api/v1/notifications',
    headers:{
      "Content-Type": "application/json; charset=utf-8"
    },
    data: message,
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}

export default SendNotification;