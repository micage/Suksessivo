// import "style-loader!css-loader!prismjs/themes/prism-dark.css";
// import "style-loader!css-loader!prismjs/themes/prism-tomorrow.css";
import "!style-loader!css-loader!prismjs/themes/prism-coy.css";
// import "style-loader!css-loader!prismjs/themes/prism.css";
import Prism  from 'prismjs';
import { Div, Pre } from "./Elements";


const Code = (args) => {
    let _args = args || {};

    let code = document.createElement('code');
    if (_args.srcType === 'js') {
        code.Type = 'Code';
        code.classList.add('language-js');
        code.innerHTML = Prism.highlight(_args.src, Prism.languages.javascript);
    }
    else if (_args.srcType === 'css') {
        code.classList.add('language-css');
        code.innerHTML = Prism.highlight(_args.src, Prism.languages.css);
    }

    let self = Div({ class: args.class, style: args.style, children: [
        Pre({ children: [ code ]})
    ]});

    return self;
};

export default Code;
