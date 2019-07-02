
// 二分查找

function bindSearch(arr, target){
    var upperBound = arr.length - 1;
    var lowerBound = 0;
    while(lowerBound <= upperBound){
        var mid = Math.floor( (upperBound + lowerBound)/2);

        if(arr[mid] < target){
            lowerBound = mid + 1;
        }else if(arr[mid] > target){
            upperBound = mid - 1;
        }else{
            return mid;
        }
    }
    return -1;
}

var arr= [23, 32, 56, 78, 100];
var result = bindSearch(arr, 100);
console.log(result);