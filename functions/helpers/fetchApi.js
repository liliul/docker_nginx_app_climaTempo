  module.exports = async function fetchApi(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`OWM status: ${response.status}`);
    return response.json();
  };