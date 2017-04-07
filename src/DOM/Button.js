import { Button } from './Elements';

const _Create = (args) => {
    let button = Button(args);
    button.Type = 'Button';
    button.classList.add(button.Type);
    return button;
};

export default _Create;
