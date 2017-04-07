if (! Object.toType) {
    Object.toType = (function toType(global) {
        var toString = Object.prototype.toString;
        var re = /^.*\s(\w+).*$/;

        return function(obj) {
            if (obj === global) {
                return "global";
            }
            return toString.call(obj).replace(re,"$1").toLowerCase();
        }
    })(this);
}

if (! Number.equals) {
    Number.equals = function(a,b) {
        return Math.abs(a-b) < 1e-7 ? true: false;
    };
}

/** BAD, this breaks jQuery */
/*
Object.prototype.clone = function() {
    if(this.cloneNode) return this.cloneNode(true);
    var copy = this instanceof Array ? [] : {};
    for(var attr in this) {
        if(typeof this[attr] == "function" || this[attr]==null || !this[attr].clone)
        copy[attr] = this[attr];
        else if(this[attr]==this) copy[attr] = copy;
        else copy[attr] = this[attr].clone();
    }
    return copy;
}

Date.prototype.clone = function() {
    var copy = new Date();
    copy.setTime(this.getTime());
    return copy;
}

Number.prototype.clone =
Boolean.prototype.clone =
String.prototype.clone = function() {
    return this;
}
*/
