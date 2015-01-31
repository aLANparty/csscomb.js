describe('options/space-before-selector-delimiter:', function() {
    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-before-selector-delimiter': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-before-selector-delimiter': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-before-selector-delimiter': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space before selector delimiter', function() {
        this.comb.configure({ 'space-before-selector-delimiter': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space before selector delimiter', function() {
        this.comb.configure({ 'space-before-selector-delimiter': '  ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space before selector delimiter', function() {
        this.comb.configure({ 'space-before-selector-delimiter': '\n    ' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });

    it.skip('Should detect no whitespace', function() {
        this.shouldDetect(
            ['space-before-selector-delimiter'],
            'a,b{top:0}',
            { 'space-before-selector-delimiter': '' }
        );
    });

    it.skip('Should detect whitespace', function() {
        this.shouldDetect(
            ['space-before-selector-delimiter'],
            'a \n ,b {top:0}',
            { 'space-before-selector-delimiter': ' \n ' }
        );
    });

    it.skip('Should detect no whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-before-selector-delimiter'],
            'a,b{top:0} a ,b{left:0}',
            { 'space-before-selector-delimiter': '' }
        );
    });

    it.skip('Should detect whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-before-selector-delimiter'],
            'a ,b {top:0} b,a{left:0}',
            { 'space-before-selector-delimiter': ' ' }
        );
    });

    it.skip('Should detect no whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-before-selector-delimiter'],
            'a ,b{top:0} b,c{left:0} c,d{right:0}',
            { 'space-before-selector-delimiter': '' }
        );
    });

    it.skip('Should detect whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-before-selector-delimiter'],
            'a,b{top:0} b ,c{left:0} c ,d{right:0}',
            { 'space-before-selector-delimiter': ' ' }
        );
    });
});