import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies
import RuleTester from 'eslint-ava-rule-tester'; // eslint-disable-line import/no-extraneous-dependencies
import rule from '../rules/missing-await-in-async-fn';

const tester = new RuleTester(test);

const errorMessage = 'Missing await in async function.';
const parser = 'babel-eslint';
const parserOptions = { ecmaVersion: 6 };
const errors = message => [{ message }];
const check = (code, message) => ({
  code,
  errors: errors(message),
  parserOptions,
  parser,
});

tester.run('missing-await-in-async-fn', rule, {
  valid: [
    check('async function foo() { return await bar(); };'),
    check('const foo = async () => { return await bar(); };'),
    check('const foo = async () => await bar();'),
  ],
  invalid: [
    check('async function foo() { return bar(); };', errorMessage),
    check('const foo = async () => { return bar(); };', errorMessage),
    check('const foo = async () => bar();', errorMessage),
  ],
});
