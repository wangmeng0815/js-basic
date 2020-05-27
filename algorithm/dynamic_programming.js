/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 */
var maxSubArray = function(nums){
    let maxSum = (sum = nums[0]);

    for(let i = 1; i < nums.length; i++){
        sum = Math.max(sum, sum + nums[i]);
        maxSum = Math.max(sum, maxSum);
    }

    return maxSum;
}

/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */
var climbStairs = function(n){
    const dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for(let i = 2; i <= n; i++){
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]
}

/**
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
 * 注意：你不能在买入股票前卖出股票。
 */
var maxProfit = function(prices){
    let minprice = Number.MAX_SAFE_INTEGER;
    let max = 0;
    for(let i = 0; i < prices.length; i++){
        if(prices[i] < minprice){
            minprice = prices[i]
        } else {
            max = Math.max(max, prices[i] - minprice)
        }
    }

    return max;
}

/**
 * 
 */