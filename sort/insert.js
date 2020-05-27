// 基本排序——插入排序: 类似于人们按数字或者字母顺序对数据进行排序，后面的要为前面的腾位置
function insertionSort(arr) {
    var len = arr.length;

    var preIndex, current;

    for(var i = 1; i < len; i++){
        preIndex = i - 1;
        current = arr[i];

        while(preIndex >= 0 && arr[preIndex] > current){

            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }

    return arr;
}

// 外循环将数组挨个移动
// 内循环 是将外循环选中的元素以及后面的元素进行比较