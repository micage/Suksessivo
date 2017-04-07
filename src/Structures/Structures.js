
const Debug = {
    CheckType: function(str, type, line) {
        "use strict";
        if (typeof str !== type) {
            throw new TypeError("MICAGE: " + str + " is not a " + type);
        }
    },
    CheckArray: function(arr) {
        if (! Array.isArray(arr)) {
            throw new TypeError("MICAGE: not an Array ");
        }
    }
};

const Node = function(name) {
    var self = { getClass: () => "Node" },
        _name = name,
        _children = [],
        _parent,
        end;

    self.data = undefined; // full read and write access, multi-purpose member

    self.__defineGetter__("parent", function() { return _parent; });
    self.__defineGetter__("children", function() { return _children; });
    self.__defineGetter__("name", function() { return _name; });
    self.__defineSetter__("name", function(name) {
        MICAGE.Debug.CheckType(name, "string");
        _name = name;
    });

    /**
    @param f {object} existing frame to be added as child
    */
    self.add = function(name) {
        MICAGE.Debug.CheckType(name, "string");
        var node = Node(name);
        node._parent = this; // mmm: circular dependency, will this leak?
        node._index = _children.push(node);
        return node;
    };

    /**
    @param nameArray {array} Array of node names to be added as child
    */
    self.addMore = function(nameArray) {
        var added = [];
        MICAGE.Debug.CheckArray(nameArray);
        nameArray.forEach(function(name) {
            added.push(self.add(name));
        });
        return added;
    };

    /**
    @param name {string} find Node with the given name
    @return {object} returns Node with that name
    */
    self.get = function(name) {
        MICAGE.Debug.CheckType(name, "string");
        var foundNode;
        var hasName = function(node, i) {
            if(name === node.name) {
                node._index = i;
                foundNode = node;
                return true;
            }
            return false;
        };
        if (_children.some(hasName)) {
            return foundNode;
        }
    };

    /**
    @param name {string} removes node with the given name
    @return true, if node was deleted
    */
    self.remove = function(name) {
        MICAGE.Debug.CheckType(name, "string");
        var foundNode = self.get(name);
        if (foundNode) {
            // mmm: break circular dependency before deleting node? has to be done recursively.
            //      postOrder -> leaf nodes first
            delete _children[foundNode._index]; // _index is valid after get()-call
            return true;
        }
        return false;
    };

    /**
    moves this node including it's subtree to a new parent
    does nothing, if parent does not exist
    @param name {string} new parents' name
    */
    self.moveTo = function(name) {
        throw new Error("not yet implemented")
        // disconnect from old parent
        // add to new parent
    };

    /**
    @param cb {Function} function called for each child
    */
    self.eachChild = function(cb) {
        var callChild = function(child, i) {
            cb(child, i===len ? true : false); // last: i=true
        },
        len = _children.length-1;
        _children.forEach(callChild);
    };

    /**
    @param cb {Function} function called for each child object attached
    */
    self.eachChildObject = function(cb) {
        var callChildObj = function(node) {
            cb(node);
        };
        self._attached.forEach(callChildObj);
    };

    /**
    @param cb {Function} function called for each child recursivly
    */
    self.preOrder = function(cb, bVisitRoot) {
        var callNode = function(node, isLast){
            cb(node, isLast, node.children.length);
            node.preOrder(cb);
        };
        if (bVisitRoot) {
            cb(this, true, _children.length);
        }
        self.eachChild(callNode);
    };

    self.postOrder = function(cb, bVisitRoot) {
        var callNode = function(node, isLast) {
            node.postOrder(cb);
            cb(node, isLast, node.children.length);
        };
        if (bVisitRoot) {
            cb(this, true, _children.length);
        }
        self.eachChild(callNode);
    };

    self.numChildren = function() {
        return _children.length;
    };

    return self;
};

const Test = function() {
    console.log("Running Test2");
};

module.exports = { Debug, Node, Test };
Object.assign(window.MICAGE = window.MICAGE || {}, module.exports);
