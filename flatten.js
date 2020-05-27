function pushArray(result, array) {
    let index = -1, length = array.length, offset = result.length;
    
    while( ++index < length) {
        result[offset + index] = array[index];
    }
    return result;
}

function flatten(array, result){
    var index = -1, len = array.length;
    result || (result = []);

    while(++index < len){
        let value = array[index];
        if(Array.isArray(value)){
            pushArray(result, value);
        } else {
            result[result.length] = value;
        }
    }
    return result;
}


const deepFlatten = arr => arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? deepFlatten(cur) : cur), []);