var qs = require('qs');

var table = module.exports;

var rawOrRowsToObject = function (keysAndValues) {
  var indicators = Object.keys(keysAndValues.reduce(function (types, keyAndValue) {
    var indicator = keyAndValue[0].split('/')[0];
    try { indicator = JSON.parse(indicator); } catch (e) { };
    types[(typeof indicator)] = true;
    return types;
  }, { }));

  var memoInitVal;
  if ((indicators.length == 1) && (~indicators.indexOf('number'))) {
    memoInitVal = [];
  } else {
    memoInitVal = {};
  }

  return keysAndValues.reduce(function (output, keyAndValue) {
    var keys = keyAndValue[0].split('/');
    var lastKey = keys[keys.length - 1];
    var value = keyAndValue[1];
    var currentNode = output;

    for (var i = 0; i < (keys.length - 1); i++) {
      var key, nextKey;
      try { key     = JSON.parse(keys[i]);     } catch (e) { key     = keys[i];     }
      try { nextKey = JSON.parse(keys[i + 1]); } catch (e) { nextKey = keys[i + 1]; }

      currentNode[key] = currentNode[key] || ((typeof nextKey == 'number') ? [] : {});
      currentNode = currentNode[key];
    }

    try { value = JSON.parse(value); } catch (e) { /* nothing */ };

    currentNode[lastKey] = value;

    return output;
  }, memoInitVal);
};

var objectToFormBody = function (object) {
  return qs.stringify(object, { encode: false })
    .split('&')
    .reduce(function (memo, pair) {
      pair = pair.split('=');
      memo[pair[0]] = pair[1];
      return memo;
    }, { });
};

table.rawToObject = rawOrRowsToObject;
table.rawToFormBody = function (raw) { return objectToFormBody(rawOrRowsToObject(raw)); };

table.rowsToObject = rawOrRowsToObject;
table.rowsToFormBody = function (rows) { return objectToFormBody(rawOrRowsToObject(rows)); }

table.hashesToObject = function (hashes) {
  var rows = hashes.reduce(function (memo, hash) {
    var row = [];
    row.push(hash.key)
    row.push(hash.value);
    memo.push(row);
    return memo;
  }, [ ]);
  return rawOrRowsToObject(rows);
};

table.hashesToFormBody = function (hashes) {
  return objectToFormBody(table.hashesToObject(hashes));
};
