let globalJob = {};

function setJoi(joi) {
  globalJob = joi;
}

function getJoi() {
  return globalJob;
}

module.exports = {
  set: setJoi,
  get: getJoi,
};
