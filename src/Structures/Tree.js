"use strict";
import ListItemDouble from "./ListItemDouble";

type TreeVisitorType = (tree: Tree) => boolean;
type TreeInfoType = {
    doContinue: boolean,
    hasChildren: boolean,
    isLastChild: boolean,
    depth: number
};


/** The Tree class represents a node in a tree of key value pairs
 *  here called 'id' and 'data'.
 *  It's derived from ListItemDouble which implements a doubly linked list
 *  Each node has a parent, firstChild, previous and next node
 *  after creation each of these members are null
 *  @class Tree
 */
class Tree extends ListItemDouble {
    constructor(id, data) {
        super(data);
        this.id = id;
        this._parent = null;
        this._firstChild = null;
        this._lastChild = null;
    }

    /** checks if we are last child of our parent
     *  @returns {boolean}
     */
    isLastChild(): boolean {
        return this._next === null;
    }

    /** checks if we children -> we are parent
     *  @returns {boolean}
     */
    hasChildren(): boolean {
        return this._firstChild !== null;
    }

    /** @param parent {Tree} */
    setParent(parent: Tree) {
        if (this._parent) {
            // unlink us from old parent and our siblings
            this.vanish();
        }
        parent.addChild(this);
    }

    /** @returns {Tree} */
    getParent(): Tree {
        return this._parent;
    }

    /** @returns {Tree} */
    getFirstChild(): Tree {
        return this._firstChild;
    }

    /** @param item {Tree} */
    addChild(item: Tree) {
        if (!this._firstChild) {
            this._firstChild = this._lastChild = item;
        }
        else {
            this._lastChild._next = item;
            item._previous = this._lastChild;
            item._next = null;
            this._lastChild = item;
        }
        item._parent = this;
    }

    /**
     * overwrites vanish from ListItemDouble
     * unlinks this node from its parent and its siblings
     * child nodes remain unchanged
     * This implies that this node gets 'unlinked' and is
     * now a tree on its own with intact child hierarchy
     * and can for example added to a new parent
     */
    vanish() {
        if (this._parent) {
            // check if we are _firstChild or _lastChild of parent
            if (this === this._parent._firstChild) {
                // next item will be _firstChild
                this._parent._firstChild = this._next;
            }
            if (this === this._parent._lastChild) {
                // this._previous will be _firstChild
                this._parent._lastChild = this._previous;
                if (this._previous === null) {
                    // list is empty, so
                    this._parent._firstChild = null;
                }
            }
            this._parent = null;
        }
        if (this._previous) {
            this._previous._next = this._next;
            this._previous = null;
        }
        if (this._next) {
            this._next._previous = this._previous;
            this._next = null;
        }
    }

    /** Iterates through the children of this node
     *  @param cb {(node: Tree) => boolean}
     */
    forChildren(cb: (node: Tree) => boolean ) {
        for(var child = this._firstChild; child; child = child.next) {
            let result = cb(child);
            if (typeof result === "boolean" && result === false) {
                break;
            }
        }
    }

    _preOrder(visitor: TreeVisitorType, info: TreeInfoType) {

        for(let child = this._firstChild; child; child = child.next) {
            if (info.doContinue === false) {
                break;
            }

            info.id = child.id;
            info.hasChildren = child.hasChildren();
            info.isLastChild = child.isLastChild();
            info.data = child.data;
            info.depth++;

            info.doContinue = visitor(info);

            child._preOrder(visitor, info);

            info.depth--;
        }
    }

    traverse(
        visitor: TreeVisitorType,
        doVisitRoot: boolean = true,
        mode = "preorder"
    ){
        let info: TreeInfoType = {
            id: "root",
            depth: 0,
            doContinue: true,
            isLastChild: true,
            hasChildren: this.hasChildren()
        };

        if (doVisitRoot) {
            if (false === visitor(info)) {
                return;
            }
        }

        switch(mode) {
            case "postorder":
            break;
            case "inorder":
            break;
            case "levelfirst":
            break;
            case "preorder": // and default
            default:
                this._preOrder(visitor, info);
        }
    }

}


module.exports = { Tree };
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, module.exports);
}
