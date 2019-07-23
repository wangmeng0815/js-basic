const _ = require('lodash');

function square(n){
    return n*n;
}

/**
 * flow函数又称为 compose函数 也是组合函数 是函数式编程的一种重要函数
 * 
 */

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