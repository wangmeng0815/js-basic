// 冒泡排序: 最慢的排序算法之一，数值会像气泡一样从数组中的一端漂浮到另一端
var CArray = function(){
    this.dataStore = [10,8,3,2,9,4,5,7];
    this.swap = swap;
    this.bubbleSort = bubbleSort;
}

function swap(arr, index1, index2){
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function bubbleSort(){
    var data = this.dataStore;
    numElements = data.length;
    for(var outer = numElements - 1; outer>=1; outer--){
        
        for(var inner = 0; inner<outer; inner++){
            if(data[inner] > data[inner + 1]){
                this.swap(this.dataStore, inner, inner + 1);
            }
        }
    }
}

var mynums = new CArray();
mynums.bubbleSort(mynums);
console.log(mynums.dataStore);