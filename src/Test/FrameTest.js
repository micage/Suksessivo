"use strict";
// libs
// import Frame from "../Canvas/Frame.js";
const Frame = require("./Frame_noflow.js");
// import TreeView from "../UI/TreeView.js";
// import Slider from "../UI/Slider.js";
// import FlagTree from "../Structures/FlagTree.js";
//import Console from "../UI/Console.js";

let log = f => { console.log(f.toString()); };
let line = (str) => { console.log("\n" + str); };

let rootFrame = new Frame("root", 10, 11, .5, 23);
console.log("root: " + rootFrame.toString());




// let makeFrames = (n: number): Array<Frame> =>
//     Array.from({length: n}, (v: void, i: number): Frame =>
//         new Frame("f" + i) );
let makeFrames = (n) =>
    Array.from({length: n}, (v, i) =>
        new Frame("f" + i) );

let frames = makeFrames(10);
console.log(frames.map(f=>f.name).join(", "));




rootFrame.setPosition(100, 200);
log(rootFrame);
rootFrame.angle = 44;
log(rootFrame);
log(JSON.stringify(rootFrame.getPosition()));

frames[0].parent = rootFrame;
    frames[3].parent = frames[0];
    frames[4].parent = frames[0];
        frames[6].parent = frames[4];
            frames[8].parent = frames[6];
        frames[7].parent = frames[4];
            frames[9].parent = frames[7];
frames[1].parent = rootFrame;
    frames[5].parent = frames[1];
frames[2].parent = rootFrame;

log(rootFrame);
log(frames[0]);


// Frame Tree Printer

line("traverse tree:");
rootFrame.traverse((f, info) => {
    let tabs = Array.from({length: info.depth}, () => "  ").join("");
    console.log(tabs + f.name);
}, true);

line("print tree:");
frames[0].print();
















// export to MICAGE
//==============================================================================
if (typeof window !== 'undefined') Object.assign(window.MICAGE = window.MICAGE || {}, {
    rootFrame
});
