"use strict";

class ObjectTree {
    constructor(json) {
        this._json = json;
    }

    get json() { return this._json; }

    _preOrder(obj, cb, node) {
        if (!obj || typeof obj !== "object") return;

        let keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            if (node.doContinue === false) break; // callback returned false;

            var child = obj[keys[i]];

            node.parent = obj;

            if (Array.isArray(child)) {
                node.hasChildren = !!child.length;
                node.id = keys[i] + "[" + child.length + "]";
            }
            else if (child && typeof child === "object") {
                node.id = keys[i];
                if (Object.keys(child).length === 0) {
                    node.hasChildren = false;
                }
                else {
                    node.children = child;
                }
            }
            else {
                node.hasChildren = false;
                node.id = keys[i];
            }

            node.data = child;

            node.isLastChild = i === keys.length - 1;
            node.depth++;

            node.doContinue = cb(node); // call visitor
            this._preOrder(child, cb, node); // -> recursion

            node.depth--;
        }
    }

    traverse(visitor, doVisitRoot) {
        if (typeof this._json !== "object") return;

        let nodeInfo = {
            depth: 0,
            parent: {},
            hasChildren: true,
            isLastChild: true,
            data: this._json
        };

        if (doVisitRoot) {
            if (visitor(nodeInfo) === false) {
                return;
            }
        }

        this._preOrder(this._json, visitor, nodeInfo);
    }

}

//module.exports = ObjectTree;

export default ObjectTree;
