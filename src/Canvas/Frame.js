
type FrameParamType = {
    x: number,
    y: number,
    scale: number,
    angle: number
};

// type FrameCallbackInfoType = {
//     bIsLastChild: boolean,
//     bHasChildren: boolean,
//     depth: number
// };

type FrameInfoType = {
    doContinue: boolean,
    hasChildren: boolean,
    isLastChild: boolean,
    depth: number
};

type FrameVisitorType = (
    frame: Frame,
    info: FrameInfoType
) => boolean;

type FrameIteratorType = (
    f: Frame,
    info: FrameInfoType
) => boolean;

type ItemIteratorType = (item) => boolean;

const PI_OVER_180 = Math.PI / 180;

const DefaultParams = {
    x: 0,
    y: 0,
    scale: 1,
    angle: 0
};

class Frame {
    constructor(params: FrameParamType) {
        let pp = Object.assign({}, DefaultParams, params || {});
        this._name = null;
        this._x = pp.x;
        this._y = pp.y;
        this._s = Number.equals(pp.scale, 0) ? 1e-7 : pp.scale;
        this._angle = pp.angle;
        this._parent = null;
        this._children = [];
        this._items = [];
    } // end of constructor

    //========================================================================
    get name(): string { return this._name; }
    set name(name: string) {
        if (typeof name === 'string' && name.length > 0) {
            this._name = name;
        }
    }

    get scale(): number { return this._s; }
    set scale(s: number) { Number.equals(s, 0) ? this._s = 1e7 : this._s = s;}

    getRootScale(): number {
        let s = this._s, parent = this._parent;
        while (parent) {
            s *= parent.s;
            parent = parent._parent; // one level up
        }
        return s;
    }

    getPosition(): { x: number, y: number } {
        return { x: this._x, y: this._y };
    }
    setPosition(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    getRootPosition(): { x: number, y: number } {
        var x = this.x, y = this.y, parent = this._parent;
        while (parent) {
            x += parent.x;
            y += parent.y;
            parent = parent._parent; // one level up
        }
        return { x, y };
    }

    //========================================================================

    hasChildren(): boolean {
        return (this._children.length > 0);
    }

    isLastChild(): boolean {
        let n = this._parent.getNumChildren();
        for (let i = 0; i < n-1; i++) {
            if (this._parent.getChild(i) === this && i !== (n-1) ) {
                return true;
            }
        }
    }

    findByName(name: string): Frame {
        return this._children.find((f: Frame): boolean => f.name === name) || null;
    }

    findByIndex(index: number): Frame {
        if( 0 <= index && index < this._children.length) {
            return this._children[index];
        }
        return null;
    }

    getNumChildren(): number { return this._children.length; }

    getParent(): Frame {
        return this._parent;
    }
    // todo: not so easy, remove from parent if exists
    setParent(p: Frame) {
        this._parent = p;
    }

    addChild(child: Frame): Frame {
        if (child._parent) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        this._children.push(child);
        return child;
    }

    removeChild(child: Frame): Frame {
        this._children = this._children.filter((f: Frame): boolean => child === f);
        child._parent = null;
        return child;
    }

    eachFrame(cb: FrameIteratorType) {
        let len = this._children.length;
        for(let i = 0; i < len; i++) {
            let ret = cb(this._children[i]);
            if(typeof ret === "boolean" && ret === false) {
                return;
            }
        }
    }

    // allows stopping of traversal if callback returns false
    _preOrder(visitor: FrameCallbackType, info: Frame) {
        for(var i = 0; i < this._children.length; i++) {
            if(info.bContinue !== false) {
                let frame = this._children[i];

                info.bIsLast = i === this._children.length - 1 ? true : false;
                info.bHasChildren = frame.hasChildren();
                info.bContinue = visitor(frame, info);

                if (info.bHasChildren) {
                    info.depth++;
                    frame.preOrder(visitor, info);
                    info.depth--;
                }
            }
        }
    }

    /**
    @param visitor {Function} called for each frame of subtree, visits parents first
    @param bVisitRoot {boolean} true if visiting root should be included
    */
    _nostop_preOrder(visitor: FrameCallbackType) {
        var callNode = function(frame: Frame) {
            visitor(frame);
            frame._nostop_preOrder(visitor);
        };
        this.eachFrame(callNode);
    }

    /**
    @param visit {Function} called for each frame of subtree, visits children first
    @param bVisitRoot {boolean} true if visiting root should be included
    */
    _nostop_postOrder(visit: FrameCallbackType) {
        var callChild = function(frame: Frame, isLast: boolean) {
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
    traverse(visitor: FrameVisitorType, doVisitRoot: boolean = true) {

        let info: FrameInfoType = {
            depth: 0,
            doContinue: true,
            isLastChild: true,
            hasChildren: this.hasChildren()
        };

        if (doVisitRoot) {
            visitor(this, info);
        }

        this._preOrder(visitor, info);
    }

    //========================================================================

    addItem(item: Item) {
        this._items.push(item);
    }

    removeItem(item: Item) {
        let it = (_item: Item): boolean => _item === item;
        this._items = this._items.filter(it);
    }

    eachItem(cb: ItemIteratorType) {
        this._items.forEach(cb);
    }

    //========================================================================

    /** recursively steps through the frame tree and calls draw
     *  on each attached item
     *  @param {CanvasRenderingContext2D}
     */
    draw(ctx: CanvasRenderingContext2D) {
        // recursively traverses the tree of frames
        let frameIt = (frame: Frame) => {
            frame.draw(ctx);
        };
        this.eachFrame(frameIt);

        // post-order call => leaves of tree are drawn first
        let cos = Math.cos(this._angle * PI_OVER_180) * this._s;
        let sin = Math.sin(this._angle * PI_OVER_180) * this._s;
        ctx.setTransform(cos, -sin, sin, cos, this._x, this._y);

        let drawIt = function(item: Item) {
            ctx.save();
            ctx.lineWidth /= Math.abs(this._s);
            item.draw(ctx, this);
            ctx.restore();
        };
        this.eachItem(drawIt.bind(this));
    }

    //========================================================================

    // todo: incomplete, add x, y, w, h, s
    toString(): string {
        return this._name + ": (" + this._children.length + ")";
    }
}


//========================================================================
module.exports = Frame;
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        Frame
    });
}
