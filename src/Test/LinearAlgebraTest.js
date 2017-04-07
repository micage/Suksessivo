import { Vector3, Matrix3x3, Quaternion } from '../linearalgebra';

//===================================================================

function v2s(v) {
    if(typeof v === "object") {
        return "(" + v.x.toFixed(2) + ", " + v.y.toFixed(2) + ", " + v.z.toFixed(2) + ")";
    }
    else {
        return v.toFixed(2);
    }
}

var output = [];
var divOut = document.createElement("div");
document.body.appendChild(divOut);
Object.assign(divOut.style, {
    background: '#cccccc',
    "margin-bottom": '10px',
    "padding": '10px'
});

function pp(str, v) {
    output.push(str + " = " + v2s(v) + "<br>");
}

var d = new Vector3(-1,2,5); pp("d", d);
var m = new Vector3(1,2,3); pp("m", m);
var n = new Vector3(1,3,-2); pp("n", n);
var mxn = m.cross(n); pp("m x n", mxn);
var mxn2 = mxn.dot(mxn); pp("(m x n)^2", mxn2);
var dp = mxn.scale(d.dot(mxn)/mxn2); pp("dp = (d * (m x n))/(m x n)^2 * (m x n) ", dp);
var dp2 = d.project(mxn); pp("dp (2)", dp2);
var d31 = n.scale(m.cross(d).dot(mxn)/mxn2); pp("d31 = (m x d) * (m x n) * n", d31);
var d32 = m.scale(n.cross(d).dot(mxn)/mxn2); pp("d32 = (n x d) * (m x n) * m", d32);
var d33 = d.substract(d31).add(d32);  pp("d33 = d - d31 + d32", d33);

divOut.innerHTML = output.join("");
