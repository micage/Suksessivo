import importedValue from "./app1/test";
import styles from "./app.less"; // css

// here starts the app
// output is visible in the browsers console
console.log("Yoo, I'm in!");

console.log("The imported value is: " + importedValue);


// put some stuff into the DOM (the web page), in this case a canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

ctx.fillStyle = '#ccc'; // teal color
ctx.fillRect(0, 0, canvas.width, canvas.height);

// render some text onto the canvas
let text = "Hallo Welt";
let fontHeight = 200;
ctx.font = fontHeight + "px serif";
ctx.lineWidth = 4;
let metrics = ctx.measureText(text);
let p =  { // centered position
    x: (canvas.width - metrics.width) / 2,
    y: (canvas.height) / 2
};
ctx.strokeStyle = "#333";
ctx.strokeText(text, p.x, p.y);
ctx.fillStyle = '#fd2'; // teal color
ctx.fillText(text, p.x, p.y);




// Listen for hot replacement
// this is exclusively for the webpack-dev-server
if (module.hot) {
    module.hot.accept();
}
