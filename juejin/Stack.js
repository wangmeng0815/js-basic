/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 */
const leftToRight = {
    '(': ')',
    '[': ']',
    '{': '}'
}
const isValid = (str) => {
    if(!str){
        return true
    }

    const stack = [];
    const len = str.length;

    for(let i = 0; i < len; i++){
        const ch = str[i];

        if(ch === '(' || ch === '[' || ch === '{'){
            stack.push(leftToRight[ch])
        } else{
            if(!stack.length || stack.pop() !== ch){
                return false;
            }
        }
    }
    return !stack.length;
}

/**
 * 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 */
const dailyTemperatures = function(T){
    const len = T.length;
    const stack = [];
    const res = (new Array(len)).fill(0);
    for(let i = 0; i < len; i++){

        while(stack.legnth > 0 && T[i] > T[stack[stack.length - 1]]){
            const top = stack.pop();

            res[top] = i - top
        }

        stack.push(i);
    }

    return res;
}

/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 */
const MinStack = function(){
    this.stack = [];
    this.minStack = [];
}

MinStack.prototype.pop = () => {
    if(this.stack.pop() === this.minStack[this.minStack.length - 1]){
        this.minStack.pop();
    }
    
}
MinStack.prototype.push = (val) => {
    if(this.minStack[this.minStack.length - 1] > val){
        this.minStack.push(val)
    }
    this.stack.push(val)
}
MinStack.prototype.top = () => {
    return this.stack[this.stack.length - 1];
}
MinStack.prototype.getMin = () => {
    return this.minStack[this.minStack.length - 1]
}
