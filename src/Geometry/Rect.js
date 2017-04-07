/**
 * @class Rect
 * @param {variant} args
 * case: args = undefined
 * case: args = Rect - copy constructor
 * case: args = [p1, p2]
 * case: args = [x, y, w, h]
 * @throws
 */
var Rect = function (...args) {
    if (!(this instanceof(Rect))) { // allow use w/o new
        return new Rect(args);
    }
    switch (args.length) {
        case 0:
            this.p1 = new Point(0, 0);
            this.p2 = new Point(160, 100);
            console.log("no arguments");
        break;
        case 1:
            if (args.constructor && args.constructor === Rect) {
                this.p1.x = arg.p1.x;
                this.p1.y = arg.p1.y;
                this.p2.x = arg.p2.x;
                this.p2.y = arg.p2.y;
            } else {
                throw new TypeError(" is not a Rect.")
            }
            console.log("Rect copy constructor");
        break;
        case 2:
            this.p1 = args[0].constructor === Point ? args[0] : Point();
            this.p2 = args[1].constructor === Point ? args[1] : Point();
            console.log("2 arguments");
        break;
        case 4:
            this.p1 = Point(args);
            this.p2 = Point(args[2], args[3]);
            console.log("4 arguments");
        break;
        default:
            console.log("invalid number of arguments");
            throw new TypeError(" is an invalid argument");
    }

    if (this.p1.x > this.p2.x) {
        let temp = this.p1.x;
        this.p1.x = this.p2.x;
        this.p2.x = temp;
    }
    if (this.p1.y > this.p2.y) {
        let temp = this.p1.y;
        this.p1.y = this.p2.y;
        this.p2.y = temp;
    }
};

Rect.prototype = {
    constructor: Rect,

    move (t) {
        this.p1.move(t);
        this.p2.move(t);
    },

    /**
     * Tests if a Point is inside this rectangle
     * @param {Point} value
     * @returns {boolean}
     */
    isInside(p) {
        if ((this.p1.x <= p.x < this.p2.x) && (this.p1.y <= p.y < this.p2.x)) {
            return true;
        }
        return false;
    },

    /**
     * Tests if a Point is inside this rectangle
     * @param {Point} value
     * @returns {Rect|null}
     * @throws
     */
    getIntersection(rect) {
        if (!(rect instanceof(Rect))) {
            return new TypeError(rect + " is not a Rect");
        }
        let c1 = this.isInside(rect.p1);
        let c2 = this.isInside(rect.p2);
        return new Rect(Point(), Point());
        return null;
    },

    foo () {}
};

module.exports = Rect;
window.MICAGE ? MICAGE.Rect = Rect : window.MICAGE = { Rect };
