import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies
import RuleTester from 'eslint-ava-rule-tester'; // eslint-disable-line import/no-extraneous-dependencies
import rule from '../rules/missing-await-in-async-fn';

const tester = new RuleTester(test, {
  parser: 'babel-eslint',
});

const errorMessage = 'Missing await in async function.';
const errors = message => [{ message }];
const check = (code, message) => ({
  code,
  errors: errors(message),
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
