## linearalgebra.js
## C++ to Javascript with emscripten

CC=emcc
CFLAGS=
OPTIONS=
LDFLAGS=--bind
LDFLAGS+=--memory-init-file 0
#LDFLAGS+=-s EXPORT_NAME=\"'linearalgebra'\"
LDFLAGS+=-s NO_FILESYSTEM=1
#LDFLAGS+=-s DEMANGLE_SUPPORT=1
#LDFLAGS+=-s MODULARIZE=1
#LDFLAGS+=--pre-js module_pre.js
LDFLAGS+=--post-js module_post.js
#LDFLAGS+=-s INVOKE_RUN=0
#LDFLAGS+=-s NO_EXIT_RUNTIME=0
#LDFLAGS+=-s NO_DYNAMIC_EXECUTION=1
BUILDDIR=../
TEMPDIR=temp/
OPTIMIZATION=-O0
EXE=linearalgebra
## how to compile all *.bc files at once ???
SOURCES=vector.cpp matrix.cpp quaternion.cpp

OBJECTS=$(SOURCES:.cpp=.bc)
#objects = vector.bc matrix.bc quaternion.bc bindings.bc
bcs = $(addprefix $(TEMPDIR), $(OBJECTS))

.SUFFIXES: .cpp .bc

all: $(OBJECTS) bindings.bc $(EXE)

bindings.bc:
	$(CC) --bind $(OPTIMIZATION) bindings.cpp -o $(TEMPDIR)bindings.bc

## first generate bytecode (.bc) files
.cpp.bc:
	$(CC) -c $(CFLAGS) $(OPTIMIZATION) $< -o $(TEMPDIR)$@

## second compilation step (linking of bytecode files)
$(EXE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OPTIMIZATION) $(TEMPDIR)bindings.bc $(bcs) -o $(BUILDDIR)$(EXE).js
