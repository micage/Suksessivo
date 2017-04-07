//
type ColorRGBA = {
    r: number,
    g: number,
    b: number,
    a: number
};

type StyleParams = {
    name: string,
    fillColor: ColorRGBA,
    strokeColor: ColorRGBA,
    fillEnabled: boolean,
    strokeEnabled: boolean,
    lineWidth: number
};

let instanceCount = 0;

const defaultFillColor = { r: 200, g: 200, b:200, a: 0.5 };
const defaultStrokeColor = { r: 80, g: 80, b:80, a: 1 };
const DefaultParams = {
    name: "Style" + instanceCount,
    fillColor: defaultFillColor,
    strokeColor: defaultStrokeColor,
    fillEnabled: true,
    strokeEnabled: true,
    lineWidth: 1
};


//
var Style = function(name, params: StyleParams) {
    let pp = Object.assign({}, DefaultParams, params || {});

    this.name = name;
    this.fillColor = pp.fillColor;
    this.strokeColor = pp.strokeColor;
    this.fillEnabled = pp.fillEnabled;
    this.strokeEnabled = pp.strokeEnabled;
    this.lineWidth = pp.lineWidth;
};

Style.prototype = {
    setFillColor(rgba: ColorRGBA = defaultFillColor) {
        if(rgba.r<0) rgba.r=0; if (rgba.r>255) rgba.r=255;
        if(rgba.g<0) rgba.g=0; if (rgba.g>255) rgba.g=255;
        if(rgba.b<0) rgba.b=0; if (rgba.b>255) rgba.b=255;
        if(rgba.a<0) rgba.a=0; if (rgba.a>1) rgba.a=1;
        this.fillColor = rgba;
    },

    getFillColor(): string {
        var rgba = this.fillColor;
        return 'rgba('+ rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a +')';
    },

    setStrokeColor(rgba: ColorRGBA = defaultStrokeColor) {
        if(rgba.r<0) rgba.r=0; if (rgba.r>255) rgba.r=255;
        if(rgba.g<0) rgba.g=0; if (rgba.g>255) rgba.g=255;
        if(rgba.b<0) rgba.b=0; if (rgba.b>255) rgba.b=255;
        if(rgba.a<0) rgba.a=0; if (rgba.a>1) rgba.a=1;
        this.strokeColor = rgba;
    },

    getStrokeColor(): string {
        var rgba = this.strokeColor;
        return 'rgba('+ rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a +')';
    },

    apply(ctx: CanvasRenderingContext2D): Style {
        if (this.fillEnabled) {
            ctx.fillStyle = this.getFillColor();
        }

        if (this.strokeEnabled) {
            ctx.strokeStyle = this.getStrokeColor();
            ctx.lineWidth *= this.lineWidth * 0.8;
        }

        return this;
    }
};

//======================================================================

Style.DEFAULT = new Style("Default");
Style.ORANGE_BOLD = new Style("Orange bold", {
    fillColor: { r: 200, g: 140, b: 10, a: 0.3 },
    strokeColor: { r: 250, g: 140, b: 0, a: 1 },
    lineWidth: 2
});
Style.TEAL_THIN = new Style("Teal thin", {
    fillColor: { r: 0, g: 140, b: 210, a: 0.3 },
    strokeColor: { r: 0, g: 80, b: 120, a: 255 },
    lineWidth: 1
});


//======================================================================
export default Style;

//======================================================================
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        Style
    });
}
