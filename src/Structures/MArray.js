"use strict";

class MArray extends Array {
    constructor(...args: Array<T>) {
        super(...args);
    }
    get head(): T {
        return this[0];
    }
    set head(item: T) {
        this.insertBefore(item);
    }

    get tail(): T {
        return this[this.length - 1];
    }
    set tail(item: T) {
        this.insertAfter(item);
    }

    without(item: T): Array<T> {
        return this.filter((v: T): boolean => v !== item);
    }

    insertBefore(item: T, at: T): Array<T> {
        let index = this.indexOf(at);
        if (index < 0) {
            index = 0;
        } else {
            index;
        }
        this.splice(index, 0, item);
        return this;
    }

    insertAfter(item: T, at: T): Array<T> {
        let index = this.indexOf(at);
        if (index < 0) {
            index = this.length;
        } else {
            index++;
        }
        this.splice(index, 0, item);
        return this;
    }
}

export default MArray;
Object.assign(window.MICAGE = window.MICAGE || {}, {MArray});
