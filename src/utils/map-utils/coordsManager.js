function reverseLatLng(coords){
    let result = [];
    coords.forEach(c => {
        result.push(c);
    });
    result.forEach(r=> r.reverse());
    return result;
}

module.exports = {reverseLatLng}