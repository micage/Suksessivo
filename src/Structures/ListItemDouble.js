"use strict";

class ListItemDouble {
    constructor(data) {
        this.data = data;
        this._next = null;
        this._previous = null;
    }

    /** Sets the successor of this item
     *  A has to be a newly created item (A.next === null, A.previous === null)
     *  let A = new Item();
     *  A.next = ItemInAList; // will throw
     *  ItemInAList.next = A; // is ok
     *
     *  @param A {ListItemDouble}
     */
    set next(A) {
        if (A._next || A._previous) {
            throw new Error("A is already in a list.");
        }
        if (this._next) {
            this._next._previous = A;
            A._next = this._next;
        }
        A._previous = this;
        this._next = A;
    }

    /** gets the next item of this item
     * @returns {ListItemDouble}
     */
    get next() {
        return this._next;
    }

    /** Sets the predecessor of this item
     *  A has to be a newly created item (A.next === null, A.previous === null)
     *  let A = new Item();
     *  A.previous = ItemInAList; // will throw
     *  ItemInAList.previous = A; // is ok
     *
     *  @param A {ListItemDouble}
     */
    set previous(A) {
        if (A._next || A._previous) {
            throw new Error("A is already in a list.");
        }
        if (this._previous) {
            this._previous._next = A;
            A._previous = this._previous;
        }
        A._next = this;
        this._previous = A;
    }

    /** gets the previous item of this item
     * @returns {ListItemDouble}
     */
    get previous() {
        return this._previous;
    }

    vanish() {
        if (this._previous) {
            this._previous._next = this._next;
        }
        if (this._next) {
            this._next._previous = this._previous;
        }
        this._previous = null;
        this._next = null;
    }

    /**
    *   @param cb = (x: ListItemDouble) => boolean
    */
    forNext(cb) {
        let item = this;
        let result;
        do {
            result = cb(item);
            if (!(typeof result === "boolean")) {
                result = true;
            }
            item = item._next;
        } while (item && result);
    }

    /**
    *   @param cb = (x: ListItemDouble) => boolean
    */
    forPrevious(cb) {
        let item = this;
        let result;
        do {
            result = cb(item);
            if (typeof result !== "boolean") {
                result = true;
            }
            item = item._previous;
        } while (item && result);
    }

}

//==============================================================================
if (module.hot) {
    module.hot.accept();
}

//==============================================================================
module.exports = ListItemDouble;
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        ListItemDouble
    });
}
