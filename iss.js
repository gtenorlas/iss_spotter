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
    if (error) {
      console.log(error);
      return callback(error, null);
    }
    console.log(body);
    return callback(error, JSON.parse(body).ip);

  });
};

module.exports = { fetchMyIP };