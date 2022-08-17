const {Directions} = require("openrouteservice-js");

const DirectionsApi = new Directions({
    api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
});

const profiles = ["driving-car","wheelchair","cycling-electric","foot-walking"];

async function getDirections(coords,profile){
    const geojson = await DirectionsApi.calculate({
        coordinates: coords,
        profile: profile,
        extra_info: ["waytype", "steepness"],
        format: "geojson",
      });
    return geojson;
}

module.exports = {getDirections,profiles}