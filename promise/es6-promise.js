const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const isFunction = variable => typeof variable === 'function';
class Promise {
    constructor(fn) {

        this._status = PENDING;
        this._value = null;
        this._fulfilledQueue = [];
        this._rejectedQueue = [];

        try {
            fn(this._resolve.bind(this), this._reject.bind(this));
        } catch (e) {
            this._reject(e)
        }
    }
    _resolve(val) {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        const runFulfilled = (value) => {
            let cb;
            while (cb = this._fulfilledQueue.shift()) {
                cb(value)
            }
        }
        const runRejected = err => {
            let cb;
            while (cb = this._rejectedQueue.shift()) {
                cb(err)
            }
        }
        if (val instanceof Promise) {
            val.then(value => {
                this._value = value;
                runFulfilled(value);
            }, error => {
                this._value = error;
                runRejected(error)
            })
        } else {
            this._value = val;
            runFulfilled(val);
        }
    }
    _reject(error) {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = error;

        let cb;
        while (cb = this._rejectedQueue.shift()) {
            cb(error)
        }
    }
    then(onFulfilled, onRejected) {
        return new Promise((onFulfilledNext, onRejectedNext) => {
            let fulfilled = value => {
                process.nextTick(() => {
                    try {
                        let res = onFulfilled(value);
                        if (res instanceof Promise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    } catch (e) {
                        onRejectedNext(e);
                    }
                })
            }
            let rejected = error => {
                process.nextTick(() => {
                    try {
                        let res = onRejected(error);
                        if (res instanceof Promise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    } catch (e) {
                        onRejectedNext(e);
                    }
                })
            }

            if (this._status === PENDING) {
                this._fulfilledQueue.push(fulfilled)
                this._rejectedQueue.push(rejected)
            } else if (this._status === FULFILLED) {
                fulfilled(this._value);
            } else {
                rejected(this._value);
            }
        });
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    finally(cb) {
        return this.then(
            value => Promise.resolve(cb()).then(() => value),
            reason => Promise.resolve(cb()).then(() => reason)
        )
    }
    static resolve(value) {
        return value instanceof Promise || (value && isFunction(value.then)) ? value : new Promise(resolve => resolve(value))
    }
    static reject(value) {
        return new Promise((resolve, reject) => reject(value))
    }
    static race(list) {
        return new Promise((resolve, reject) => {
            for (let p of list) {
                this.resolve(p).then(res => {
                    resolve(res);
                }, reject)
            }
        })
    }
    static all(list) {
        return new Promise((resolve, reject) => {
            let results = [], count = list.length;

            for (let i in list) {
                this.resolve(list[i]).then(res => {
                    results[i] = res;
                    --count < 1 && resolve(results);
                }, reject)
            }
        })
    }
}


new Promise(resolve => {
    console.log(1);
    resolve(3);
    Promise.resolve().then(() => console.log(4)).then(() => console.log(5))
}).then(num => { console.log(num) }).then(() => { console.log(6) });
console.log(2)