export = fetchPonyfill;

declare function fetchPonyfill(options?: fetchPonyfill.BootstrapOptions): fetchPonyfill.BootstrapRetVal;

declare namespace fetchPonyfill {
  interface BootstrapOptions {
    Promise?: Function;
    XMLHttpRequest?: Function;
  }

  interface BootstrapRetVal {
    fetch: typeof fetch;
    Headers: typeof Headers;
    Request: typeof Request;
    Response: typeof Response;
  }
}
