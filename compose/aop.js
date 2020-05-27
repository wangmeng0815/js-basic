Function.prototype.before = function(fn){
    const self = this;
    return function(...args){
        let result = fn.apply(null, args);
        return self.call(null, result)
    }
}

Function.prototype.after = function(fn) {
    const self = this;
    return function(...args) {
        let result = self.apply(null, args);
        return fn.call(null, result)
    }
}

const compose = function(...args) {
    let before = args.pop();
    let start = args.pop();

    if(args.length) {
        return args.reduce(function(f1, f2){
            return f1.after(f2)
        }, start.before(before))
    }

    return start.before(before)
}


let init = (...args) => args.reduce((ele1, ele2) => ele1 + ele2, 0)
let step2 = (val) => val + 2
let step3 = (val) => val + 3
let step4 = (val) => val + 4

let steps = [step4, step3, step2, init]

// let composeFunc = init.before(init).after(step2).after(step3).after(step4)
let composeFunc = compose(...steps)
console.log(composeFunc(1, 2, 3))
// 15

// for 循环
let jobs = [[1, 2, 3], [4, 5], [6, 7]]
jobs.forEach(ele => console.log(composeFunc(...ele)))
// 15 18 22

