function descartes(sku){
    if(sku.length < 2) return sku[0] || [];

    return [].reduce.call(sku, (prev, cur) => {
        let res = [];
        // console.log(prev)
        prev.forEach((c) => {
            cur.forEach(s => {
                let t = [].concat(Array.isArray(c) ? c: [c]);
                t.push(s);
                res.push(t)
            })
        })
        return res;
    })
}

// console.log(descartes([['A', 'B', 'C'], ['a', 'b', 'c'], [1, 2], [3, 5]]))

const mtx = [['A', 'B', 'C'], ['a', 'b', 'c'], [1, 2], [3, 5]]

function solution(mtx){
    const res = [];
    const path = [];
    bt(mtx, path, res, 0);
    return res;
}

function bt(matrix, path, res, level){
    if(path.length === matrix.length) res.push(path.join(``));
    else{
        for(let p of matrix[level]){
            path.push(p);
            bt(matrix, path, res, level + 1);
            path.pop();
        }
    }
}

console.log(solution(mtx))