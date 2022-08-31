function printArray(array) {
  let result = "";
  result = array[0] + "; ";
  for (let index = 1; index < array.length; index++) {
    const element = array[index];
    result = result + element + "; ";
  }
  return result;
}

function mToKmRounded(metres) {
  let km = metres / 1000;
  return km - (km % 0.001);
}

function renderHours(hours){
    if(hours.length ===2) return hours[0]+" - "+hours[1];
    if(hours.length ===4) return hours[0]+" - "+hours[1]+" | "+hours[2]+" - "+hours[3];
    return "chiuso";
}


module.exports = { printArray, mToKmRounded,renderHours };
