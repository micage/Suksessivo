#include <string>


struct MyInterface {
    virtual void myFunctionCalledFromCpp(const std::string& str) = 0;
};

class Test {
public:
    void test(MyInterface & i);
};
