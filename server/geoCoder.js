const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'here',

  // Optional depending on the providers
//   fetch: customFetchImplementation,
  apiKey: 'FZFUj2kqVxbsI4D1ojRa61UOgSRiw9Z8ol8fssqCg0k', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

// getCoordinates()

export const getCoordinates = async function (address) {
    let res = await geocoder.geocode(address);
    return res
}

export const getAddress = async function (lat, lng) {
    let res = await geocoder.reverse({ lat: lat, lon: lng })
    return res
}

