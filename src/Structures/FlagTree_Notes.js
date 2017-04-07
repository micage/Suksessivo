/** both functions deliver the same result except for this.arr[0]
    which incorrectly returns 1 and not 20
    @param index {Number} is the array index where to add a new node
    the new node will be inserted at the index this function returns
*/
this.findInsertIndex = function(index) {
    let stack =[0];
    for (let i = index, depth = 0; i < this.arr.length; i++) {
        let node = this.arr[i];

        if (node.bHasChildren) {
            if (!node.bIsLastChild) {
                stack.push(depth);
            }
            depth++;
        } else if (node.bIsLastChild) {
            depth = stack.pop();
        }
        if (depth === 0) {
            return i+1;
        }
    }
}

this.findTest = function(index) {
    let stack =[];
    let i = index;
    let depth = 0;
    do {
        let node = this.arr[i];

        if (node.bHasChildren) {
            stack.push(depth);
            depth++;
        }
        if (node.bIsLastChild) { // is last child)
            depth = stack.pop();
        }
        i++;
    } while(stack.length);

    return i;
}
