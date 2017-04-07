class Vector3;

class Matrix3x3 {
    Vector3 e1, e2, e3;

public:
    Matrix3x3();
    Matrix3x3(const Vector3 & e1, const Vector3 & e2, const Vector3 & e3);

    Matrix3x3(const Vector3 & axis, double angle);

    const Vector3 & getE1() const { return e1; }
	const Vector3 & getE2() const { return e2; }
	const Vector3 & getE3() const { return e3; }

    Vector3 multiply(const Vector3 &) const;
};
