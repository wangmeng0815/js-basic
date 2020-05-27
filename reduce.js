Array.prototype.reduce2 = function (fn, init) {
    if (typeof fn !== 'function') {
        throw new TypeError('xxx');
    }

    initArr = this;
    arr = initArr.concat();
    if (init) arr.unshift(init);
    let index, newVal;
    while (arr.length > 1) {
        index = initArr.length - arr.length + 1;
        newVal = fn.call(null, arr[0], arr[1], index, initArr);

        arr.splice(0, 2, newVal)
    }

    return newVal
}


const reduceHelper = (fn, acc, idx, array) => {
    if (array.length === 0) return acc
    const [head, ...tail] = array
    idx++
    return reduceHelper(fn, fn(acc, head, idx, array), idx, tail)
}

Array.prototype.myReduce = function (cb, initialValue) {
    const array = this
    const [head, ...tail] = array
    const startIndex = initialValue ? -1 : 0

    return initialValue ? reduceHelper(cb, initialValue, startIndex, array) : reduceHelper(cb, head, startIndex, tail)
}



