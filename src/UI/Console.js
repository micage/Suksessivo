/*eslint no-unused-vars: "off"*/
import "./Console.less";


type StackFrame = {
    getFileName: () => string,
    getFunctionName: () => string
};

// const StackTrace = __DEBUG__ ? require("stacktrace-js") : null;
// const path = require("path");

const _initHTML = function($elem) {
    $elem = $("<div>", { id: "console" }).appendTo($("body"));

    let $buttonBar = $("<div>", { id: "button_bar"})
        .appendTo(this.$elem);

    $("<button>", { id: "consoleToggle", class: "button_bar_btn", text: "Console" })
        .appendTo($buttonBar)
        .click(() => {
            this.toggle();
        });

    $("<button>", { id: "consoleClear", class: "button_bar_btn", text: "Clear" })
        .appendTo($buttonBar)
        .click(() => {
            $textArea.empty();
        });

    let $textArea = $("<div>", { id: "console_body" })
        .appendTo($elem);
};

class Console {
    constructor() {
        this.$elem = null;
        this._showHTML = false;
    }

    add() {
        _initHTML.call(this);
        this._showHTML = true;
    }

    remove() {
        this.$elem.remove();
        this._showHTML = false;
    }

    warn(str: string) {
        // todo: change style for this -> Warn Style
        if (NODE_ENV !== "production") {
            this.log(str);
        }
    }

    error(str: string) {
        // todo: change style for this -> Error Style
        this.log(str);
    }

    log(str: string) {
        // StackTrace.get().then((stackFrames: Array<StackFrame>) => {
        //     let sf = stackFrames[0];
        //     let base = path.basename(sf.getFileName());
        //     let functionName = path.basename(sf.getFunctionName());
        //
        //     this.textArea.append($("<div>", {
        //         text: base + "::" + functionName + ": " + str
        //     }));
        // }).catch(function(err: Error) {
        //     _console.log(err.message);
        // });

        if (this._showHTML) {
            this.textArea.append($("<div>", {
                text: str
            }));
        }

        if (__DEBUG__) {
            console.log(str);
        }
    }

    toggle() {
        this.textArea.slideToggle();
    }
}

//==============================================================================
let _console = new Console();

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // revoke the side effect
        _console.remove();
    });
}

export default _console;
