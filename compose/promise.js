const compose = (...arr) => {
    let init = arr.pop();
    return (...args) => {
        return arr.reverse().reduce((prev, cur) => {
            return prev.then(function(res){
                return cur.call(null, res)
            })
        }, Promise.resolve(init.apply(null, args)))
    }
}

conposeFunc(1, 2, 3).then(res => console.log(res))