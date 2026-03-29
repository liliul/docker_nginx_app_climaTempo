const { BASE_OWM } = require("../config");

module.exports = function buildUrl(endpoint, params) {
  const url = new URL(`${BASE_OWM}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
};