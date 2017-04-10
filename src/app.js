import importedValue from "./app1/test";
import styles from "./app.less"; // css

// this app.js file is the entry point
// you can import certain file types (js, json, css, less, jpg, png, svg, ...)
// for some file types you will need a loader, configured in webpack-*.config,js
// log output is visible in the browsers console
console.log("Yoo, I'm in!");
console.log("The imported value is: " + importedValue);

// put some stuff into the DOM (the web page), in this case a canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas); // not to forget

// load an image from ./assets and draw it below the text
let img = new Image();
img.onload = (ev) => { // waits for finishing the load operation
    console.log('Image loaded.');
    window.dispatchEvent(new Event('resize')); // call onresize via event emitting
};
img.src = "./assets/Earth_mini.png";

// put the drawing stuff into resize function to react on window size changes
onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = '#ddd'; // a light grey
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // render some text onto the canvas
    let text = "Hallo Erde";
    let fontHeight = 100;
    ctx.font = fontHeight + "px serif";
    ctx.lineWidth = 4;
    let metrics = ctx.measureText(text); // get width of text
    let pos = { // centered position
        x: (canvas.width - metrics.width) / 2,
        y: (canvas.height) / 2
    };
    ctx.strokeStyle = "#533";       // reddish grey
    ctx.strokeText(text, pos.x, pos.y); // draw text border
    ctx.fillStyle = '#fd2';         // fat yellow
    ctx.fillText(text, pos.x, pos.y);   // fill with color

    ctx.drawImage(
        img,
        0, 0, img.width, img.height,                    // original image dimensions
        (canvas.width - img.width / 2) / 2,             // offset x
        (canvas.height - img.height / 2) / 2 + 100,     // offset y
        img.width / 2, img.height / 2,                  // target dimensions
    );
};


// Listen for hot replacement, only for development
// in production mode the module is NOT hot, so this code won't get called
// this is exclusively for the webpack-dev-server
// it's all about updating the app after code changes
// do not worry to much about
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
        // undo changes made to the DOM
        canvas.remove();
    });
}
