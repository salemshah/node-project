const NodeGeocoder = require('node-geocoder')

const options = {
    provider: 'mapquest',
    //provider: process.env.GEOCODER_PROVIDER,
    // Optional depending on the providers
    httpAdapter: 'https',
    //apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    apiKey: '3O7FtnMIiWDcPozlQJJJWiw4QRg0931Y', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;