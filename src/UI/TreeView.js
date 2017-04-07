/*eslint no-unused-vars: "off"*/

// import 'jquery'; // provided by webpack.ProvidePlugin
import 'font-awesome/css/font-awesome.css';
import './TreeView2.less';
import 'font-awesome/css/font-awesome.css';

const ICON_CLASS = 'fa';
const _ICON_CLASS = '.fa';
// const ICON_EXPANDED_CLASS = 'fa-minus-square';
const ICON_EXPANDED_CLASS = 'fa-caret-down';
// const ICON_COLLAPSED_CLASS = 'fa-plus-square';
const ICON_COLLAPSED_CLASS = 'fa-caret-right';
const NODE_COLLAPSED_CLASS = 'collapsed';
const NODE_INVISIBLE_CLASS = 'not-visible';
const NODE_SELECTED_CLASS = 'selected';
const TREE_CLASS = 'mmm-tree';
const NODE_CLASS = 'tree-node';
const _NODE_CLASS = '.tree-node';
const NODE_LABEL_CLASS = 'tree-node-label';
const _NODE_LABEL_CLASS = '.tree-node-label';

/**
 *  The TreeView class creates a DOM-TreeView from a traversal function.
 *  The traversal function takes a callback which will be called for each
 *  node providing information about the visited node in an info struct.

    type NodeInfo = {
        id: string,
        hasChildren: boolean,
        isLastChild: boolean,
        depth: number,
        doContinue: boolean,
        data: any
    }

    callback signature:
    myCallbackFunc(node: NodeInfo) => void

    This allows us to completely abstract away the implementation details
    of the tree. Actually it could be anything which provides information
    about the actually visited node (see above).
 *///

/** Ideas:
    Only visible parts of the tree should have drag'n'drop handlers
    (could although lead to expensive checks)
    Whenever a node is expanded all visible sub-nodes gets the draggable attribute
    and a dragstart listener.

    Multi-Select option

    undo/redo
*///

/** Todo:
reconstruct:
    onSelect:
        selected item has to be '.tree-node', for now it's '.tree-node-label'
        select $item = $label.parent() when a label gets selected, deselect old item

    synchronize the given tree (optionally)
        put handlers for altering the tree into options

apperance:
    if item has no children set label margin to match the missing icon

    use a container for expand icon and make that clickable instead

    show "invalid" icon if drop operation is not allowed

behaviour:
    prevent dropping items from a different tree instance
        (how? optionally?)
        may check if both root elements matches

    make it possible to drag items onto root

    select:
        expand selected element, have to expand all parents as well
        if selection comes from find(item) this will get difficult because
        the selected item could be out of the viewable area of scroll view
        How to programmaticallly change the portion which is displayed?     -> ???
        Maybe via "scrollTop":
            need to know
                number of visible items
                item height
                position of selected item in terms of all visible items

            root = 'div.mm-tree'
            root_UL = 'div.mmm-tree > ul'
            root.scrollTop = tv.selected.offsetTop - root_UL.offsetTop

feature:
    cursor navigation for selection:

    copy/paste:

    rename node:
        convert label to text input and revert after valid change

    Auto-Expand:
        dragging over a collapsed node should start a timer and expand that node
        after time-out or cancel the timer if "dragleave" occurs meanwhile

    _isTargetOk:
        which nodes are allowed to be inserted? -> white/black-list ACL
        add a user-defined callback "isTargetOk"

*/


const _onToggleExpand = function(ev) {
    this.toggle(ev.data); // ev.data = $('li.tree-node')
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
    console.log('drag start: ' + ev.target.innerText);
    this._draggedNode = ev.target; // li.tree-node span
    ev.target.style.opacity = 0.5;
    // 'none', 'copy', 'copyLink', 'copyMove', 'link', 'linkMove', 'move', 'all', 'uninitialized'
    ev.dataTransfer.setData('text/plain', ev.target.id); // ???
    ev.dataTransfer.effectAllowed = 'all'; // ???

    return true;
};

const _handleDragEnter = function(ev) {
    // console.log('drag enter: ' + ev.target.innerText);
    // cancelling the event tells the browser that it's a valid drop target

    // ev.dataTransfer.dropEffect = 'copyLink';
    // if (_isTargetOk(this._draggedNode, ev.target)) {
    //     $(ev.target).addClass('over');
    //     ev.preventDefault();
    // }
    ev.preventDefault();
    $(ev.target).addClass('over');
    return true;
};

