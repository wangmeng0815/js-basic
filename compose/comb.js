// const compose = function(...args) {
//   return args.reduce(function(f1, f2) {
//     return function(...arg) {
//       return f2.call(null, f1.apply(null, arg))
//     }
//   })
// }

//g(f(arg))

const _pipe = (f, g) => (...arg) => g.call(null, f.apply(null, arg))
const compose = (...args) => args.reverse().reduce(_pipe, args.shift())

let init = (...args) => args.reduce((ele1, ele2) => ele1 + ele2, 0)
// var step1 = (...args) => 1
let step2 = (val) => val + 2
let step3 = (val) => val + 3
let step4 = (val) => val + 4

let steps = [step4, step3, step2, init]

let composeFunc = compose(...steps)
console.log(composeFunc(1, 2, 3))
// 15

// for 循环
let jobs = [[1, 2, 3], [4, 5], [6, 7]]
jobs.forEach(ele => console.log(composeFunc(...ele)))
// 15 18 22

const compose = (...args) => args.reverse().reduce((prev, cur) => (...arg) => cur.call(null, prev.apply(null, arg)), args.shift())

function compose(){
    var fns = Array.prototype.slice.call(arguments);

    return function(initialArg){
        var res = initialArg;
        for(var i = fns.length - 1; i > -1; i--){
            res = fns[i](res)
        }
        return res;
    }
}
