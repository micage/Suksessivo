import Item from "./Item";
import Style from "./Style";

type CircleParamType = {
    name: string,
    x: number,
    y: number,
    radius: number,
    style: Style
};

let instanceCount = 0;

const DefaultParams = {
    name: "Circle" + instanceCount,
    x: 0, y: 0, radius: 10,
    style: new Style("Circle", {
        fillColor: { r: 20, g: 80, b: 160, a: 0.5 },
        strokeColor: { r: 20, g: 80, b: 160, a: 1 },
        fillEnabled: true,
        strokeEnabled: true,
        lineWidth: 1
    })
};

const PI2 = 2 * Math.PI;

class Circle extends Item {
    constructor(params: CircleParamType) {
        let pp = Object.assign({}, DefaultParams, params || {});
        super(pp.name, pp.style);
        this.x = pp.x;
        this.y = pp.y;
        this.r = pp.radius;

        instanceCount++;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.style.apply(ctx);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, PI2, true);
        if (this.style.fillEnabled) {
            ctx.fill();
        }
        if (this.style.strokeEnabled) {
            ctx.stroke();
        }
        //console.log("Drawing a box(" + this.x + ", " + this.y + ", " + this.w + ", " + this.h + ")");
    }
}

export default Circle;
//module.exports = {Circle};

Object.assign(window.MICAGE = window.MICAGE || {}, {
    Circle
});
