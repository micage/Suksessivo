class Vector3;

class Quaternion {
public:
    double x, y, z, w;

/*
*/
    Quaternion();
    //~Quaternion() {}
    Quaternion(const Vector3 & axis, double angle);

    //const Vector3 & getV() const { return v; }
};
