/**
 * @see
 *
 * This ECMA interpreter does not makes any sense since it's requires
 * to be executed using some other ECMA interpeter like V8 or Gecko.
 */

const ops = {
  ADD: '+',
  SUB: '-',
  MUL: '*',
  DIV: '/',
};

const globalScope = new Map();

class Visitor {
  visitVariableDeclaration(node) {
    return this.visitNodes(node.declarations);
  }

  visitVariableDeclarator(node) {
    const id = this.visitNode(node.id);
    const init = this.visitNode(node.init);
    globalScope.set(id, init);
    return init;
  }

  visitIdentifier(node) {
    const { name } = node;
    if (globalScope.get(name)) {
      return globalScope.get(name);
    }
    return name;
  }

  visitLiteral(node) {
    return node.raw;
  }

  visitBinaryExpression(node) {
    const leftNode = this.visitNode(node.left);
    const { operator } = node;
    const rightNode = this.visitNode(node.right);
    switch (operator) {
      case ops.ADD:
        return leftNode + rightNode;
      case ops.SUB:
        return leftNode - rightNode;
      case ops.DIV:
        return leftNode / rightNode;
      case ops.MUL:
        return leftNode * rightNode;
      default:
        process.exit(-1);
    }
  }

  evalArgs(nodeArgs) {
    const g = [];
    nodeArgs.forEach((nodeArg) => g.push(this.visitNode(nodeArg)));
    return g;
  }

  visitCallExpression(node) {
    const nodeCallee = this.visitIdentifier(node.expression.callee);
    const nodeArguments = this.evalArgs(node.expression.arguments);
    if (nodeCallee === 'print') {
      if (!process.env.DEBUG_CUSTOM_ITERPRETER) {
        process.env.DEBUG_CUSTOM_ITERPRETER = '[]';
      }
      const debugCustomInterpreter = JSON.parse(process.env.DEBUG_CUSTOM_ITERPRETER.toString());
      debugCustomInterpreter.push(...nodeArguments);
      process.env.DEBUG_CUSTOM_ITERPRETER = JSON.stringify(debugCustomInterpreter);
    }
  }

  visitNodes(nodes) {
    nodes.forEach((node) => this.visitNode(node));
  }

  visitNode(node) {
    switch (node.type) {
      case 'VariableDeclaration':
        return this.visitVariableDeclaration(node);
      case 'VariableDeclarator':
        return this.visitVariableDeclarator(node);
      case 'Literal':
        return this.visitLiteral(node);
      case 'Identifier':
        return this.visitIdentifier(node);
      case 'BinaryExpression':
        return this.visitBinaryExpression(node);
      case 'ExpressionStatement':
        return this.visitCallExpression(node);
      default:
        process.exit(-1);
    }
  }

  run(nodes) {
    return this.visitNodes(nodes);
  }
}

module.exports = Visitor;
