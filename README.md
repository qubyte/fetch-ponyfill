# Fetch Ponyfill

> WHATWG `fetch` ponyfill
>
> Ponyfill: A polyfill that doesn't overwrite the native method.

This module wraps the [github/fetch](https://github.com/github/fetch) polyfill in a CommonJS module
for browserification, and avoids appending anything to the window, instead returning a setup
function when `fetch-ponyfill` is required. Inspired by
[object-assign](https://github.com/sindresorhus/object-assign).

When used in Node, delegates to `node-fetch` instead.

## Usage

```javascript
var fetch = require('fetch-ponyfill')(options);
```

where options is an object with the following optional properties:

| option | description |
| ------ | ----------- |
| `Promise` | An A+ Promise implementation. Defaults to `window.Promise` in the browser, and `global.Promise` in Node. |
| `XMLHttpRequest` | The XMLHttpRequest constructor. This is useful to feed in when working with Firefox OS. Defaults to `window.XMLHttpRequest`. Has no effect in Node. |
