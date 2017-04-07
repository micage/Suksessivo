// @noflow
var XArray = function() : Array {
    var arr = [];
    arr.push.apply(arr, arguments);
    arr.__proto__ = XArray.prototype;
    return arr;
};

XArray.from = Array.from;

XArray.fromArray = function(arr) {
    return new XArray(...arr);
};

XArray.prototype = Object.create(Array.prototype);

Object.assign(XArray.prototype, {
    constructor: XArray,

    without(name) {
        return new XArray(...this.filter(n => n !== name));
    },

    insertBefore(name, at) {
        let index = this.indexOf(at);
        if (index < 0) {
            index = 0;
        } else {
            index;
        }
        this.splice(index, 0, name);
        return this;
    },

    insertAfter(name, at) {
        let index = this.indexOf(at);
        if (index < 0) {
            index = this.length;
        } else {
            index++;
        }
        this.splice(index, 0, name);
        return this;
    }
});


module.exports = XArray;
var MICAGE;
Object.assign(MICAGE = MICAGE || {}, module.exports);
