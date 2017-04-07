import { Div, Span } from "./Elements";
import ButtonBar from "./ButtonBar";
import Button from "./Button";

/**
 * TabView is a dynamic container of views
 * for each child a tab will be created, consisting of a button in the tabs bar
 * and a corresponding view
 * there is one selected view the others are not displayed
 */

const _Create = (args) => {
    // do not create it until it has children
    if (!args.children || !args.children.length) return null;

    // a Tab is not already a HTMLElement but a template to create one

    let payload = {};
    Object.assign(payload, args);

    let buttons = [];
    let views = [];
    let button_0 = null;

    for (let i = 0; i < payload.children.length; i++) {
        let tab = payload.children[i];

        // is it a tab? How to declare a tab? tab.Type === 'Tab'

        // create a view for each tab
        let view = Div(tab);
        views.push(view);

        // create a button for each tab as child of button bar
        let aButton = {
            innerText: tab.buttonText || "tab#" + i,
            style: {
            },
            target: view,
            onclick: (evt) => {
                let button = evt.target;

                views.forEach(view => { view.style.display = 'none'; });
                button.target.style.display = 'block';

                buttons.forEach(b => { b.classList.remove('selected'); });
                button.classList.add('selected');

                // $(window).trigger('resize'); // really necessary?
                $(button.target).trigger('resize');
            }
        };
        let button = Button(aButton);
        if (i == 0) { button_0 = button; } // store the first button
        buttons.push(button);
    }

    // purge the old children which are now in the views array
    payload.children = [
        ButtonBar({ children: buttons }),
        Div({ class: 'Tabs', children: views })
    ];

    // mimick a click on the first Tab's buttton to show it
    button_0.click();

    let self = Div(payload);
    self.Type = 'TabView';
    self.classList.add(self.Type);

    return self;
};

export default _Create;
