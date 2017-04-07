function Clock (ctx, scale = 1) {
    //var scale = 1.9;
    var dim = 200 * scale,
        xmin = (ctx.canvas.width - dim) / 2,
        ymin = (ctx.canvas.height - dim) / 2,
        now = new Date();

    ctx.save();
    ctx.clearRect(xmin, ymin, xmin + dim, ymin + dim);
    ctx.translate(xmin + dim / 2, ymin + dim / 2);
    ctx.scale(scale, scale);
    ctx.rotate(-Math.PI/2);
    ctx.strokeStyle = "lightgrey";
    ctx.fillStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Hour marks
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100,0);
        ctx.lineTo(122,0);
    }
    ctx.stroke();
    ctx.restore();

    // Minute marks
    ctx.save();
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            ctx.moveTo(117,0);
            ctx.lineTo(122,0);
        }
        ctx.rotate(Math.PI/30);
    }
    ctx.stroke();
    ctx.restore();

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;

    ctx.fillStyle = "black";

    // write Hours
    ctx.save();
    ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec );
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20,0);
    ctx.lineTo(80,0);
    ctx.stroke();
    ctx.restore();

    // write Minutes
    ctx.save();
    ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec );
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28,0);
    ctx.lineTo(112,0);
    ctx.stroke();
    ctx.restore();

    // Write seconds
    ctx.save();
    ctx.rotate(sec * Math.PI/30);
    ctx.strokeStyle = "#ffa700";
    ctx.fillStyle = "#ffa700";
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(-30,0);
    ctx.lineTo(83,0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(105,0);
    ctx.lineTo(111,0);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0,10,0,Math.PI*2,true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(95, 0, 8, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.fillStyle = "#b5b5b5";
    //ctx.arc(0,0,2,0,Math.PI*2,true);
    //ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 140, 0,Math.PI*2,true);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#61ff86';
    ctx.arc(0, 0, 135, 0,Math.PI*2,true);
    ctx.stroke();

    ctx.restore();
}

module.exports = Clock;
Object.assign(window.MICAGE = window.MICAGE || {}, module.exports);
