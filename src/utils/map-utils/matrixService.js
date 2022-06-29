const { Matrix } = require("openrouteservice-js");
const { reverseLatLng } = require("./coordsManager");

const MatrixApi = new Matrix({
  api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
});

function getMatrix(coords, mode, sources, destinations) {
  return MatrixApi.calculate({
    locations: reverseLatLng(coords),
    profile: mode,
    sources: sources || ["all"],
    destinations: destinations || ["all"],
  });
}

module.exports = {getMatrix}
