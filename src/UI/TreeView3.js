// TODO: get jquery out of the code, asap!

import './TreeView3.less';
import 'font-awesome/css/font-awesome.css';
import Console from "./Console";

const ICON_CLASS = 'fa';
const _ICON_CLASS = '.fa';
// const ICON_EXPANDED_CLASS = 'fa-minus-square';
const ICON_EXPANDED_CLASS = 'fa-caret-down';
// const ICON_COLLAPSED_CLASS = 'fa-plus-square';
const ICON_COLLAPSED_CLASS = 'fa-caret-right';

const NODE_DRAGGED = 'drag-image';
const ICON_DRAG_GOOD = 'fa-thumbs-o-down drag-ok';
const ICON_DRAG_BAD = 'fa-thumbs-o-down drag-notok';

const NODE_COLLAPSED_CLASS = 'collapsed';
const NODE_INVISIBLE_CLASS = 'not-visible';
const NODE_SELECTED_CLASS = 'selected';
const TREE_CLASS = 'mmm-treeview';
const NODE_CLASS = 'tree-node';
const _NODE_CLASS = '.tree-node';
const NODE_LABEL_CLASS = 'tree-node-label';
const _NODE_LABEL_CLASS = '.tree-node-label';

const NODE_INDENTATION = 16; // pixels


const _handleClickTree = function(evt) {
    let clickedElement = evt.srcElement ? $(evt.srcElement) : $(evt.originalTarget); // Grrh!
    // possible srcElement: tree, listitem, label, icon

    if ( clickedElement.hasClass(ICON_CLASS) ) {
        this.toggle(clickedElement.parent().parent()); // toggle expects a listitem
    }
    else if ( clickedElement.hasClass(NODE_LABEL_CLASS) ) {
        _onSelect.call(this, evt); // toggle expects a label, already in ev.target
    }
    else {
        _onSelect.call(this, { target: null });
    }

};

const _isTargetOk = function(srcSpan, dstSpan) {
    // 0) it's not from our tree instance
    if (!srcSpan) {
        return false;
    }
    // 1) dstSpan equals srcSpan
    if (dstSpan === srcSpan) {
        return false;
    }

    // 2) dstItem equals parent of srcItem
    let srcItem = srcSpan.parentNode;
    let srcGroup = srcItem.parentNode; // ul
    let srcParentItem = srcGroup.parentNode; // li.tree-node
    if (dstSpan.parentNode === srcParentItem) {
        return false;
    }

    // 3) anchestors of dstItem contain srcItem
    if ($(dstSpan).closest(srcItem).length !== 0) {
        return false;
    }

    // 4) Todo: from a different tree -> see above 0)

    // 5) Todo: user defined

    if ($(dstSpan).hasClass(NODE_CLASS)) {
        return false;
    }

    return true;
};

const _handleDragStart = function(ev) {
    // w3c: Cancelable
    Console.log('drag start: ' + ev.target.innerText);

    // only item labels can be dragged
    if ( $(ev.target).hasClass(NODE_LABEL_CLASS) ) {
        // ev.target.style.opacity = 0.5;

        // Todo: this shoudn't be necessary, -> use setData, but what MIME-type?
        this._draggedNode = ev.target; // li.tree-node-label

        // “none”, “copy”, “copyLink”, “copyMove”, “link”,
        // “linkMove”, “move”, “all”, “uninitialized”
        ev.dataTransfer.effectAllowed = 'copyMove'; // ???

        ev.dataTransfer.setData('text/plain', ev.target.innerText);
    }
    else {
        ev.preventDefault();
    }
};

/** handle dragenter event
 *  Cancelable: yes,
 *  Default Action: Reject immediate user selection as potential target element
 *  dropEffect: Based on effectAllowed value
 */
const _handleDragEnter = function(ev) {
    let $element = $(ev.target);

    // Firefox fix, it gives a text node instead of list item
    if (ev.target.constructor.name === "Text") {
        $element = $(ev.target.parentNode);
    }

    // ev.dataTransfer.dropEffect = 'move';

    // drag over a node label
    if ( $element.hasClass(NODE_LABEL_CLASS) ) {
        Console.log('drag enter: ' + $element.text()
            + ' effect: ' + ev.dataTransfer.dropEffect);

        if (_isTargetOk(this._draggedNode, ev.target)) {
            ev.preventDefault();
            $element.addClass('over');
            // dragImage.setOk();
            // $(ev.target).parent().addClass('over-item');
        }
    }

    // drag over list item or 'mmm-tree' (this is the empty space inside the div)
    else if ( $element.hasClass(NODE_CLASS) || $element.hasClass(TREE_CLASS) ) {
        Console.log('drag enter: / effect: ' + ev.dataTransfer.dropEffect);
        ev.preventDefault();
    }

    // else this is not from our tree -> default action applies
};

