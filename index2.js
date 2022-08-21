// index2.js

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

/* fetchMyIP()
  .then(body => console.log(body)); 
  */

/* fetchMyIP()
  .then(fetchCoordsByIP)
  .then(body => console.log(body)); */

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));