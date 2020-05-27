
/**
 * 设计一个支持一下两种操作的数据结构
 * void addWord(word)
 * boolean search(word)
 * 示例: addWord('bad')
 * 示例: addWord('dad')
 * 示例: search('pad')
 * 示例: search('.ad')
 * 示例: search('b..')
 */

const WordDictionary = function(){
    // 初始化一个对象字面亮, 承担Map的角色
    this.words = {}
}

WordDictionary.prototype.addWord = function(word){
    if(this.words[word.length]){
        this.words[word.length].push(word)
    } else {
        this.words[word.length] = [word]
    }
}

WordDictionary.prototype.search = function(word){
    if(!this.words[word.length]){
        return false
    }

    const len = word.length;

    if(!word.includes('.')){
        return this.words[len].includes(word);
    }

    const reg = new RegExp(word);

    return this.words[len].some(item => {
        return reg.test(items)
    })
}