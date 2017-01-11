var cucUtils = require('../'),
    expect = require('chai').expect;

describe('rawToObject', function () {
  it('sets first level properties correctly', function () {
    var input = [ [ 'id', 123 ], [ 'email', 'user@example.com' ] ];
    var actual = cucUtils.helpers.rawToObject(input);

    expect(actual).to.deep.equal({ id: 123,
      email: 'user@example.com'
    });
  });

  it('can set deep properties correctly', function () {
    var input = [ [ 'address/street/one', '132 Mulberry Street' ],
                  [ 'address/street/two', 'Suite 503' ],
                  [ 'zero/one/two/three/four/five/six/seven/eight/nine', 10 ] ];
    var actual = cucUtils.helpers.rawToObject(input);

    expect(actual).to.deep.equal({
      address: { street: { one: '132 Mulberry Street', two: 'Suite 503' } },
      zero: { one: { two: { three: { four: { five: { six: { seven: { eight: { nine: 10 } } } } } } } } }
    });
  });

  it('can handle arrays', function () {
    var input = [ [ '2', 'windows' ], [ '0', 'apple' ], [ '1', 'linux' ] ];
    var actual = cucUtils.helpers.rawToObject(input);

    expect(actual).to.eql([ 'apple', 'linux', 'windows' ]);
  });

  it('can handle arrays in objects', function () {
    var input = [ [ 'oses/2', 'windows' ], [ 'oses/0', 'apple' ], [ 'oses/1', 'linux' ] ];
    var actual = cucUtils.helpers.rawToObject(input);

    expect(actual).to.eql({
      oses: [ 'apple', 'linux', 'windows' ]
    });
  });

  it('deep objects and arrays', function () {
    var input = [ [ 'person/addresses/0/street/one', '123 Main' ],
                  [ 'person/addresses/0/street/two', 'Apt 1' ],
                  [ 'person/addresses/1/street/one', '321 Main' ],
                  [ 'person/addresses/1/street/two', 'Apt 2' ],
                  [ 'person/addresses/2/street/0', '222 Main' ],
                  [ 'person/addresses/2/street/1', 'Apt 3' ] ];
    var actual = cucUtils.helpers.rawToObject(input);

    expect(actual).to.eql({
      person: {
        addresses: [
          { street: { one: '123 Main', two: 'Apt 1' } },
          { street: { one: '321 Main', two: 'Apt 2' } },
          { street: [ '222 Main', 'Apt 3' ] }
        ]
      }
    });
  });

  it('makes base an object when base keys are mixed numbers and other', function () {
    var input = [ [ '0', 'First' ], [ 'two', 'Last' ] ];
    var actual = cucUtils.helpers.rawToObject(input);

    expect(actual).to.eql({
      0: 'First',
      two: 'Last'
    });
  });

  var specialCases = [
    { name: 'Array', input: [ 'array', '[]' ], output: { 'array': [] } },
    { name: 'Object', input: [ 'object', '{}' ], output: { 'object': {} } },
    { name: 'True', input: [ 'true', 'true' ], output: { 'true': true } },
    { name: 'False', input: [ 'false', 'false' ], output: { 'false': false } },
    { name: 'Null', input: [ 'null', 'null' ], output: { 'null': null } }
  ];

  specialCases.forEach(function (specialCase) {
    it('parses ' + specialCase.name + ' correctly', function () {
      var actual = cucUtils.helpers.rawToObject([ specialCase.input ]);
      expect(actual).to.eql(specialCase.output);
    });
  });
});
