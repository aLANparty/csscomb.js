var gonzales = require('gonzales-pe');

module.exports = (function() {
    var valueFromSettings;
    var value;
    var space;

    function insertLines(node, index) {
        var prevNode = node.get(index - 1);
        var prevNode2 = node.get(index - 2);
        var shouldInsert = false;

        // check for previous nodes that are not a space
        // do not insert if the ruleset is the first item
        for (var i = 0; i < index; i++) {
            if (!node.get(i).is('space')) {
                shouldInsert = true;
                break;
            }
        }

        if (prevNode && shouldInsert && !prevNode2.is('singlelineComment') && !prevNode2.is('multilineComment')) {
            if (prevNode.is('space')) {
                var content = prevNode.content;
                var lastNewline = content.lastIndexOf('\n');

                if (lastNewline > -1) {
                    content = content.substring(lastNewline + 1);
                }

                var valueStr = valueFromSettings + content;
                prevNode.content = valueStr;
                return;
            } else {
                node.insert(index, space);
            }
        }
    }

    function findAtRules(node) {
        node.forEach('atruleb', function(atRuleNode, index) {
            // For every atruleb - check for preceding space
            insertLines(node, index);
        });

        node.forEach('include', function(includeNode, index) {
            // For every @include with block content.

            var hasBlock = false;
            for (var i in includeNode.content) {
                if (includeNode.content[i].type === 'block') {
                    hasBlock = true;
                }
            }

            if (hasBlock === true) {
                insertLines(node, index);
            }
        });
    }

    function findRuleSets(node) {
        node.forEach('ruleset', function(ruleSetNode, index) {
            // For every ruleset - check for preceding space
            insertLines(node, index);
        });
    }

    function processBlock(x) {
        value = valueFromSettings;
        space = gonzales.createNode({ type: 'space', content: value });

        if (x.is('stylesheet')) {
            // Check all @rules
            findAtRules(x);

            // Check all rulesets
            findRuleSets(x);
        }

        x.forEach(function(node) {
            if (typeof node.is !== 'undefined') {
                if (!node.is('block')) return processBlock(node);

                // Check all @rules
                findAtRules(node);

                // Check all rulesets
                findRuleSets(node);

                processBlock(node);
            }
        });
    }

    return {
        name: 'lines-between-rulesets',

        syntax: ['scss', 'css', 'less'],

        runBefore: 'strip-spaces',

        setValue: function(value) {
            if (typeof value === 'number') {
                value = new Array(Math.round(value) + 2).join('\n');
            } else {
                var err = 'The option only accepts numbers';
                err += ' , you provided %s';

                throw new Error(err, value);
            }

            return value;
        },

        process: function(node) {
            valueFromSettings = this.getValue('lines-between-rulesets');
            processBlock(node);
        }
    };
})();
