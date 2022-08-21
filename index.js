// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});

fetchCoordsByIP("70.51.138.100", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked!', data);

});


//{ latitude: 43.5890452, longitude: -79.6441198 }
fetchISSFlyOverTimes({ latitude: 43.5890452, longitude: -79.6441198 }, (error, data) => {
  if (error) {
    console.log("Error occured:", error);
  }

  console.log("Next flyby: ", data);
});
