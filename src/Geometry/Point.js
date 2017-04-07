/**
 * @class Point2d
 * @param {variant} params
 * case: args = undefined
 * case: args = Point2d - copy constructor
 * case: args = [x: Number, y:Number]
 * @throws
 */
var Point2d = function (...params) {
    if (!(this instanceof Point2d)) {
        return new Point2d(...params)
    }
    switch (params.length) {
        case 0:
            this.x = 0;
            this.y = 0;
        break;
        case 1:
            if (params.constructor && params.constructor === Point2d) {
                this.x = arg.x;
                this.y = arg.y;
            } else {
                throw new TypeError(" is not a Point2d.")
            }
        break;
        case 2:
            if (typeof params[0] === "number" && typeof params[1] === "number") {
                this.x = params[0];
                this.y = params[1];
            } else {
                throw new TypeError("arguments have to be numbers")
            }
        break;
        default:
            throw new TypeError(params + " is an invalid argument");
    }
};

Point2d.EPSILON = 1e7;

Point2d.prototype = {
    constructor: Point2d,

    move (t) {
        this.x += t.x;
        this.y += t.y;
    },

    equals (p) {
        if ((Math.abs(this.x - p.x) < Point2d.EPSILON)
         && (Math.abs(this.y - p.y) < Point2d.EPSILON)) {
            return true;
        }
        return false;
    },

    distance (p) {
        let dx = this.x - p.x, dy = this.x - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    foo () {}
};

/**
 * @class Point3d
 * @param {variant} args
 * case: args = undefined
 * case: args = Point3d - copy constructor
 * case: args = [x: Number, y:Number, z:Number]
 * @throws
 */
var Point3d = function (...args) {
    if (!(this instanceof Point)) {
        return new Point(args)
    }
    switch (args.length) {
        case 0:
            this.x = 0;
            this.y = 0;
            this.z = 0;
        break;
        case 1:
            if (args.constructor && args.constructor === Point3d) {
                this.x = arg.x;
                this.y = arg.y;
                this.y = arg.z;
            } else {
                throw new TypeError(args + " is not a Point3d")
            }
        break;
        case 3:
            if (typeof args[0] === "number"
             && typeof args[1] === "number"
             && typeof args[2] === "number") {
                this.x = args[0];
                this.y = args[1];
                this.z = args[2];
            } else {
                throw new TypeError("arguments have to be numbers")
            }
        break;
        default:
            throw new TypeError(args + " is an invalid argument");
    }
};

Point3d.prototype = {
    add(p) {
        this.x += p.x;
        this.y += p.y;
        this.z += p.z;
        return this;
    },
    neg() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    },

    foo () {}
};

module.exports = { Point2d, Point3d };

if (!window.MICAGE) window.MICAGE = {};
window.MICAGE.Point2d = Point2d;
window.MICAGE.Point3d = Point3d;
