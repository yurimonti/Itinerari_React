//TODO:finire metodo per stampare insieme di valori
function printArray(array){
    let result = "";
    result = array[0] + "; ";
    for (let index = 1; index < array.length; index++) {
        const element = array[index];
        result =result+element+"; ";
    }
    /* array.forEach(element => {
        result =result+"; "+element;
    }); */
    return result;
}

function mToKmRounded(metres){
    let km = metres/1000;
    return km - km%0.001;
  }

module.exports = {printArray,mToKmRounded};