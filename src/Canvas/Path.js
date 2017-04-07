import Item from './Item';
import Style from './Style';
//var Point2d = require('../Geometry/Point').Point2d;
import { Point2d } from '../Geometry/Point';

type Point2dType = {
    x: number,
    y: number
};

type PathParamType = {
    points: Array<Point2dType>,
    frame: Frame,
    style: Style
};


let instanceCount = 0;

const DefaultParams = {
    name: "Path" + instanceCount,
    points: [new Point2d(0, 0), new Point2d(10, 10)],
    style: new Style("Path", {
        fillColor: { r: 20, g: 80, b: 180, a: 0.5 },
        strokeColor: { r: 20, g: 80, b: 180, a: 1 },
        fillEnabled: true,
        strokeEnabled: true,
        lineWidth: 2
    }),
    isClosed: false
};

var Path = function(params: PathParamType) {
    let pp = Object.assign({}, DefaultParams, params || {});
    Item.call(this, name, pp.style); // super(name, style)

    this.style = pp.style;
    this.isClosed = pp.isClosed;
    this.p0 = pp.points[0];
    this.points = pp.points.slice(1);

    instanceCount++;
};

Path.prototype = new Item();

Object.assign(Path.prototype, {
    constructor: Path,

    addPoint(): void {
        if (arguments.length === 1) {
            let p = arguments[0];
            if (p instanceof Point2d) { //
                this.points.push(p);
            } else {
                throw new TypeError(p + " is not a Point2d.");
            }
        } else if (arguments.length === 2) {
            if ((typeof arguments[0] === "number")
             && (typeof arguments[1] === "number") ) {
                this.points.push(new Point2d(arguments[0], arguments[1]));
            }
            else {
                throw new TypeError(arguments + " have to be numbers.");
            }
        } else {
            throw new TypeError(arguments + " is not a valid argument.");
        }
    },

    get isClosed(): boolean { return this._isClosed; },

    close(): boolean {
        if (this.points.length > 1) {
            this._isClosed = true;
            return true;
        }
        return false;
    },

    // todo: correct it
    getBoundingRect(): Rect {
        let min = 1e7, max = -1e7, pp1, pp2;
        let minmaxIt = (p: Point2dType) => {
            if (p.x < min) {
                min = p.x;
                pp1 = p;
            }
            if (p.y > max) {
                max = p.x;
                pp2 = p;
            }
        };
        this.points.forEach(minmaxIt);
        return new Rect(pp1, pp2);
    },

    /**
     * @param {CanvasRenderingContext2D}
     */
    draw(ctx: CanvasRenderingContext2D) {
        this.style.apply(ctx);
        if (this.points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(this.p0.x, this.p0.y);
            let pointIt = (p: PointType2d) => {
                ctx.lineTo(p.x, p.y);
            };
            this.points.forEach(pointIt);
            if (this.isClosed) {
                ctx.lineTo(this.p0.x, this.p0.y);
                ctx.fill();
            }
            ctx.stroke();

            //console.log("Path: " + this.name + " drawn.");
        }
    },

    foo() {}
});

module.exports = Path;
Object.assign(window.MICAGE = window.MICAGE || {}, module.exports);
