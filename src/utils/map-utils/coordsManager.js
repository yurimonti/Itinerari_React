function reverseLatLng(coords){
    let toTurn = [...coords];
    let result = [];
    toTurn.forEach(c => {
        result.push(c);
    });
    result.forEach(r=> r.reverse());
    return result;
}

function calculateCenter(coords){
    return [coords[1],coords[0]];
  }

module.exports = {reverseLatLng,calculateCenter}