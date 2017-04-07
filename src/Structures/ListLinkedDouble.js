"use strict";
import ListItemDouble from "./ListItemDouble";


class Iterator {
    constructor(list, startItem) {
        this.current = startItem instanceof ListItemDouble ? startItem : list.head;
        this.list = list;
    }
    value() {
        return this.current ? this.current.data : undefined;
    }
    next() {
        if (this.current) {
            this.current = this.current.next;
        }
        return this;
    }
    previous() {
        if (this.current) {
            this.current = this.current.previous;
        }
        return this;
    }
}


class ListLinkedDouble {
    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    /** get an iterator for the given object
        B will be inserted at the lists' end
        @param obj: any
        @returns ListItemDouble<any>
    */
    getIterator(obj) {
        for (var item = this._head; item; item = item.next) {
            if (item.data === obj) {
                return new Iterator(this, item);
            }
        }
    }

    /** @returns number */
    get length() {
        return this._length;
    }

    /** @returns any */
    get head() {
        return this._head ? this._head.data : undefined;
    }

    /** inserts object at the head of the list
    * @param obj: any
    */
    set head(obj) {
        this.insertBefore(obj);
    }

    /** @returns any */
    get tail() {
        return this._tail ? this._tail.data : undefined;
    }

    /** inserts object at the tail of the list
    * @param obj: any
    */
    set tail(obj) {
        this.insertAfter(obj);
    }

    /** inserts object at the head of the list
    * @param obj: any - same as this.head = obj
    */
    push(obj) {
        this.insertBefore(obj);
    }

    /**
    * @returns any - returns head.data and removes the head entry
    */
    pop() {
        if (this._head) {
            let oldHead = this._head;
            this._head = oldHead._next;
            oldHead.vanish();
            this._length--;
            if (this._length === 0) {
                this._tail = null;
            }
            return oldHead.data;
        }
        return undefined;
    }

    /** insert A before B, if called without A,
        B will be inserted at the lists' end
        @param A: any
        @param B: any
    */
    insertBefore(A, B) {
        if (!A) {
            // A is falsy and cannot be inserted
            return false;
        }

        var newItem = new ListItemDouble(A),
            oldLength = this._length;

        if (!this._head) {
            // list is empty
            this._head = newItem;
            this._tail = this._head;
            this._length++;
        }

        else {
            if (!B) {
                // B is falsy so A will be new head
                this._head.previous = newItem;
                this._head = newItem;
                this._length++;
            }
            else {
                // find B in the list
                for (var item = this._head; item; item = item.next) {
                    if (item.data === B) {
                        item.previous = newItem;
                        this._length++;
                        break;
                    }
                }
            }
        }

        return oldLength !== this._length ? true : false;
    }

    /** insert B after A, if called without A,
        B will be inserted at the lists' end
        @param B: any
        @param A: any
    */
    insertAfter(B, A) {
        if (!B) {
            // B is falsy and cannot be inserted
            return false;
        }

        var newItem = new ListItemDouble(B),
            oldLength = this._length;

        if (!this._head) {
            // list is empty
            this._head = new ListItemDouble(B);
            this._tail = this._head;
            this._length++;
        }
        else {
            if (!A) {
                // A is falsy so B will be new tail
                this._tail.next = newItem;
                this._tail = newItem;
                this._length++;
            }
            else {
                // find A in the list
                for (var item = this._head; item; item = item.next) {
                    if (item.data === A) {
                        item.next = newItem;
                        this._length++;
                        break;
                    }
                }
            }
        }

        return oldLength !== this._length ? true : false;
    }

    /** removes object from the list
        @param obj: any
    */
    remove(obj) {
        let oldLength = this._length;
        if (this._head && this._head.data === obj) {
            let newHead = this._head.next;
            this._head.vanish();
            this._head = newHead;
            this._length--;
        } else if (this._tail && this._tail.data === obj) {
            let newTail = this._tail.previous;
            this._tail.vanish();
            this._tail = newTail;
            this._length--;
        } else {
            for (var item = this._head; item; item = item.next) {
                if (item.data === obj) {
                    item.vanish();
                    this._length--;
                    break;
                }
            }
        }
        if(oldLength !== this._length && this._length === 0) {
            this._tail = null;
        }
    }

    /** calls function cb for each object in the list
    @param cb: (obj: any) => void
    */
    forEach(cb) {
        for (var item = this._head; item; item = item.next) {
            cb(item.data);
        }
    }

    /** calls function cb for each object in the list and returns true for the
    first element that fulfills the condition function otherwise false
    @param cb: (obj: any) => any;
    @returns boolean
    */
    some(cb) {
        for (var item = this._head; item; item = item.next) {
            if (cb(item.data)) {
                return true;
            }
        }
        return false;
    }

    contains(obj) {
        for (var item = this._head; item; item = item.next) {
            if (item.data === obj) return true;
        }
        return false;
    }

    /**
    @param cb: (obj: any) => boolean;
    @returns ListLinkedDouble,
    */
    filter(cb) {
        var list = new ListLinkedDouble();
        for (var item = this._head; item; item = item.next) {
            if (cb(item.data) !== false ) {
                list.tail = item.data;
            }
        }
        return list;
    }

    /** @returns {Array} */
    toArray() {
        var arr = [];
        for (var item = this._head; item; item = item.next) {
            arr.push(item.data);
        }
        return arr;
    }

    /** @returns {string} */
    toString() {
        if (!this._head) {
            return "";
        }
        for (var item = this._head, arr = []; item; item = item.next) {
            arr.push(item.data);
        }
        return arr.join(", ");
    }
}

//==============================================================================
if (module.hot) {
    module.hot.accept();
}

//==============================================================================
module.exports = ListLinkedDouble;
if (typeof window !== 'undefined') Object.assign(window.MICAGE = window.MICAGE || {}, {
    ListLinkedDouble
});
