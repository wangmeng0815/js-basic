
const compose = function (...args) {
    let length = args.length
    let count = length - 1
    let result
    return function f1(...arg1) {
        result = args[count].apply(this, arg1)
        if (count <= 0) {
            count = length - 1
            return result
        }
        count--
        return f1.call(null, result)
    }
}

let init = (...args) => args.reduce((ele1, ele2) => ele1 + ele2, 0)
let step2 = (val) => val + 2
let step3 = (val) => val + 3
let step4 = (val) => val + 4
let steps = [step4, step3, step2, init]
let composeFunc = compose(...steps)

console.log(composeFunc(1, 2, 3))