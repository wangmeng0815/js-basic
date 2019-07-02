// 选择排序: 从数组的开头喀什， 将第一个元素和其他元素比较，最小的元素会被放到数组第一个位置，再从第二个位置继续。
var CArray = function(){
    this.dataStore = [1, 8, 3, 2, 9, 5, 4, 7];
    this.swap = swap;
    this.selectSort = selectSort;
}

function swap(arr, index1, index2){
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function selectSort(){
    var min ;
    for (var outer = 0;outer < this.dataStore.length - 1; outer++){
        min = outer;
        for(var inner = outer + 1; inner <=this.dataStore.length - 1; inner++){
            if(this.dataStore[inner] < this.dataStore[min]){
                min = inner;
            }
        }
        this.swap(this.dataStore, outer, min);
    }
}

var mynums = new CArray();
mynums.selectSort();
console.log(mynums.dataStore);