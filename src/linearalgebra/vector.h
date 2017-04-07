// vector3.h

class Vector3 {
public:
	double y, x, z;

	Vector3();
	Vector3(double x, double y, double z);
	Vector3(const Vector3 &);
	~Vector3();

	double getX() const { return x; }
	double getY() const { return y; }
	double getZ() const { return z; }
	void setX(double s) { x = s; }
	void setY(double s) { y = s; }
	void setZ(double s) { z = s; }

	Vector3 scale(double k) const;
	double dot(const Vector3 & v) const; // scalar product
    Vector3 add(const Vector3 & v) const;
	Vector3 substract(const Vector3 & v) const;
	Vector3 cross(const Vector3 & v) const;
    double length() const;
	double lengthSquared() const;
	Vector3 normalize() const;
	Vector3 project(const Vector3 &v) const;
	Vector3 reject(const Vector3 &v) const;

	Vector3 & scaleInPlace(double s);
	Vector3 & normalizeInPlace();
};
