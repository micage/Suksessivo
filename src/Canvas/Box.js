import Item from "./Item";
import Style from "./Style";

type BoxParamsType = {
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,
    style: Style
};

let instanceCount = 0;

const DefaultParams = {
    name: "Box" + instanceCount,
    x: 0, y: 0, w: 10, h: 10,
    style: new Style("Box", {
        fillColor: { r: 120, g: 80, b: 20, a: 0.5 },
        strokeColor: { r: 120, g: 80, b: 20, a: 1 },
        fillEnabled: true,
        strokeEnabled: true,
        lineWidth: 2
    })
};

class Box extends Item {
    constructor(params: BoxParamsType) {
        let pp = Object.assign({}, DefaultParams, params || {});
        super(pp.name, pp.style);
        this.x = pp.x;
        this.y = pp.y;
        this.w = pp.w;
        this.h = pp.h;

        instanceCount++;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.style.apply(ctx);
        if (this.style.fillEnabled) {
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        if (this.style.strokeEnabled) {
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
        //console.log("Drawing a box(" + this.x + ", " + this.y + ", " + this.w + ", " + this.h + ")");
    }
}

export default Box;
//module.exports = {Box};

Object.assign(window.MICAGE = window.MICAGE || {}, {
    Box
});
