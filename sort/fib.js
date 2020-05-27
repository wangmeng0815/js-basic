function recurFib(n){
    if(n < 2){
        return n;
    }else{
        return recurFib(n - 1) + recurFib(n - 2);
    }
}
console.log('递归算法', recurFib(10));

function dynFib(n){
    var val = [];
    for(var i = 0; i <= n; i++){
        val[i] = 0;
    }
    if( n == 0){
        return 0;
    }else if(n == 1 || n == 2){
        return 1;
    }else{
        val[1] = 1;
        val[2] = 1;
        for(var i = 3; i <= n; i++){
            val[i] = val[i-1] + val[i-2];
        }
        console.log(val);
        return val[n]
    }
}
console.log('动态规划', dynFib(10));

function iterFib(n){
    if(n > 0){
        var last = 1;
        var nextLast = 1;
        var result = 1;
        for(var i = 2; i < n; i++){
            result = last + nextLast;
            nextLast = last;
            last = result;
        }
        return result;
    }else{
        return 0;
    }
}
console.log('动态规划非数组', iterFib(10));