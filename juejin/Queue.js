/**
 * 题目描述：使用栈实现队列的下列操作：
 * push(x) -- 将一个元素放入队列的尾部。
 * pop() -- 从队列首部移除元素。
 * peek() -- 返回队列首部的元素。
 * empty() -- 返回队列是否为空。
 */
function Queue(){
    this.inputs = [];
    this.output = []; 
}
Queue.prototype.push = function(val) {
    this.inputs.push(val);
    if(this.output.length === 0){
        while(this.inputs.length){
            this.output.push(this.inputs.pop());
        }
    }
}
Queue.prototype.pop = function(){
    if(this.output.length === 0){
        return;
    }
    
    let res = this.output.pop();
    if(this.output.length === 0 && this.inputs.length !== 0){
        while(this.inputs.length){
            this.output.push(this.inputs.pop());
        }
    }
    return res;
}
Queue.prototype.peek = function(){
    if(this.output.length == 0 && this.inputs.length != 0){
        while(this.inputs.length > 0) {
            this.output.push(this.inputs.pop());
        }
    }
    return this.output[this.output.length - 1]
}
Queue.prototype.empty = function() {
    if(this.inputs.length === 0 && this.output.length === 0) return true;
    return false;
}

let queue = new Queue();
queue.push(1);
queue.push(2);
console.log(queue.peek())   // 返回 1
console.log(queue.pop())    // 返回 1
console.log(queue.empty())  // 返回 false



/**
 * 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * 示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
 */
const maxFunc = (arr, n) => {
    const len = arr.length;
    let res = [];
    const deque = [];
    for(let i = 0; i < len; i++){

        while(deque.length && arr[deque[deque.length - 1]] < arr[i]){
            deque.pop();
        }
        deque.push(i);
        if(deque.length && deque[0] <= i - n){
            deque.shift();
        }

        if(i >= n - 1){
            res.push(arr[deque[0]]);
        }
    }

    return res;
}