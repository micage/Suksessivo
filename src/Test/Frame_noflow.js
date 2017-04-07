"use strict";
require("../Util/helper");

class Frame {
    constructor(name, x, y, scale, angle) {
        this._name = name;
        this._x = x || 0;
        this._y = y || 0;
        this._scale = typeof scale === "number" ? scale : 1;
        this._scale = Number.equals(this._scale, 0) ? 1e-7 : this._scale;
        this._angle = angle || 0;
        this._parent = null;
        this._children = [];
    } // end of constructor

    //========================================================================
    get name() {
        return this._name;
    }
    set name(name) {
        if (typeof name === 'string' && name.length > 0) {
            this._name = name;
        }
    }

    get x() { return this._x; }
    set x(x) { this._x = x; }
    get y() { return this._y; }
    set y(y) { this._y = y; }
    get angle() { return this._angle; }
    set angle(angle) { this._angle = angle; }

    get scale() {
        return this._scale;
    }
    set scale(s) {
        Number.equals(s, 0) ? this._scale = 1e7 : this._scale = s;
    }

    getRootScale() {
        let s = this._scale,
            parent = this._parent;
        while (parent) {
            s *= parent.s;
            parent = parent._parent; // one level up
        }
        return s;
    }

    getPosition() {
        return { x: this._x, y: this._y };
    }
    setPosition(x, y) {
        this._x = x;
        this._y = y;
    }
    getRootPosition() {
        var x = this.x,
            y = this.y,
            parent = this._parent;
        while (parent) {
            x += parent.x;
            y += parent.y;
            parent = parent._parent; // one level up
        }
        return { x, y };
    }

    //========================================================================

    hasChildren() {
        return this._children.length > 0;
    }

    isLastChild() {
        if (this._parent && this._parent.getLastChild() === this) {
            return true;
        }
        return false;
    }

    getLastChild() {
        let lastIndex = this._children.length - 1;
        if (lastIndex >= 0) {
            return this._children[lastIndex];
        }
    }

    findChildByName(name) {
        return this._children.find(f => f.name === name) || null;
    }

    findChildByIndex(index) {
        if (0 <= index && index < this._children.length) {
            return this._children[index];
        }
        return null;
    }

    getNumChildren() {
        return this._children.length;
    }

    get parent() {
        return this._parent;
    }
    // todo: not so easy, remove from parent if exists
    set parent(p) {
        if (this._parent) {
            this._parent.removeChild(this);
        }
        p.addChild(this);
    }

    addChild(child) {
        if (child.parent) {
            child.parent.removeChildFrame(child);
        }
        this._children.push(child);
        return child;
    }

    removeChild(child) {
        this._children = this._children.filter(f => child !== f);
        child._parent = null;
        return child;
    }

    eachFrame(cb) {
        let len = this._children.length;
        for (let i = 0; i < len; i++) {

            let ret = cb(this._children[i], i === len - 1);

            if (typeof ret === "boolean" && ret === false) {
                return;
            }
        }
    }

    // allows stopping of traversal if callback returns false
    _preOrder(visitor, info) {
        for (var i = 0; i < this._children.length; i++) {
            if(info.bContinue !== false) {
                let frame = this._children[i];

                info.isLast = i === this._children.length - 1 ? true : false;
                info.hasChildren = frame._children.length !== 0;
                info.doContinue = visitor(frame, info);
                info.depth++;

                frame._preOrder(visitor, info);
                info.depth--;
            }
        }
    }

    /**
    _nostop_preOrder
    @param visitor {Function} called for each frame of subtree, visits parents first
    @param bVisitRoot {boolean} true if visiting root should be included
    */
    _nostop_preOrder(visitor, info) {
        var callNode = function (frame, isLast) {
            visitor(frame, isLast, frame.hasChildren());
            frame._nostop_preOrder(visitor);
        };
        this.eachFrame(callNode);
    }

    /**
    _nostop_postOrder
    @param visit {Function} called for each frame of subtree, visits children first
    @param bVisitRoot {boolean} true if visiting root should be included
    */
    _nostop_postOrder(visit, info) {
        var callChild = function (frame, isLast) {
            frame._nostop_postOrder(visit);
            visit(frame, isLast, frame.hasChildren());
        };
        this.eachFrame(callChild);
    }

    /** Recursive tree traversal
    @param visitor {Function} called for each frame of subtree, visits parents first
            if visitor returns false the traversal is stopped
    @param bVisitRoot {boolean} true if visiting root should be included
    */
    traverse(visitor, doVisitRoot) {
        let info = { depth: 0, doContinue: true };
        if (doVisitRoot) {
            visitor(this, info); // isLast: true
        }
        // this._nostop_preOrder(visitor, info);
        this._preOrder(visitor, info);
    }

    //========================================================================

    addItem(item) {
        this._items.push(item);
    }

    removeItem(item) {
        let it = _item => _item === item;
        this._items = this._items.filter(it);
    }

    eachItem(cb) {
        this._items.forEach(cb);
    }

    //========================================================================

    /** recursively steps through the frame tree and calls draw
     *  on each attached item
     *  @param {CanvasRenderingContext2D}
     */
    draw(ctx) {
        let cos = Math.cos(this.w) * this._s;
        let sin = Math.sin(this.w) * this._s;
        ctx.setTransform(cos, -sin, sin, cos, this.x, this.y);

        // recursively traverses the tree of frames
        let frameIt = frame => {
            frame.draw(ctx);
        };
        this.eachChild(frameIt);

        // post-order call => leaves of tree are drawn first
        let drawIt = function (item) {
            ctx.save();
            item.draw(ctx, this);
            ctx.restore();
        };
        this.eachItem(drawIt);
    }

    //========================================================================

    // todo: incomplete, add x, y, w, h, s
    toString() {
        return JSON.stringify({
            name: this._name,
            x: this.x,
            y: this.y,
            angle: this.angle,
            scale: this.scale,
            numChildren: this._children.length
        });
    }

    print() {
        var stack = [];
        var pre = "";
        var tab = "│ ";
        var parentIcon = "├─┬ "; //"\u02eb"
        var childIcon = "├── ";
        var childIconLast = "└── "; //"\u02ea"

        console.log(this.name);

        this.traverse((frame, info) => {
            console.log(pre + (info.hasChildren ? parentIcon : (info.isLast ? childIconLast : childIcon)) + frame.name);

            if (info.hasChildren) {
                if (! info.isLast) {
                    stack.push(pre); // save pre only if not last child node
                }
                pre += tab; // new parent
            }
            else if (info.isLast) {
                pre = stack.pop(); // recover old pre
            }

        }, false);
    }
}

//========================================================================
module.exports = Frame;
var MICAGE = MICAGE || {};
Object.assign(MICAGE, module.exports);
