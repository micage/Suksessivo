#include "vector.h"
#include "matrix.h"
#include <math.h>


Matrix3x3::Matrix3x3() {}

Matrix3x3::Matrix3x3(const Vector3 & e1, const Vector3 & e2, const Vector3 & e3) {}

Matrix3x3::Matrix3x3(const Vector3 & a /* axis */, double angle) {
    // txx + c    tyx - sz    tzx + sy
    // txy + sz   tyy + c     tzy - sx
    // txz - sy   tyz + sx    tzz + c
    double c = cos(angle);
    double s = sin(angle);
    double t = 1 - c;

    e1 = Vector3(t * a.x * a.x + c,           t * a.y * a.x + s * a.z,    t * a.z * a.x - s * a.y);
    e2 = Vector3(t * a.x * a.y - s * a.z,     t * a.y * a.y + c,          t * a.z * a.y + s * a.x);
    e3 = Vector3(t * a.x * a.z + s * a.y,     t * a.y * a.z - s * a.x,    t * a.z * a.z + c);
}

Vector3 Matrix3x3::multiply(const Vector3 & v) const {
    return Vector3(
        e1.x * v.x + e2.x * v.y + e3.x * v.z,
        e1.y * v.x + e2.y * v.y + e3.y * v.z,
        e1.z * v.x + e2.z * v.y + e3.z * v.z
    );
}
