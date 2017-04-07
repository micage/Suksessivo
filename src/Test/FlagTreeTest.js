// libs
import Frame from "../Canvas/Frame.js";
import TreeView from "../UI/TreeView.js";
import Slider from "../UI/Slider.js";
import FlagTree from "../Structures/FlagTree.js";
import Console from "../UI/Console.js";

// adds a number of generic child frames to a given frame
const AddFrames = (f: Frame, n: Number): Array<Frame> => {
    let nc = f.getNumChildren();
    let ff = [];
    for(let i=0; i<n; i++) {
        ff.push(f.addFrame(f.name + (nc + i)));
    }
    return ff;
};

// creates a random tree
let CreateTree = (f: Frame, z: Number) => {
    AddFrames(f, 1 + Math.floor(z * Math.random())).forEach((g: Frame): Array<Frame> => {
        AddFrames(g, Math.floor(z * Math.random())).forEach((h: Frame): Array<Frame> => {
            AddFrames(h, Math.floor(z * Math.random())).forEach((k: Frame): Array<Frame> => {
                AddFrames(k, Math.floor(z * Math.random()));
            });
        });
    });
};

// finds a frame with a certain name recursively
let FindFrame = (f: Frame, str: String): Frame => {
    let now1 = performance.now();
    let counter = 0;
    let result = { found: false };

    f.traverse( (f: Frame): boolean => {
        counter++;
        if (f.name === str) {
            let now2 = performance.now();
            let dt = now2 - now1;
            Object.assign(result, { found: true, str, counter, dt, frame: f });
            return false; // do not continue
        }
    });

    return result;
};

let Test = (
    numTests: Number,
    treeDepth: Number,
    str: String) => {
    for (var i = 0; i < numTests; i++) {
        let f = new Frame("f");
        CreateTree(f, treeDepth);
        let res = FindFrame(f, str);
        if (res.found) {
            Console.log([
                Math.floor(res.dt * 1e3),
                res.counter,
                Math.floor(1e4 * res.dt / res.counter),
                res.frame
            ]);
        }
    }
};


// let rootFrame = new Frame("root");
// CreateTree(rootFrame, 5);
// let treeView = $("<div>", {id: "treeView", class: "font-awesome-tree"}).appendTo(
//     $(document.body)
// );
// TreeView(rootFrame, treeView, item => {
//     console.log(item);
// });

let dialog1 = $("<div>", { id: "dialog1" }).appendTo("body");
$("<input>", { id: "edit1", type: "text" }).appendTo(dialog1);
$("<input>", { id: "edit2", type: "text" }).appendTo(dialog1);

$("<button>", { id: "add", text: "add" })
    .appendTo(dialog1)
    .click(() => {
        let v1 = $("#edit1").val();
        let v2 = $("#edit2").val();
        flagTree.addChild(v1, v2);
        uiTree.update();
        //console.log($(this).val());
    });

$("<button>", { id: "remove", text: "remove" })
    .appendTo(dialog1)
    .click(() => {

    });

$("<button>", { id: "print", text: "print" })
    .appendTo(dialog1).click(()=>{
        Console.log(flagTree.toString());
    });


let flagTree = new FlagTree();
flagTree.initFromFlags(); // uses testArray inside FlagTree.js
let treeView2 = $("<div>", {id: "treeView2", class: "font-awesome-tree"})
    .appendTo($("body"));
let uiTree = TreeView(flagTree, treeView2, (item: HTMLUListElement) => {
    let node = item.data("node");
    $("#edit2").val(node.name);
    Console.log(JSON.stringify(item.data("node")));
});
//flagTree.addChild("test");
//uiTree.update();


// const sl = (id, prop, from, s) => Slider(prop, $("#treeView"), function(that) {
//     items[id][prop] = from + s * that[0].valueAsNumber;
//     CC.render();
// });

// export to MICAGE
Object.assign(window.MICAGE = window.MICAGE || {}, {
    AddFrames,
    CreateTree,
    FindFrame,
    Slider,
    Test,
    TreeView,
    FlagTree,
    $,
    flagTree,
    uiTree
});
