module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "$": false,
        "jQuery": false,
        "module": false,
        "require": false,
        "__dirname": false,
        "process": false,
        "__DEBUG__": false,
        "NODE_ENV": false
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
    ],
    "rules": {
        "no-unused-vars": "off",
        "no-console": "off",
        // "indent": [
        //   "error",
        //   "tab"
        // ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        // "quotes": [
        //     "error",
        //     "double"
        // ],
        "semi": [
            "error",
            "always"
        ],

    },
    "settings": {
    }
};
