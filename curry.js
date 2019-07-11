const _ = require('lodash');

function square(n){
    return n*n;
}

var flow = function(funcs){
    var length = funcs.length;
    var index = length;

    return function(...args){
        var index = 0;
        var result = length ? funcs[index].apply(this, args) : args[0];

        while(++index < length){
            result = funcs[index].call(this, result)
        }
        return result;
    }
}

var addSquare = flow([_.add, square]);
console.log(addSquare(1, 2));