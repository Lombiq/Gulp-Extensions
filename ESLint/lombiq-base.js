/* eslint-disable */
module.exports = {
    'extends': './eslint-base.js',

    // Here we can define our own rules overriding the base rules
    'rules': {
        // Lombiq rules
        'max-len': [
            'warning',
            120,
            2,
            {
                'ignoreUrls': true,
                'ignoreComments': false,
                'ignoreRegExpLiterals': false,
                'ignoreStrings': false,
                'ignoreTemplateLiterals': false
            }
        ],

        'brace-style': [
            'warning',
            'stroustrup',
            { 'allowSingleLine': true }
        ],

        'prefer-template': 'off',

        'no-plusplus': [
            'warning',
            { 'allowForLoopAfterthoughts': true }
        ],

        'linebreak-style': ['warning', 'windows'],

        'no-param-reassign': [
            'warning',
            {
                'props': false
            }
        ],

        'wrap-iife': [
            'warning',
            'any', // outside originally
            { 'functionPrototypeMethods': false }
        ],

        'prefer-arrow-callback': [
            'warning',
            {
                'allowNamedFunctions': true, // false originally
                'allowUnboundThis': true
            }
        ],

        'no-underscore-dangle': [
            'warning',
            {
                'allowAfterThis': true
            }
        ],

        'no-restricted-syntax': [
            'warning',
            {
                'selector': 'ForOfStatement',
                'message': 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide (https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js) to allow them. Separately, loops should be avoided in favor of array iterations.'
            },
            {
                'selector': 'LabeledStatement',
                'message': 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
            },
            {
                'selector': 'WithStatement',
                'message': '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
            }
        ],

        'no-unused-expressions': [
            'warning',
            {
                'allowShortCircuit': true,
                'allowTernary': false,
                'allowTaggedTemplates': false
            }
        ],

        'operator-linebreak': [
            'warning',
            'after',
            {
                'overrides': {
                    '=': 'none',
                    '?': 'ignore',
                    ':': 'ignore'
                }
            }
        ],

        'no-else-return': [
            'warning',
            { 'allowElseIf': true }
        ],

        'object-shorthand': [
            'warning',
            'consistent-as-needed'
        ],

        'prefer-destructuring': [
            'warning',
            {
                'VariableDeclarator': {
                    'array': false,
                    'object': false
                },
                'AssignmentExpression': {
                    'array': true,
                    'object': false
                }
            },
            {
                'enforceForRenamedProperties': false
            }
        ],

        'indent': [
            'warning',
            4,
            {
                'SwitchCase': 1,
                'VariableDeclarator': 1,
                'outerIIFEBody': 1,
                // MemberExpression: null,
                'FunctionDeclaration': {
                    'parameters': 1,
                    'body': 1
                },
                'FunctionExpression': {
                    'parameters': 1,
                    'body': 1
                },
                'CallExpression': {
                    'arguments': 1
                },
                'ArrayExpression': 1,
                'ObjectExpression': 1,
                'ImportDeclaration': 1,
                'flatTernaryExpressions': false,
                // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
                'ignoredNodes': ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
                'ignoreComments': false
            }
        ],

        'func-names': ['warning', 'as-needed'],

        'no-alert': 'off',

        'function-paren-newline': ['off', 'consistent'],

        'comma-dangle': ['warning', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],

        'function-call-argument-newline': ['warning', 'consistent'],
    }
}
