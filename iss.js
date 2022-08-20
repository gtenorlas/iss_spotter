const request = require("request");


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request.get("https://api.ipify.org/?format=json", (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    return callback(error, JSON.parse(body).ip);

  });
};

const fetchCoordsByIP = (ip, callback) => {
  //get the latitude and longitude
  request.get("http://ipwho.is/" + ip, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const coordinates = {};
    const parsedBody = JSON.parse(body);

    //check if ip is invalid and unsuccessful
    //{"ip":"42","success":false,"message":"Invalid IP address"}
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    coordinates.latitude = parsedBody.latitude;
    coordinates.longitude = parsedBody.longitude;
    return callback(null, coordinates);

  });

};

module.exports = { fetchMyIP, fetchCoordsByIP };