#include "quaternion.h"
#include "vector.h"
#include <math.h>

/*
Quaternion::Quaternion() : v(1,0,0), w(0) {
}
*/

Quaternion::Quaternion() {
    w = 0;
    x = 1;
    y = 0;
    z = 0;
}

Quaternion::Quaternion(const Vector3 & axis, double angle) {
    double a = angle/2;
    double s = sin(a);
    w = cos(a);
    x = axis.x * s;
    y = axis.y * s;
    z = axis.z * s;
}
