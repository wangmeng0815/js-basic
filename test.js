const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function Promise(executor){
    var that = this;
    that._status = PENDING;
    that._resolves = [];
    that._rejects = [];
    that._data = null;

    function resolve(value){
        process.nextTick(function(){
            that._status = RESOLVED;
            that._data = value;
            that._resolves.forEach(function(cb){
                cb(value);
            })
        })
    }

    function reject(reason){
        process.nextTick(function(){
            that._status = REJECTED;
            that._data = reason;
            that._rejects.forEach(function(cb){
                cb(reason);
            })
        })
    }

    try{
        executor(resolve, reject);
    }catch(e){
        reject(e)
    }
}

Promise.ptototype.then = function(onFulfilled, onRejected){
    var that = this;
    onFulfilled = typeof onFulfilled=== 'function' ?
                    onFulfilled: function(value){ return value}
    onRejected = typeof onRejected === 'function' ? 
                    onRejected : function(reason){ throw reason}
    return new Promise(function(resolve, reject){

        function handle(value){
            var ret = onFulfilled(value);
            if(ret && typeof ret['then'] == 'function'){
                ret.then(resolve, reject);
            }else{
                resolve(ret);
            }
        }

        function errback(reason){
            var reason = onRejected(reason);
            if(reason && typeof reason[then] == 'function'){
                reason.then(resolve, reject);
            }else{
                resolve(reason);
            }
        }

        if(that._status == PENDING){
            that._resolves.push(handle);
            that._rejects.push(errback);
        }else if(that._status === RESOLVED){
            handle(that._status)
        }else{
            errback(that._status)
        }
    })
}
