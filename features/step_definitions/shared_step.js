var defineSupportCode = require('cucumber').defineSupportCode;
var cucumberUtils = require('../../');
var expect = require('chai').expect;

defineSupportCode(function({Given, When, Then}) {
  Given('the following:', function(table) {
    this._rows = table.rows();
    this._raw = table.raw();
    this._hashes = table.hashes();
  });

  Then('it should parse from raw to:', function (string) {
    var parsed = cucumberUtils.table.rawToObject(this._raw);
    expect(parsed).to.eql(JSON.parse(string));
  });
});
