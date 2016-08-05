const path = require('path');
const requireIndex = require('requireindex');

const rules = requireIndex(path.resolve(__dirname, 'rules'));

module.exports.rules = rules;
