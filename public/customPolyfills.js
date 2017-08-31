if (!Array.prototype.forEach) {
    
      Array.prototype.forEach = function(callback/*, thisArg*/) {
    
        var T, k;
    
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
    
        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);
    
        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;
    
        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
    
        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
          T = arguments[1];
        }
    
        // 6. Let k be 0.
        k = 0;
    
        // 7. Repeat while k < len.
        while (k < len) {
    
          var kValue;
    
          // a. Let Pk be ToString(k).
          //    This is implicit for LHS operands of the in operator.
          // b. Let kPresent be the result of calling the HasProperty
          //    internal method of O with argument Pk.
          //    This step can be combined with c.
          // c. If kPresent is true, then
          if (k in O) {
    
            // i. Let kValue be the result of calling the Get internal
            // method of O with argument Pk.
            kValue = O[k];
    
            // ii. Call the Call internal method of callback with T as
            // the this value and argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
          }
          // d. Increase k by 1.
          k++;
        }
        // 8. return undefined.
      };
    }

    if (!Array.from) {
      Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
          var number = Number(value);
          if (isNaN(number)) { return 0; }
          if (number === 0 || !isFinite(number)) { return number; }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };
    
        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
          // 1. Let C be the this value.
          var C = this;
    
          // 2. Let items be ToObject(arrayLike).
          var items = Object(arrayLike);
    
          // 3. ReturnIfAbrupt(items).
          if (arrayLike == null) {
            throw new TypeError("Array.from requires an array-like object - not null or undefined");
          }
    
          // 4. If mapfn is undefined, then let mapping be false.
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;
          if (typeof mapFn !== 'undefined') {
            // 5. else      
            // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            }
    
            // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 2) {
              T = arguments[2];
            }
          }
    
          // 10. Let lenValue be Get(items, "length").
          // 11. Let len be ToLength(lenValue).
          var len = toLength(items.length);
    
          // 13. If IsConstructor(C) is true, then
          // 13. a. Let A be the result of calling the [[Construct]] internal method 
          // of C with an argument list containing the single item len.
          // 14. a. Else, Let A be ArrayCreate(len).
          var A = isCallable(C) ? Object(new C(len)) : new Array(len);
    
          // 16. Let k be 0.
          var k = 0;
          // 17. Repeat, while k < len… (also steps a - h)
          var kValue;
          while (k < len) {
            kValue = items[k];
            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
            k += 1;
          }
          // 18. Let putStatus be Put(A, "length", len, true).
          A.length = len;
          // 20. Return A.
          return A;
        };
      }());
    }