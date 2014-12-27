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

## Warning

This module currently wraps [github/fetch](https://github.com/github/fetch) by tricking it into
leaving the window object alone by loading the source as a string and wrapping it in a
`new Function`. This means that:

 - `brfs` must be used.
 - `npm dedupe` should be avoided, since browserify and thus brfs do not have access to
 `require.resolve` and `dedupe` may move fetch. See
 [here](https://github.com/substack/brfs/issues/13).

I don't currently have time to support and keep a fork of fetch up to date with the spec as it
evolves. By wrapping fetch, I avoid that effort. However, the above restrictions may mean that in
the future I switch to a proper fork.
