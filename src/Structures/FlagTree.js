/** idea:
Create a tree from an array of flags
provides a traverse method that mimicks preorder traversal
*/

const Element = function(name: String, hasChildren: Boolean, isLastChild: Boolean, depth: Number) {
    this.name = typeof name === "string" ? name : ("E" + Element.count);
    this.hasChildren = hasChildren;
    this.isLastChild = isLastChild;
    this.depth = depth;
};

Element.prototype = {
    hasChildren(): Boolean { return this.hasChildren; },
    isLastChild(): Boolean { return this.isLastChild; }
};

const testArray = [
[1,1], // root
    [1,0],
        [1,0],
            [0,0],
            [0,1],
        [0,1],
    [0,0],
    [1,0],
        [0,0],
        [1,0],
            [0,0],
            [0,1],
        [1,1],
            [1,0],
                [0,0],
                [0,1],
            [0,1],
    [1,1],
        [0,0],
        [0,1]
];

const FlagTree = function() {
    this.arr = [];

    this.initRandom = function(n: Number) {
        this.arr[0] = new Element("root", true, true, 0);
        for(let i = 1; i < n-1; i++) {
            this.arr[i] = new Element(
                "E" + i,
                Math.floor(Math.random() + (n-i) * .03) === 0 ? false : true, // has children
                Math.floor(Math.random() + (i) * .05) === 0 ? false : true  // is last child
            );
        }
        this.arr[n-1] = new Element( "E" + (n-1), false, true );
    },

    this.initFromFlags = function(a: Array = testArray) {
        this.arr[0] = new Element("root", true, true, 0);

        let stack =[0];
        for(let i = 1, depth = 1; i < a.length; i++) {
            let node = {
                hasChildren: a[i][0] === 0 ? false : true,
                isLastChild: a[i][1] === 0 ? false : true
            };

            this.arr[i] = new Element(
                "E_" + (i < 10 ? "0" : "") + i,
                node.hasChildren,
                node.isLastChild,
                depth
            );

            if (node.hasChildren) { // parent has children
                if (! node.isLastChild) { // node is not last child
                    stack.push(depth);
                }
                depth++;
            }
            else if (node.isLastChild) { // is last child)
                depth = stack.pop();
            }
        }
    };

    this.toString = function(): String {
        //let cor = [-1,6,5,4 ,-1,-1,7,17 ,9,12,11,-1 ,-1,16,15,-1, -1,-1,19,-1,];
        let makeTabs = (n: Number): String => {
            let tabs = "";
            for( var i = 0; i < n; i++) { tabs+= "\t"; }
            return tabs;
        };
        let str = "";

        for(let i = 0; i < this.arr.length; i++) {
            let lastChildIndex = this.findLastSibling(i+1);
            let indexNextSibling = this.findNextSibling(i);
            // let indexToInsert = this.findInsertIndex(i);
            // let findTest = this.findTest(i);
            let node = this.arr[i];
            //(node.hasChildren ? "-" : indexToInsert)

            str += (i < 10 ? " " : "") + i + "\t\t";
            str += (node.hasChildren ? lastChildIndex : "-") + "\t";
            //str += indexToInsert + "\t";
            str += indexNextSibling + "\t";
            //str += cor[i] + "\t"; // correct values vor next sibling
            //str += findTest + "\t";
            str += "(" + node.hasChildren*1 + ", ";
            str += node.isLastChild*1 + ")\t";
            str += makeTabs(node.depth);
            str += node.name;
            str += "\n";
        }

        return str;
    };

    this.findNextSibling = function(index: Number): Number {
        if (this.arr[index].isLastChild) {
            return -1;
        }
        let stack =[0];
        for (let i = index, depth = 0; i < this.arr.length; i++) {
            let node = this.arr[i];

            if (node.hasChildren) {
                if (!node.isLastChild) {
                    stack.push(depth);
                }
                depth++;
            } else if (node.isLastChild) {
                depth = stack.pop();
            }
            if (depth === 0) {
                return i+1;
            }
        }
        return -1;
    };

    this.findLastSibling = function(index: Number): Number {
        let localDepth = 0;
        for (let i = index; i < this.arr.length; i++) {
            let node = this.arr[i];
            if (node.isLastChild) {
                if (localDepth === 0) {
                    return i;
                }
                localDepth--;
            }
            if (node.hasChildren) {
                localDepth++;
            }
        }
        return -1;
    };

};

FlagTree.prototype = {
    traverse(cb: TreeVisitor, bVisitRoot: Boolean) {

        let node = {
            id: this.arr[0].name,
            depth: 0,
            hasChildren: this.arr[0].hasChildren(),
            isLastChild: this.arr[0].isLastChild(),
            doContinue: true
        };

        if (bVisitRoot) {
            node.doContinue = cb(node);
        }

        if (node.doContinue === false) { // stop further iteration
            return;
        }

        for(let i = 1; i < this.arr.length; i++) {
            let elem = this.arr[i];
            node.doContinue = cb({
                id: elem.name,
                depth: elem.depth,
                hasChildren: elem.hasChildren(),
                isLastChild: elem.isLastChild()
            });
        }
    },


    /** insert child into node
    1. node has children
        a) is last
        b) is not last
        find last child, insert at lastChildIndex + 1, lastChild.isLastChild = false
    2. node has no children
        insert at foundIndex + 1, node.hasChildren = true
    child.depth = node.depth + 1
    */


    addChild(childName: String, parentName: String): Element {
        let indexToInsert = -1;

        if (this.arr.length === 0) {
            this.arr[0] = new Element(childName, false, true, 0);
            return this.arr[0];
        }

        if (! parentName) {
            indexToInsert = this.arr.length;

            // find last child of root and set is last child flag = false
            let i = indexToInsert - 1;
            for (; i !== 0; i--) {
                if (this.arr[i].depth === 1) {
                    this.arr[i].isLastChild = false;
                }
            }

            let el = new Element(childName, false, true, 1);
            this.arr.splice(indexToInsert, 0, el);
            return el;
        } else {
            let len = this.arr.length;
            for(let i = 0; i < len; i++) {
                let parent = this.arr[i];
                if (parent.name === parentName) {
                    if (parent.hasChildren) {
                        // find last child of parent, depth has to be parent.depth + 1
                        for(let j = i + 1; j < len; j++) {
                            let child = this.arr[j];
                            if(child.isLastChild && child.depth === parent.depth + 1) {
                                child.isLastChild = false;
                                indexToInsert = j + 1;
                                break;
                            }
                        }
                        // find index to insert is the same as to find node whose
                        // depth is less than or equal to parent.depth
                        for(let j = indexToInsert; j < len; j++) {
                            let node = this.arr[j];
                            if (node.depth <= parent.depth) {
                                indexToInsert = j;
                                break;
                            }
                        }
                    } else { // no children
                        indexToInsert = i + 1;
                        parent.hasChildren = true;
                    }

                    let el = new Element(childName, false, true, parent.depth+1);
                    this.arr.splice(indexToInsert, 0, el);
                    return el;
                }
            }
        }
        return null;
    },

    removeChild(childName: String, parentName: String) {
        console.log(parentName);
        throw new Error("not implemented");
    }

};

module.exports = FlagTree;
Object.assign(window.MICAGE = window.MICAGE || {}, module.exports);
