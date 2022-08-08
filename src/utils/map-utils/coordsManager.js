function reverseLatLng(coords){
    let result = [];
    coords.forEach(c => {
        result.push(c);
    });
    result.forEach(r=> r.reverse());
    return result;
}

function calculateCenter(coords){
    return [coords[1],coords[0]];
  }

module.exports = {reverseLatLng,calculateCenter}