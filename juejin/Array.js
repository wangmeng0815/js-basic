/**
 * 示例: 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 */
const sum = (arr, target) => {
    let res = [];
    let map = {};
    for (let i = 0, len = arr.length; i < len; i++) {
        if (map[target - arr[i]] != undefined) {
            return [map[target - arr[i]], i]
        }
        map[arr[i]] = i;
    }

    return res;
}

/**
 * 示例: 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6], n = 3
 * 输出: [1,2,2,3,5,6]
 */
const merge = (arr1, m, arr2, n) => {
    let i = m - 1, j = n - 1, k = m + n - 1;

    while(i >= 0 && j >=0){
        
        if(arr1[i] >= arr2[j]){
            arr1[k] = arr1[i];
            i--;
        } else {
            arr1[k] = arr2[j]
            j--;
        }
        k--;
    }
    while(j >= 0){
        arr1[k] = arr2[j];
        k--;
        j--;
    }
}



const threeSum = (arr, target) => {
    let res = [];
    
    for(let i = 0, len = arr.length; i < len - 2; i++){
        let m = i + 1, n = len - 1;
        
        if(i > 0 && arr[i] == arr[i - 1]){
            continue;
        }

        while( m < n ){
            if(arr[i] + arr[m] + arr[n] < target){
                m++;
                while(m < n && arr[m] == arr[m - 1]){
                    m++;
                }
            } else if(arr[i] + arr[m] + arr[n] > target){
                n--;
                while(m < n && arr[n] == arr[n + 1]){
                    n--;
                }
            } else {
                res.push([arr[i], arr[m], arr[n]]);
                m++;
                n--;
                while(m < n && arr[m] == arr[m - 1]){
                    m++;
                }
                while(m < n && arr[n] == arr[n + 1]){
                    n--;
                }
            }
        }

    }

    return res;
}