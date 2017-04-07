import mouse from 'mouse-event';

let out = document.createElement('span');
let out_style = out.style;
Object.assign(out.style, {
    position: "absolute",
    right: '100px',
    top: '10px'
});
document.body.appendChild(out);
Object.assign(document.body.style, {
    margin: '0px'
});

addEventListener('mousemove', function(ev) {
  out.innerHTML =
    '<p>Buttons: ' + mouse.buttons(ev) +
    ' x:' + mouse.x(ev) +
    ' y:' + mouse.y(ev) + '</p>'
});

window.addEventListener('mousedown', function(ev) {
});