/** w3c: handle dragover event
 *  Cancelable: yes
 *  dropEffect: Based on effectAllowed value
 *  Default Action: Reset the current drag operation to "none"
 */
const _handleDragOver = function(ev) {
    ev.dataTransfer.dropEffect = 'copy';

    if ( $(ev.target).hasClass(NODE_LABEL_CLASS) ) {
        console.log('drag over: ' + ev.target.innerText);
        if (_isTargetOk(this._draggedNode, ev.target)) {
            ev.preventDefault();
            ev.stopPropagation(); // prevents bubbling up (label -> listItem -> treeView)
        }
    }
    else if ( $(ev.target).hasClass(NODE_CLASS) || $(ev.target).hasClass(TREE_CLASS) ) {
        console.log('drag over: /');
        ev.preventDefault();
        ev.stopPropagation(); // prevents bubbling up (label -> listItem -> treeView)
    }
    else { // error
        ev.dataTransfer.dropEffect = 'none';
        return true;
    }

};

/** w3c: handle dragleave event
 *  Cancelable: no,
 *  Default Action: None
 *  dropEffect: "none"
 */
const _handleDragLeave = function(ev) {
    //console.log('drag leave: ' + ev.target.innerText);
    $(ev.target).removeClass('over');
};

const _handleDrop = function(ev) {
    // this._draggedNode is a label, it's parent is a list item
    let $srcItem = $(this._draggedNode).parent(); // $('li.tree-node')
    let $dstItem;

    // drop target is a label
    if ( $(ev.target).hasClass(NODE_LABEL_CLASS) ) {
         $dstItem = $(ev.target).parent(); // li.tree-node
    }

    // or a list item or the tree itself
    // in both cases the dragged label will be dropped to root of treeview
    else if ( $(ev.target).hasClass(NODE_CLASS) || $(ev.target).hasClass(TREE_CLASS) ) {
        console.log('dropped: ' + this._draggedNode.innerText + " onto: /");
        $dstItem = this._$parent;
    }
    else {
        return; // can this happen?
    }

    // remove group and icon if old parent gets empty
    let $srcGroup = $srcItem.closest('ul');
    let $srcGroupIcon = $srcGroup.siblings('i.fa');
    let isSingleChild = $srcItem.siblings('li').length === 0;
    $srcItem.detach();
    if (isSingleChild) {
        $srcGroup.remove();
        $srcGroupIcon.remove();
    }

    _addItem.bind(this)($srcItem, $dstItem);
    $srcItem.toggleClass(NODE_INVISIBLE_CLASS);

    $(ev.target).removeClass('over');

    ev.preventDefault();
    ev.stopPropagation(); // prevents bubbling up (label -> listItem -> treeView)
};

const _handleDragEnd = function(ev) {
    ev.target.style.opacity = '';
    console.log('drag end: ' + ev.target.innerText);
};

const _onSelect = function(ev) { // ev.target = $('li > span')
    let prevSelectedItem = this._selectedItem;
    $(this._selectedItem).toggleClass(NODE_SELECTED_CLASS);
    this._selectedItem = ev.target;
    $(this._selectedItem).toggleClass(NODE_SELECTED_CLASS);

    let cb = this._options.onSelect;
    if (typeof cb === 'function') {
        cb.bind(this)(this._selectedItem, prevSelectedItem);
    }
};

const _createItem = function(node) {
    let $item = $('<li>')
        .data("node", node)
        // .attr("node-depth", node.depth)
        // .attr("role", 'item')
        .addClass(NODE_CLASS)
        .addClass(NODE_INVISIBLE_CLASS);

    $item[0].addEventListener('dragover', _handleDragOver.bind(this), false);


    let $span = $('<span>').addClass(NODE_LABEL_CLASS)
        .text(this._options.onLabel(node))
        .attr("draggable", 'true')
        .click(_onSelect.bind(this))
        .appendTo($item);

    $span[0].addEventListener('dragstart', _handleDragStart.bind(this), false);
    $span[0].addEventListener('dragenter', _handleDragEnter.bind(this), false);
    $span[0].addEventListener('dragleave', _handleDragLeave.bind(this), false);
    $span[0].addEventListener('dragover', _handleDragOver.bind(this), false);
    $span[0].addEventListener('drop', _handleDrop.bind(this), false);
    $span[0].addEventListener('dragend', _handleDragEnd.bind(this), false);

    return $item;
};

