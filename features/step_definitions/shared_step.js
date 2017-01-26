var defineSupportCode = require('cucumber').defineSupportCode;
var cucumberUtils = require('../../');
var expect = require('chai').expect;

defineSupportCode(function({ Given, When, Then }) {
  let data;

  let types = {
    "raw to object": 'rawToObject',
    "raw to form body": 'rawToFormBody',
    "rows to object": 'rowsToObject',
    "rows to form body": 'rowsToFormBody',
    "hashes to object": 'hashesToObject',
    "hashes to form body": 'hashesToFormBody'
  };

  Given(/^the following (rows|raw|hashes) (object|form body):$/, function(input, output, table) {
    data = cucumberUtils.table[types[input + ' to ' + output]](table[input]())
  });

  Then(/^it should have parsed as:$/, function (string) {
    expect(data).to.eql(JSON.parse(string));
  });
});
