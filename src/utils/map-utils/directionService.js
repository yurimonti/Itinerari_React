const {Directions} = require("openrouteservice-js");
const {reverseLatLng} = require("./coordsManager.js");

const DirectionsApi = new Directions({
    api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
});
//TODO:rivedere perche non funziona
async function getDirections(coords){
    const geojson = await DirectionsApi.calculate({
        coordinates: reverseLatLng(coords),
        profile: "driving-car",
        extra_info: ["waytype", "steepness"],
        format: "geojson",
      });
    return geojson;
}

module.exports = {getDirections}