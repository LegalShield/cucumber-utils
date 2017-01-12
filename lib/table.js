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

table.rawToObject = rawOrRowsToObject;

table.rowsToObject = rawOrRowsToObject;
