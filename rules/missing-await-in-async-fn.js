const checkForAwait = (context, node) => {
  if (node.async) {
    const sourceCode = context.getSourceCode(node);
    const tokens = sourceCode.getTokens(node);
    const awaits = tokens.filter(t => t.type === 'Identifier' && t.value === 'await');
    if (!awaits.length) {
      context.report({
        node,
        message: 'Missing await in async function.',
        data: {
          identifier: node.name,
        },
      });
    }
  }
};

module.exports = {
  create: context => ({
    FunctionDeclaration: node => {
      checkForAwait(context, node);
    },
    ArrowFunctionExpression: node => {
      checkForAwait(context, node);
    },
  }),
};