/** handle dragover event
 *  Cancelable: yes
 *  dropEffect: Based on effectAllowed value
 *  Default Action: Reset the current drag operation to "none"
 */
const _handleDragOver = function(ev) {
    let $element = $(ev.target);

    // Firefox fix, it gives a text node instead of list item
    if (ev.target.constructor.name === "Text") {
        $element = $(ev.target.parentNode);
    }

    // drag over a node label
    if ( $element.hasClass(NODE_LABEL_CLASS) ) {
        // Console.log('drag over: ' + ev.target.innerText + ' effect: ' + ev.dataTransfer.dropEffect);
        if (_isTargetOk(this._draggedNode, ev.target)) {
            ev.preventDefault();
        }
    }

    // drag over list item or 'mmm-tree' (this is the empty space inside the div)
    else if ( $element.hasClass(NODE_CLASS) || $element.hasClass(TREE_CLASS) ) {
        // Console.log('drag over: /');
        ev.preventDefault();
    }

    // else this is not from our tree -> default action applies
};

/** handle dragleave event
 *  Cancelable: no,
 *  Default Action: None
 *  dropEffect: "none"
 */
const _handleDragLeave = function(ev) {
    let $element = $(ev.target);

    // Firefox fix, it gives a text node instead of list item
    if (ev.target.constructor.name === "Text") {
        $element = $(ev.target.parentNode);
    }

    // Console.log('drag leave: ' + ev.target.innerText);
    $element.removeClass('over');
    // $(ev.target).parent().removeClass('over-item');
};
const _handleDrop = function(ev) {
    // this._draggedNode is a label, it's parent is a list item, drop source
    // ev.target is the drop target

    let srcItem = this._draggedNode.parentNode; // li.tree-node
    let dstElement = ev.target;
    let dstItem = null;

    // ev.target is a label, so dstItem is it's parent
    if (dstElement.classList.contains(NODE_LABEL_CLASS)) {
         dstItem = ev.target.parentNode; // li.tree-node
    }

    // ev.target is a list item or the tree itself
    // in both cases the dragged label will be dropped to root of treeview
    else if (dstElement.classList.contains(NODE_CLASS) || dstElement.classList.contains(TREE_CLASS) ) {
        Console.log('dropped: ' + this._draggedNode.innerText + " onto: /");
        dstItem = this._parent; // it has a UL so it's ok, although it's not a listitem
    }
    else {
        return; // can this happen?
    }

    // remove group and icon if old parent gets empty
    let srcGroup = srcItem.parentNode;
    let srcGroupIcon = srcGroup.previousElementSibling ?
        srcGroup.previousElementSibling.children.item(0) : null;

    let isSingleChild = !srcItem.previousElementSibling && !srcItem.nextElementSibling;
    srcItem.parentNode.removeChild(srcItem);
    if (isSingleChild) {
        srcGroup.parentNode.removeChild(srcGroup);
        srcGroupIcon.classList.remove(ICON_COLLAPSED_CLASS);
        srcGroupIcon.classList.remove(ICON_EXPANDED_CLASS);
    }

    _addItem.bind(this)(srcItem, dstItem);
    srcItem.classList.toggle(NODE_INVISIBLE_CLASS);

    dstElement.classList.remove('over');

    ev.preventDefault();
    ev.stopPropagation(); // prevents bubbling up (label -> listItem -> treeView)
};

const _handleDragEnd = function(ev) {
    // ev.target.style.opacity = '';
    Console.log('drag end: ' + ev.target.innerText);
};

const _onSelect = function(ev) { // ev.target = $('li > span')
    let prevSelectedItem = this._selectedItem;
    $(this._selectedItem).toggleClass(NODE_SELECTED_CLASS);
    this._selectedItem = ev.target;
    if (this._selectedItem) {
        $(this._selectedItem).toggleClass(NODE_SELECTED_CLASS);
    }

    let cb = this._options.onSelect;
    if (typeof cb === 'function') {
        cb.bind(this)(this._selectedItem, prevSelectedItem);
    }
};

