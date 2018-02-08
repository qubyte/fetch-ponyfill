declare module "fetch-ponyfill" {
    export default function fetchPonyfill(options?: FetchPonyfill.BootstrapOptions): FetchPonyfill.BootstrapRetVal;
}

declare namespace FetchPonyfill {
    interface BootstrapOptions {
        Promise?: Function;
        XMLHttpRequest?: Function;
    }

    interface BootstrapRetVal {
        fetch: typeof fetch,
        Headers: typeof Headers,
        Request: typeof Request,
        Response: typeof Response
    }
}
