const functions = require("firebase-functions");

exports.weather        = functions.https.onRequest(require("./routes/weather"));
exports.forecast       = functions.https.onRequest(require("./routes/forecast"));
exports.airPollution   = functions.https.onRequest(require("./routes/airPolluton"));
exports.weatherSearch  = functions.https.onRequest(require("./routes/weatherSearch"));
exports.forecastSearch = functions.https.onRequest(require("./routes/forecastSearch"));