const _createItem = function(node) {
    let li = document.createElement('li');
    li.classList.add(NODE_CLASS);
    li.classList.add(NODE_INVISIBLE_CLASS);
    li.nodeDepth = node.depth;

    let span = document.createElement('span');
    span.classList.add(NODE_LABEL_CLASS);
    span.textContent = this._options.onLabel(node);
    span.setAttribute('draggable', 'true');
    span.style.paddingLeft = (node.depth - 1) * NODE_INDENTATION + 'px';
    li.appendChild(span);
    li.label = span; // for faster access

    let icon = document.createElement('i');
    icon.classList.add(ICON_CLASS);
    span.appendChild(icon);
    span.icon = icon; // for faster access
    if(node.hasChildren) {
        icon.classList.add(ICON_COLLAPSED_CLASS);
    }

    return li;
};

/** adjust new node depth and padding/indentation of label */
const AdjustNodeDepth = function(srcItem, dstItem) {
    let srcLabels = srcItem.getElementsByClassName(NODE_LABEL_CLASS);
    let diffDepth = dstItem.nodeDepth - srcItem.nodeDepth;

    for (let i = 0; i < srcLabels.length; i++) {
        let depth = srcLabels[i].parentNode.nodeDepth + diffDepth + 1;
        srcLabels[i].parentNode.nodeDepth = depth;
        srcLabels[i].style.paddingLeft = (depth - 1) * NODE_INDENTATION + 'px';
    }
}

const _addItem = function(srcItem, dstItem) {
    // $srcItem = drag source, $dstItem = drop target
    
    AdjustNodeDepth(srcItem, dstItem);
    
    let $dstGroup = $(dstItem).children('ul'); // get the group element

    // destination item has no children, so create a group
    if ($dstGroup.length === 0) {
        $dstGroup = $('<ul>')
            .attr('role', 'group')
            .appendTo($(dstItem));

        // initially all parent nodes are collapsed
        dstItem.classList.add(NODE_COLLAPSED_CLASS);

        // icon is child of label
        dstItem.label.icon.classList.add(ICON_COLLAPSED_CLASS);
    }

    // target item is not collapsed so make the new child visible
    if( ! dstItem.classList.contains(NODE_COLLAPSED_CLASS) ) {
        srcItem.classList.toggle(NODE_INVISIBLE_CLASS);
    }

    $dstGroup[0].appendChild(srcItem);
};

const _init = function(rootNode, options) {
    this._parent.nodeDepth = 0;

    this._parent.addEventListener('dragstart', _handleDragStart.bind(this), false);
    this._parent.addEventListener('dragenter', _handleDragEnter.bind(this), false);
    this._parent.addEventListener('dragover', _handleDragOver.bind(this), false);
    this._parent.addEventListener('dragleave', _handleDragLeave.bind(this), false);
    this._parent.addEventListener('drop', _handleDrop.bind(this), false);
    this._parent.addEventListener('dragend', _handleDragEnd.bind(this), false);

    // click tree or listitem -> selects root
    // click icon -> toggle visibility of child nodes
    // click label -> selects it
    this._parent.addEventListener('click', _handleClickTree.bind(this), false);

    // create root list as child of $parent
    let ul = document.createElement('ul');
    ul.setAttribute('role', 'group');
    this._parent.appendChild(ul);

    // init stack with root list
    let _stack = [ ul ];

    // visitor of node hierarchy
    const createULorLI = function(node) {

        let li = _createItem.bind(this)(node);
        ul.appendChild(li);

        if (node.hasChildren) {
            if (! node.isLastChild) {
                _stack.push(ul); // save parent
            }

            ul = document.createElement('ul');
            ul.setAttribute('role', 'group');
            li.appendChild(ul);

            // initially all parent nodes are collapsed
            li.classList.add(NODE_COLLAPSED_CLASS);
        }
        else if (node.isLastChild) {
            ul = _stack.pop(); // recover old parent
        }
    };

    // create <ul>/<li>-hierarchy
    // 2nd param means do not visit rootFrame
    rootNode.traverse(createULorLI.bind(this), false);

    // make children of root visible
    for (let i = 0; i < ul.childNodes.length; i++) {
        let child = ul.childNodes.item(i);
        child.classList.toggle(NODE_INVISIBLE_CLASS);
    }

    // mimick a click to select root
    _onSelect.call(this, { target: null });
};

