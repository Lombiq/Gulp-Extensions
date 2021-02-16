/* eslint-disable */
module.exports = {
    "extends": "./eslint-base.js",

    // Here we can define our own rules overriding the base rules
    "rules": {
        // Lombiq rules
        "max-len": [
            "error",
            120,
            2,
            {
                "ignoreUrls": true,
                "ignoreComments": false,
                "ignoreRegExpLiterals": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true
            }
        ],

        "brace-style": [
            "error",
            "stroustrup",
            { "allowSingleLine": true }
        ],

        "prefer-template": "off",

        "no-plusplus": [
            "error",
            { "allowForLoopAfterthoughts": true }
        ],

        "linebreak-style": ["error", "windows"],

        "no-param-reassign": [
            "error",
            {
                "props": false
            }
        ],

        "wrap-iife": [
            "error",
            "any", // outside originally
            { "functionPrototypeMethods": false }
        ],

        "prefer-arrow-callback": [
            "error",
            {
                "allowNamedFunctions": true, // false originally
                "allowUnboundThis": true
            }
        ],

        "no-underscore-dangle": [
            "error",
            {
                "allowAfterThis": true
            }
        ],

        "no-restricted-syntax": [
            "error",
            {
                "selector": "ForOfStatement",
                "message": "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations."
            },
            {
                "selector": "LabeledStatement",
                "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
            },
            {
                "selector": "WithStatement",
                "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
            }
        ],

        "no-unused-expressions": [
            "error",
            {
                "allowShortCircuit": true,
                "allowTernary": false,
                "allowTaggedTemplates": false
            }
        ],

        "operator-linebreak": [
            "error",
            "after",
            {
                "overrides": {
                    "=": "none",
                    "?": "ignore",
                    ":": "ignore"
                }
            }
        ],

        "no-else-return": [
            "error",
            { "allowElseIf": true }
        ],

        "object-shorthand": [
            "error",
            "consistent-as-needed"
        ],

        "prefer-destructuring": [
            "error",
            {
                "VariableDeclarator": {
                    "array": false,
                    "object": false
                },
                "AssignmentExpression": {
                    "array": true,
                    "object": false
                }
            },
            {
                "enforceForRenamedProperties": false
            }
        ],

        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1,
                "VariableDeclarator": 1,
                "outerIIFEBody": 1,
                // MemberExpression: null,
                "FunctionDeclaration": {
                    "parameters": 1,
                    "body": 1
                },
                "FunctionExpression": {
                    "parameters": 1,
                    "body": 1
                },
                "CallExpression": {
                    "arguments": 1
                },
                "ArrayExpression": 1,
                "ObjectExpression": 1,
                "ImportDeclaration": 1,
                "flatTernaryExpressions": false,
                // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
                "ignoredNodes": ["JSXElement", "JSXElement > *", "JSXAttribute", "JSXIdentifier", "JSXNamespacedName", "JSXMemberExpression", "JSXSpreadAttribute", "JSXExpressionContainer", "JSXOpeningElement", "JSXClosingElement", "JSXFragment", "JSXOpeningFragment", "JSXClosingFragment", "JSXText", "JSXEmptyExpression", "JSXSpreadChild"],
                "ignoreComments": false
            }
        ],

        "func-names": ["error", "as-needed"],

        "no-alert": "off"
    }
}