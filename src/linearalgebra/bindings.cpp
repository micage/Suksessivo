/*******************************************************************************************
 *
 *		binding c++ to javascript
 *
 */
 #include "vector.h"
 #include "matrix.h"
 #include "quaternion.h"

#include <emscripten/bind.h>
using namespace emscripten;

EMSCRIPTEN_BINDINGS(external_constructors) {
    class_<Vector3>("Vector3")
        .constructor<>()
        .constructor<double, double, double>()
        .constructor<const Vector3 &>()

        .property("x", &Vector3::getX, &Vector3::setX)
        .property("y", &Vector3::getY, &Vector3::setY)
        .property("z", &Vector3::getZ, &Vector3::setZ)

        .function("add", &Vector3::add)
        .function("substract", &Vector3::substract)
        .function("scale", &Vector3::scale)
        .function("dot", &Vector3::dot)
        .function("cross", &Vector3::cross)
        .function("length", &Vector3::length)
        .function("lengthSquared", &Vector3::lengthSquared)
        .function("normalize", &Vector3::normalize)
        .function("project", &Vector3::project)
        .function("reject", &Vector3::reject)

        .function("scaleInPlace", &Vector3::scaleInPlace)
        .function("normalizeInPlace", &Vector3::normalizeInPlace)
        ;

    class_<Matrix3x3>("Matrix3x3")
        .constructor<>()
        .constructor<const Vector3 &, const Vector3 &, const Vector3 &>()
       	.constructor<const Vector3 &, double>()

        .property("e1", &Matrix3x3::getE1)
        .property("e2", &Matrix3x3::getE2)
        .property("e3", &Matrix3x3::getE3)

        .function("multiply", &Matrix3x3::multiply)

	    ;

    class_<Quaternion>("Quaternion")
        .constructor<>()
        .constructor<const Vector3 &, double>()

        //.property("v", &Quaternion::getV)
        ;
    }
