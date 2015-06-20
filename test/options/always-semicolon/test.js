var assert = require('assert');

describe('options/always-semicolon', function() {
    describe('process', function() {
        it('Should add semicolon for last property if missing. Test 1', function() {
            this.comb.configure({ 'always-semicolon': true });
            return this.comb.processString(
                'div { height: 0 }'
            ).then(function(actual) {
                assert.equal(actual, 'div { height: 0; }');
            });
        });

        it('Should add semicolon for last property if missing. Test 2', function() {
            this.comb.configure({ 'always-semicolon': true });
            return this.comb.processString(
                'div {\nheight: 0\n}'
            ).then(function(actual) {
                assert.equal(actual, 'div {\nheight: 0;\n}');
            });
        });

        it('Should add semicolon for last property if missing. Test 3', function() {
            this.comb.configure({ 'always-semicolon': true });
            return this.comb.processString(
                'div {height: 0}'
            ).then(function(actual) {
                assert.equal(actual, 'div {height: 0;}');
            });
        });

        it('Should add semicolon for last property if missing. Test 4', function() {
            this.comb.configure({ 'always-semicolon': true });
            return this.comb.processString(
                'div {\nheight: 0 /* Comment */\n}'
            ).then(function(actual) {
                assert.equal(actual, 'div {\nheight: 0; /* Comment */\n}');
            });
        });

        it('Should add semicolon for last property if missing. Test 5', function() {
            this.comb.configure({ 'always-semicolon': true });
            return this.comb.processString(
                'div {\ntop: 1px;\nheight: 0 /* 1comment */  /* 2comment */\n}'
            ).then(function(actual) {
                assert.equal(actual, 'div {\ntop: 1px;\nheight: 0; /* 1comment */  /* 2comment */\n}');
            });
        });
    });

    describe('detect', function() {
        it('Should detect semicolon for last property. Test 1', function() {
            this.shouldDetect(
                ['always-semicolon'],
                'div { height: 0 }',
                {
                    'always-semicolon': false
                }
            );
        });

        it('Should detect semicolon for last property. Test 2', function() {
            this.shouldDetect(
                ['always-semicolon'],
                'div { height: 0; }',
                {
                    'always-semicolon': true
                }
            );
        });

        it('Should detect semicolon for last property. Test 3', function() {
            this.shouldDetect(
                ['always-semicolon'],
                'div { height: 0; } div { height: 0 }',
                {
                    'always-semicolon': true
                }
            );
        });

        it('Should detect semicolon for last property. Test 4', function() {
            this.shouldDetect(
                ['always-semicolon'],
                'div { height: 0 } div { height: 0; } div { height: 0 }',
                {
                    'always-semicolon': false
                }
            );
        });

        it('Should detect semicolon for last property. Test 5', function() {
            this.shouldDetect(
                ['always-semicolon'],
                'div {\nheight: 0 /* Comment */\n} ' +
                'div { height: 0; }' +
                'div {\ntop: 1px;\nheight: 0 /* 1comment */  /* 2comment */\n}',
                {
                    'always-semicolon': false
                }
            );
        });


        it('Should detect semicolon for last property. Test 6', function() {
            this.shouldDetect(
                ['always-semicolon'],
                'a{\n    border:0;\n}',
                {
                    'always-semicolon': true
                }
            );
        });

        it('Should not detect semicolon for last property if there are no properties', function() {
            this.shouldDetect(
                ['always-semicolon'],
                'div {}',
                {}
            );
        });
    });
});
