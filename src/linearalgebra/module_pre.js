var Module = {
    ENVIRONMENT: "WEB"
};

if (typeof window !== 'undefined') {
    process = undefined;  // Lets emscripten think this is node!
}

/*
function parseJSFunc(jsfunc) {
  // Match the body and the return value of a javascript function source
  var arr = jsfunc.toString().match(sourceRegex);
  if (arr) {
      var parsed = arr.slice(1);
      return {arguments : parsed[0], body : parsed[1], returnValue: parsed[2]}
  } else {
      return {arguments : "", body : "", returnValue: ""}
  }
}
*/
