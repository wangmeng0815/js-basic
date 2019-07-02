// 基本排序——插入排序: 类似于人们按数字或者字母顺序对数据进行排序，后面的要为前面的腾位置
var CArray = function(){
    this.dataStore = [8,1,3,2,9,5,4,7];
    this.insertSort = insertSort;
}

function insertSort(){
    var temp , inner;
    for(var outer = 1; outer< this.dataStore.length; outer++){
        temp = this.dataStore[outer];
        inner = outer;
        while(inner > 0 && (this.dataStore[inner - 1]> temp)){
            this.dataStore[inner] = this.dataStore[inner - 1];
            console.log('内部数据', this.dataStore);
            inner--;
        }
        console.log(temp, inner);
        this.dataStore[inner] = temp;
        console.log('数据', this.dataStore);
    }
}

var mynums = new CArray();
mynums.insertSort();
console.log(mynums.dataStore);     

// 外循环将数组挨个移动
// 内循环 是将外循环选中的元素以及后面的元素进行比较