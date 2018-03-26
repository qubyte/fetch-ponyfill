declare module 'fetch-ponyfill' {
  const pony = FetchPonyfill.fetchPonyfill;
  export = pony;
}

declare namespace FetchPonyfill {
  function fetchPonyfill(options?: BootstrapOptions): BootstrapRetVal;
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
