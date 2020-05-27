const validPalindrome = function(s){
    let len = s.length;
    let i = 0, j = len - 1;

    while(i < j && s[i] === s[j]){
        i++;
        j--;
    }
    console.log('i', i);
    console.log('j', j);
    if(isPalindrome(i+1, j)){
        console.log(312);
        return true
    }

    if(isPalindrome(i, j - 1)){
        return true;
    }

    function isPalindrome(st, ed){
        console.log('st', st)
        console.log('ed', ed)
        while(st < ed){
            if(s[st] !== s[ed]){
                return false;
            }
            st++;
            ed--;
        }
        return true;
    }

    return false;
}

const temp = 'abacdcba';

console.log(validPalindrome(temp));