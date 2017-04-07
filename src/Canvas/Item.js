import Console from "../UI/Console";


class Item {
    constructor(name: string, style: Style) {
        this.name = name;
        this.style = style;
    }

    draw(ctx: CanvasRenderingContext2D) {
        Console.error("item " + this.name + " has no draw method!" + ctx);
    }

    getBox(): Box {
        Console.error("item " + this.name + " has no getBox method!");
        return null;
    }

    clone(): Item {
        Console.error("item " + this.name + " has no clone method!");
        return null;
    }

}

//========================================================================
// module.exports = {Item};
export default Item;
Object.assign(window.MICAGE = window.MICAGE || {}, {Item});
