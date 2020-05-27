const curry = (fn, arr = []) => {
    return (...args) => {
        return (a => a.length === fn.length ? fn(...a) : curry(fn, a))([...arr, ...args])
    }
}


const curry2 = (fn, arr = []) => {
    return (...args) => {
        return ((a, b) => b.length === 0 ? fn(...a) : curry2(fn, a))([...arr, ...args], [...args])
    }
}