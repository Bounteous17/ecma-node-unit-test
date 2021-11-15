// Fixtures
const astFixtures = require('../../fixtures/interpreter/ast');
// Modules
const { parse } = require('acorn');
const { join } = require('path');

describe('AST (abstract syntax tree)', () => {
    /**
     * This tests are based on "Acorn"
     * That package is a tiny, fast ECMA/JavaScript syntax parser written in JavaScript.
     */
    describe('parse', () => {
        describe('should fail', () => {
            it('should not parse the variable declaration', () => {
                const tryParse = () => parse('va foo="jest"', { ecmaVersion: 2022 });
                expect(tryParse).toThrowError('Unexpected token (1:3)');
            });

            describe('diff ECMA persion parser', () => {
                const codeToParse = `'I am an string'.replaceAll('am', 'am not');`;

                it('should do a generic parse using ES2016 method "replaceAll"', () => {
                    const output = parse(codeToParse, { ecmaVersion: 2016 });
                    expect(output).toEqual(astFixtures.parse.ecma2016.replaceAll);
                });
                it('should do an specific parse using ES2022 method "replaceAll"', () => {
                    const output = parse(codeToParse, { ecmaVersion: 2022 });
                    const expectToThrow = () => expect(output).toEqual(astFixtures.parse.ecma2016.replaceAll);
                    expect(expectToThrow).toThrowError();
                });
            });
        });

        describe('should not fail', () => {
            it('should parse the variable declaration', () => {
                /**
                 * @see
                 * v  a  r     f  o  o     =     "  j  e  s  t  "
                 * 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
                 */
                const output = parse('var foo = "jest"', { ecmaVersion: 2022 });
                expect(output).toEqual(astFixtures.parse.ecma2022.simpleVar);
            });
        });

        describe('custom interpretate', () => {
            it('run', () => {
                const Interpreter = require('../../../src/interpreter/interpreter');
                const Visitor = require('../../../src/interpreter/visitor')
                const fs = require('fs');
                const buffer = fs.readFileSync('./__tests__/fixtures/interpreter/to-interpretate.js').toString();
                const jsInterpreter = new Interpreter(new Visitor());
                const { body } = parse(buffer, { ecmaVersion: 2022 });
                const output = jsInterpreter.interpret(body);
                expect(JSON.parse(process.env.DEBUG_CUSTOM_ITERPRETER)).toEqual(["90",  '\"nnamdi\"' ,450]);
            });
        });

    });
});
