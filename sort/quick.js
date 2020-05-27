// 在列表中选择一个元素作为基准值，排序围绕这个基准值进行，将列表中小于基准值的放入数组底部 大于放顶部
function qsort(list){
    if(list.length == 0){
        return [];
    }

    var pivot = list[0];
    var lesser = [];
    var greater = [];

    for(var i = 1; i < list.length; i++){
        if(list[i] < pivot){
            lesser.push(list[i]);
        }else{
            greater.push(list[i]);
        }
    }

    return qsort(lesser).concat(pivot, qsort(greater));
}

var data = [44, 75, 23, 43, 55, 12, 64, 77, 33];
console.log(qsort(data));