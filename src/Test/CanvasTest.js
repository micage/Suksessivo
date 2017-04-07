import Canvas from "../Canvas/Canvas";
import { Point2d } from "../Geometry/Point";
// import Rect from "../Geometry/Rect";
import Style from "../Canvas/Style";

const __FILE = "CanvasTest";

//==============================================================================
// HTML
// a div with id: "CanvasTest" will be appended to body
// and will be removed when the module gets hot

let $root = $('<div>', { id: __FILE }).appendTo('body');
    $root.css({
        'margin-top': '10px',
        'margin-bottom': '10px'
    });

var canvas = new Canvas({
    width: screen.width/2,
    height: 400,
    parentNode: $root[0]
});

canvas.addPath({
    points: [new Point2d(200, 0), new Point2d(100, 400)]
});

canvas.addPath({
    points: [new Point2d(300, 0), new Point2d(400, 400)]
});

canvas.addBox({
    x: 100, y:  30, w: 100, h: 120,
    style: Style.ORANGE_BOLD
});

canvas.addBox({
    x: 320, y:  70, w: 100, h:  50,
    style: Style.ORANGE_BOLD
});

canvas.addBox({
    x: 180, y: 200, w: 180, h:  80,
    style: Style.TEAL_THIN
});

let frame1 = canvas.addFrame({ x: 550, y: 150, scale: -30, angle: -65 });
let frame2 = canvas.addFrame({ x: 150, y: 250, scale: -10, angle: 25 });

canvas.addBox({
    x: -5, y: -1, w: 10, h: 2,
    style: Style.TEAL_THIN
}, frame1);
canvas.addBox({
    x: -5, y: 1, w: 1, h: 5,
    style: Style.TEAL_THIN
}, frame1);
canvas.addBox({
    x: 4, y: 1, w: 1, h: 5,
    style: Style.TEAL_THIN
}, frame1);

canvas.addPath({
    points: [
        new Point2d(3.7, 4),
        new Point2d(3.2, 2),
        new Point2d(1, 3),
        new Point2d(-.8, 2),
        new Point2d(-3, 3),
        new Point2d(1, 4.4),
        new Point2d(1, 6)
    ],
    isClosed: true,
    style: canvas.addStyle("lime", {
        fillColor: { r: 200, g: 210, b: 10, a: 0.3 },
        strokeColor: { r: 20, g: 180, b: 10, a: 0.6 },
        lineWidth: 3.5
    })
}, frame1);

canvas.addCircle({
    x: -3, y: -3, radius: 2,
    style: canvas.styles['lime']
}, frame1);

canvas.addCircle({
    x: 3, y: -3, radius: 2,
    style: canvas.styles['lime']
}, frame1);


canvas.addPath({
    points: [
        new Point2d(1, 2),
        new Point2d(2, 2),
        new Point2d(1.5, 12)
    ],
    isClosed: true,
//    style: canvas.styles['lime']
}, frame2);

canvas.render();

//==============================================================================
// Hot-Module-Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        console.log("module.hot.dispose: " + __FILE);
        // revoke the side effect
        $('#' + __FILE).remove();
    });
}

//==============================================================================
// export to MICAGE, for testing with browser dev tools
Object.assign(window.MICAGE = window.MICAGE || {}, {
    cvs: canvas
});
