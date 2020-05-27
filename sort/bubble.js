// 冒泡排序: 最慢的排序算法之一，数值会像气泡一样从数组中的一端漂浮到另一端

function bubbleSort(arr){
    var len  = arr.length;
    for(var i = 0; i < len; i++){

        for(var j = 0; j < len - i - 1; j++){
            if(arr[j] > arr[j+1]){
                var temp = arr[j+1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

bubbleSort([10,8,3,2,9,4,5,7])