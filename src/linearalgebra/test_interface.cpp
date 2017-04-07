#include "test_interface.h"


void Test::test(MyInterface & i) {
	i.myFunctionCalledFromCpp("Bad shot");
}



/*******************************************************************************************
 *
 *		binding c++ to javascript
 *
 */

#include <emscripten/bind.h>
using namespace emscripten;

struct InterfaceWrapper : public wrapper<MyInterface> {
    EMSCRIPTEN_WRAPPER(InterfaceWrapper);
    void myFunctionCalledFromCpp(const std::string& str) {
        return call<void>("myFunctionCalledFromCpp", str);
    }
};

EMSCRIPTEN_BINDINGS(interface) {
    class_<MyInterface>("MyInterface")
        .function("myFunctionCalledFromCpp", &MyInterface::myFunctionCalledFromCpp, pure_virtual())
        .allow_subclass<InterfaceWrapper>("InterfaceWrapper")
        ;
}


EMSCRIPTEN_BINDINGS(external_constructors)
{
	// TableState
    class_<Test>("Test")
	    .function("test", &Test::test)
	    ;
}
