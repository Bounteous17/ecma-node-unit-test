module.exports = {
    parse: {
        ecma2016: {
            replaceAll: {
                type: "Program",
                start: 0,
                end: 44,
                body: [
                    {
                        type: "ExpressionStatement",
                        start: 0,
                        end: 44,
                        expression: {
                            type: "CallExpression",
                            start: 0,
                            end: 43,
                            callee: {
                                type: "MemberExpression",
                                start: 0,
                                end: 27,
                                object: {
                                    type: "Literal",
                                    start: 0,
                                    end: 16,
                                    value: "I am an string",
                                    raw: "'I am an string'"
                                },
                                property: {
                                    type: "Identifier",
                                    start: 17,
                                    end: 27,
                                    name: "replaceAll"
                                },
                                computed: false
                            },
                            arguments: [
                                {
                                    type: "Literal",
                                    start: 28,
                                    end: 32,
                                    value: "am",
                                    raw: "'am'"
                                },
                                {
                                    type: "Literal",
                                    start: 34,
                                    end: 42,
                                    value: "am not",
                                    raw: "'am not'"
                                }
                            ]
                        }
                    }
                ],
                sourceType: "script"
            }
        },
        ecma2022: {
            simpleVar: {
                type: "Program",
                start: 0,
                end: 16,
                body: [
                    {
                        type: "VariableDeclaration",
                        start: 0,
                        end: 16,
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                start: 4,
                                end: 16,
                                id: {
                                    type: "Identifier",
                                    start: 4,
                                    end: 7,
                                    name: "foo"
                                },
                                init: {
                                    type: "Literal",
                                    start: 10,
                                    end: 16,
                                    value: "jest",
                                    raw: "\"jest\""
                                }
                            }
                        ],
                        kind: "var"
                    }
                ],
                sourceType: "script"
            }
        }
    }
};