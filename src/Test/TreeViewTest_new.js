import { Div, Img, A, P, Pre, Span } from "../DOM/Elements";
import TreeView from "../DOM/TreeView";

// mocking data
import { human, data1, afterfx } from "./TreeViewTestData";


let root = TreeView({ json: afterfx });

document.body.appendChild(root);