/** Note on ES6 class concept
    It would be nice to have real private instance variables
    too completely hide implementation details from the outside world.
    I will not juggle with WeakMap or closures. It has to be a
    language feature. In case of class (static) variables or private
    functions the closure mechanism works pretty well - although ugly.
    Because for each call to a private closure function the calling context
    has to be bound:
        privateMethod.bind(this)(args)
    That leads to the situation where the lion's share of the
    implementation happens outside of the class body. That's no good.
    Most of the time this feels like a workaround.
    What's the profit of having a class while it isn't?
    To fool coders coming from real object-oriented languages by
    making them feel comfortable while they are sitting on a powder cag.
*/
class TreeView3 {
    constructor(parent, rootNode, options) { // parent = 'div.mmm-tree'
        this._$parent = $(parent);
        this._parent = parent;
        this._selectedItem = null;
        this._draggedNode = null;
        this._options = {
            onLabel: (node) => node.id || 'unknown',
            onSelect: (node) => {}
        };
        Object.assign(this._options, options);

        _init.bind(this)(rootNode, this._options);
    }

    // Todo: synchronize tree
    addchild($parent, childName, childData) {
    }

    // Todo: synchronize tree
    addChildToSelection(childName, childData) {
        let dstItem;
        if (this._selectedItem) {
            dstItem = this._selectedItem.parentNode;
        }
        else {
            dstItem = this._parent;
        }

        _addItem.bind(this)(
            _createItem.bind(this)({
                id: childName,
                data: childData
            }),
            dstItem
        );
    }

    // Todo: synchronize tree
    removeSelection() {
        if (this._selectedItem) {
            this.remove($(this._selectedItem.parentNode));
            this._selectedItem = null;
        }
    }

    // Todo: synchronize tree
    remove($item) {
        // remove group and icon if old parent gets empty
        let $srcGroup = $item.closest('ul');
        let $srcGroupIcon = $srcGroup.siblings(_ICON_CLASS);
        let isSingleChild = $item.siblings(_NODE_CLASS).length === 0;
        $item.remove();
        if (isSingleChild) {
            $srcGroup.remove();
            $srcGroupIcon.off().remove(); // todo: is it necessary to off()?
        }
    }

    toggle($item) {
        $item.toggleClass(NODE_COLLAPSED_CLASS);

        let $icon = $item.children('span').children('i.fa');
        $icon.toggleClass(ICON_EXPANDED_CLASS);
        $icon.toggleClass(ICON_COLLAPSED_CLASS);

        // toggles visibility of $item's children
        $item.children('ul').children('.tree-node').toggleClass(NODE_INVISIBLE_CLASS);
    }

    toggleSelection() {
        this.toggle($(this.selected.parentNode));
    }

    get selected() { return this._selectedItem; }

    get fullPathOfSelection() {
        let $sel = $(this._selectedItem);
        if (this._selectedItem) {
            let arr = $sel.parents(_NODE_CLASS).map(function() {
                return $(this).find(' > .tree-node-label').text();
            });
            return arr.get().reverse().join('.');
        }
        return '/';
    }

    traverse(cb) {
        let keepGoing = true;
        let _preorder = (i, li) => {
            if (keepGoing) {
                keepGoing = cb.call(this, li) === false ? false : true;
                $(li).find(' > ul').children(_NODE_CLASS).each(_preorder.bind(this));
            }
        };
        _preorder(0, this._parent);
    }

    // Todo: more sophisticated find like find('Human.Head')
    find(labelText) {
        let found = null;
        this.traverse(($li) => {
            let $lbl = $li.children('span');
            if($lbl.text() === labelText) {
                found = { $item: $li, $label: $lbl };
                return false; // stop further traversal
            }
        });
        return found;
    }

    select(labelText) {
        let found = this.find(labelText);
        if (found) {
            // call the click handler
            _onSelect.call(this, { target: found.$label[0] });

            // expand parent chain
            let tv = this;
            $(this.selected).parents('li').each(function() {
                // 'this' is a DOM element here !!!
                if ($(this).hasClass(NODE_COLLAPSED_CLASS)) {
                    tv.toggle($(this));
                }
            });

            // scroll into view
            tv._parent.scrollTop = 0; // reset scroll view
            let y0 = this._parent.offsetTop;
            let y1 = this.selected.offsetTop;
            Console.log('mmm-tree offset.top: ' + y0);
            Console.log('selected offset.top: ' + y1);
            this._parent.scrollTop = y1 - y0;
        }
    }

}

//======================================================================
module.exports = TreeView3;

//======================================================================
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        TreeView3
    });
}
