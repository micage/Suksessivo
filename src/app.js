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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas); // not to forget

ctx.fillStyle = '#ccc'; // a light grey
ctx.fillRect(0, 0, canvas.width, canvas.height);

// render some text onto the canvas
let text = "Hallo Welt";
let fontHeight = 120;
ctx.font = fontHeight + "px serif";
ctx.lineWidth = 4;
let metrics = ctx.measureText(text); // get width of text
let p =  { // centered position
    x: (canvas.width - metrics.width) / 2,
    y: (canvas.height) / 2
};
ctx.strokeStyle = "#533";
ctx.strokeText(text, p.x, p.y);
ctx.fillStyle = '#fd2'; // teal color
ctx.fillText(text, p.x, p.y);

// load an image from ./assets and draw it below the text
let img = new Image();
img.onload = (ev) => { // waits for finishing the load operation
    console.log('Image loaded.');
    ctx.drawImage(
        img,
        0, 0, img.width, img.height,                    // original image dimensions
        (canvas.width - img.width / 8) / 2,             // offset x
        (canvas.height - img.height / 8) / 2 + 100,     // offset y
        img.width/8, img.height/8,                      // target dimensions
    );    
};
img.src = "./assets/Earth.png";


// Listen for hot replacement, only for development
// in production mode the module is NOT hot, so this code won't get called
// this is exclusively for the webpack-dev-server
// it's all about updating the app after code changes
// do not worry to much about
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
        // undo changes you made to the DOM
        canvas.remove();
    });
}
