export declare class CallbackServer {
    private server;
    private resolveCallback?;
    private rejectCallback?;
    private timeoutId?;
    constructor();
    private cleanup;
    private handleRequest;
    listen(): Promise<string>;
    waitForCallback(): Promise<string>;
}
