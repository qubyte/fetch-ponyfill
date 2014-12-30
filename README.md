# Fetch Ponyfill

> WHATWG `fetch` ponyfill
>
> Ponyfill: A polyfill that doesn't overwrite the native method.

This module wraps the [github/fetch](https://github.com/github/fetch) polyfill in a CommonJS module
for browserification, and avoids appending anything to the window, instead returning a setup
function when `fetch-ponyfill` is required. Inspired by
[object-assign](https://github.com/sindresorhus/object-assign).

## Usage

In order to use this ponyfill, browserify must be using the
[`brfs` transform](https://github.com/substack/brfs).

```javascript
var fetch = require('fetch-ponyfill')(options);
```

where options is an object with the following optional properties:

| option | description |
| ------ | ----------- |
| `Promise` | An A+ Promise implementation. Defaults to `window.Promise`. |
| `XMLHttpRequest` | The XMLHttpRequest constructor. This is useful to feed in when working with Firefox OS. Defaults to `window.XMLHttpRequest`. |
