// includes
#include <math.h>
#include "vector.h"


Vector3::Vector3() : x(0.0), y(0.0), z(0.0) {
}

Vector3::~Vector3() {
}

Vector3::Vector3(double x, double y, double z) : x(x), y(y), z(z) {
}

Vector3::Vector3(const Vector3 & v) {
	x = v.x;
	y = v.y;
	z = v.z;
}

Vector3 Vector3::scale(double k) const {
	return Vector3(k * x, k * y, k * z);
}

double Vector3::dot(const Vector3 & v) const {
	return v.x * x + v.y * y + v.z * z;
}

Vector3 Vector3::add(const Vector3 & v) const {
	return Vector3(x + v.x, y + v.y, z + v.z);
}

Vector3 Vector3::substract(const Vector3 & v) const {
	return Vector3(x - v.x, y - v.y, z - v.z);
}

Vector3 Vector3::cross(const Vector3 & v) const {
	return Vector3(
		y * v.z - z * v.y,
		z * v.x - x * v.z,
		x * v.y - y * v.x
	);
}

double Vector3::length() const {
	return sqrt(x*x+y*y+z*z);
}

double Vector3::lengthSquared() const {
	return x*x + y*y + z*z;
}

Vector3 Vector3::normalize() const {
	double d = sqrt(x*x + y*y + z*z);
	if (d < 0.000001) {
		return *this;
	}
	return Vector3(x/d, y/d, z/d);
}

Vector3 & Vector3::scaleInPlace(double s) {
	x *= s;
	y *= s;
	z *= s;
	return *this;
}

Vector3 & Vector3::normalizeInPlace() {
	double inv_d = sqrt(x*x+y*y+z*z);
	if (inv_d > 1e8) {
		x = 1; y = 0; z = 0;
	} else {
		inv_d = 1/inv_d;
		x *= inv_d;
		y *= inv_d;
		z *= inv_d;
	}
	return *this;
}

Vector3 Vector3::project(const Vector3 &v) const {
	return v.scale( (*this).dot(v) / v.dot(v) );
}

Vector3 Vector3::reject(const Vector3 &v) const {
	return (*this).substract( v.scale( (*this).dot(v) / v.dot(v) ) );
}
