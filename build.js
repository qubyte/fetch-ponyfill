'use strict';

function indent(line) {
  return line === '' ? '' : '      ' + line;
}

var fs = require('fs');

// Get the fetch source as a string.
var whatwgFetchSource = fs.readFileSync(require.resolve('whatwg-fetch'), 'utf8');

// Get the wrapper source as a string.
var wrapperSource = fs.readFileSync(require.resolve('./fetch-browser'), 'utf8');

// Indent and place the fetch source inside the wrapper.
var indented = whatwgFetchSource
  .split('\n')
  .map(indent)
  .join('\n');

var builtSource = wrapperSource.replace('// {{whatwgFetch}}', indented);

console.log(builtSource); // eslint-disable-line no-console
