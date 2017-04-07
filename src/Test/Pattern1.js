
var Pattern1 = function(name, x = 0, p = 0) {
    // private:
    var _p = p;
    var _name = name;

    // public:
    this.x = x;

    this.getP = function() { return _p; }
    this.setP = function(p) { _p = p; }
};

Pattern1.prototype = {
    get p() { return this.getP(); },
    set p(p) { return this.setP(p); },
    incX() { this.x += 1; },
    incP() { _p += 1; }
};

module.exports = Pattern1;
window.MICAGE ? MICAGE.Pattern1 = Pattern1 : window.MICAGE = { Pattern1 };