/**
    @param $srcItem is $('li.tree-node')
    @param $dstItem is $('li.tree-node') or $('.mmm-tree')
    if $dstItem has no group one is created
*/
const _addItem = function($srcItem, $dstItem) {
    let $ul = $dstItem.children('ul');
    if ($ul.length === 0) {
        // destination item has no children, so add a group
        $ul = $('<ul>')
            .attr('role', 'group')
            .appendTo($dstItem);

        // initially all parent nodes are collapsed
        $dstItem.addClass(NODE_COLLAPSED_CLASS);

        $('<i>')
            .addClass(ICON_CLASS)
            .addClass(ICON_COLLAPSED_CLASS)
            .click($dstItem, _onToggleExpand.bind(this))
            .prependTo($dstItem);
    }

    // target item is not collapsed so make the new child visible
    if(!$dstItem.hasClass(NODE_COLLAPSED_CLASS)) {
        $srcItem.toggleClass(NODE_INVISIBLE_CLASS);
    }

    $srcItem.appendTo($ul);
};

const _init = function(rootNode, options) {
    // create root list as child of $parent
    let $ul = $('<ul>')
        .attr('role', 'group')
        .appendTo(this._$parent);

    // $parent[0].addEventListener('dragenter', _handleDragEnterRoot.bind(this), false);
    // $parent[0].addEventListener('dragleave', _handleDragLeaveRoot.bind(this), false);
    this._$parent[0].addEventListener('dragover', _handleDragOver.bind(this), false);
    this._$parent[0].addEventListener('drop', _handleDrop.bind(this), false);


    // init stack with root list
    let _stack = [ $ul ];

    // visitor of node hierarchy
    const createULorLI = function(node) {

        let $li = _createItem.bind(this)(node).appendTo($ul);

        if (node.hasChildren) {
            if (! node.isLastChild) {
                _stack.push($ul); // save parent
            }

            // initially all parent nodes are collapsed
            $li.addClass(NODE_COLLAPSED_CLASS);

            $('<i>')
                .addClass(ICON_CLASS)
                .addClass(ICON_COLLAPSED_CLASS)
                .click($li, _onToggleExpand.bind(this)) // $li will be available as event.data
                .prependTo($li);

            $ul = $('<ul>') // new parent
                .attr('role', 'group')
                .appendTo($li);
        }
        else if (node.isLastChild) {
            $ul = _stack.pop(); // recover old parent
        }
    };

    // create <ul>/<li>-hierarchy
    // 2nd param means do not visit rootFrame
    rootNode.traverse(createULorLI.bind(this), false);

    // make children of root visible
    $ul.children(_NODE_CLASS).toggleClass(NODE_INVISIBLE_CLASS);
};

/** Note on ES6 class concept
    It would be nice to have real private instance variables
    too completely hide implementation details from the outside world.
    I will not juggle with WeakMap or closures. It has to be a
    language feature. In case of class (static) variables or private
    functions the closure mechanism works pretty well - although ugly.
    Because each call to a private closure function has to be bound:
        privateMethod.bind(this)(args)
    That leads to the situation that the lion's share of the
    implementation happens outside of the class. That's not
    really good. Most of the time this feels like a workaround.
*/
class TreeView {
    constructor($parent, rootNode, options) { // $parent = '[div.mmm-tree]'
        this._$parent = $parent;
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

    // if none is selected it will be add to root
    // Todo: synchronize tree
    addChildToSelection(childName, childData) {
        let $dstItem;
        if (this._selectedItem) {
            $dstItem = $(this._selectedItem.parentNode);
        }
        else {
            $dstItem = this._$parent;
        }

        _addItem.bind(this)(
            _createItem.bind(this)({
                id: childName,
                data: childData
            }),
            $dstItem
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

        let $icon = $item.children('i.fa');
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
                keepGoing = cb.call(this, $(li)) === false ? false : true;
                $(li).find(' > ul').children(_NODE_CLASS).each(_preorder.bind(this));
            }
        };
        _preorder(0, this._$parent);
    }

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

            // toggle visibility of parent chain
            let tv = this;
            $(this.selected).parents('li').each(function() {
                // 'this' is a DOM element here !!!
                if ($(this).hasClass(NODE_COLLAPSED_CLASS)) {
                    tv.toggle($(this));
                }
            });

            // scroll into view
            tv._$parent.scrollTop(0); // reset scroll view
            let y0 = this._$parent.offset().top;
            let y1 = $(this.selected).offset().top;
            console.log('mmm-tree offset.top: ' + y0);
            console.log('selected offset.top: ' + y1);
            this._$parent.scrollTop(y1 - y0);
        }
    }

}

//======================================================================
module.exports = TreeView;

//======================================================================
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        TreeView
    });
}
